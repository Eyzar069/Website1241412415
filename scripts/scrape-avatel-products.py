import json
import re
from urllib.request import urlopen, Request
from urllib.parse import urljoin
from html.parser import HTMLParser
import time

class AvatelScraper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.in_product_grid = False
        self.current_tag = None
        
    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            for attr, value in attrs:
                if attr == 'href' and '/verkaufen/' in value:
                    self.links.append(value)

def fetch_url(url):
    """Fetch URL content with proper headers"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    try:
        req = Request(url, headers=headers)
        with urlopen(req, timeout=10) as response:
            return response.read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def extract_links(html, base_url):
    """Extract all product/category links from HTML"""
    parser = AvatelScraper()
    parser.feed(html)
    return [urljoin(base_url, link) for link in parser.links]

def extract_product_info(html, url):
    """Extract product name and price from product page"""
    # Extract product name from title or h1
    name_match = re.search(r'<h1[^>]*>([^<]+)</h1>', html)
    if not name_match:
        name_match = re.search(r'<title>([^<]+)</title>', html)
    
    name = name_match.group(1).strip() if name_match else url.split('/')[-1].replace('-', ' ').title()
    
    # Extract price
    price_match = re.search(r'(\d+[,\.]\d+)\s*€', html)
    price = float(price_match.group(1).replace(',', '.')) if price_match else 0.0
    
    return {'name': name, 'price': price, 'url': url}

def scrape_avatel():
    """Main scraping function"""
    base_url = 'https://verkaufen.avatel.de'
    start_url = f'{base_url}/verkaufen'
    
    print("[v0] Starting Avatel product scrape...")
    
    # Categories to scrape
    categories = [
        ('smartphone', 'Smartphone'),
        ('tablet', 'Tablet'),
        ('laptops', 'Laptop'),
        ('smartwatch', 'Smartwatch'),
        ('konsolen', 'Konsole'),
        ('kameras-und-objektive', 'Kamera'),
        ('kopfh%C3%B6rer', 'Kopfhörer'),
        ('apple-macs', 'Apple Mac'),
        ('all-in-one-pcs', 'All-in-One PC'),
        ('grafikkarten', 'Grafikkarte'),
        ('prozessoren', 'Prozessor'),
        ('drohnen', 'Drohne'),
        ('vr-brillen-smart-glasses', 'VR-Brille'),
        ('monitore-displays', 'Monitor'),
        ('beamer-projektoren', 'Beamer'),
    ]
    
    all_products = []
    visited_urls = set()
    
    for cat_slug, cat_name in categories:
        print(f"\n[v0] Scraping category: {cat_name}")
        cat_url = f'{base_url}/verkaufen/{cat_slug}'
        
        html = fetch_url(cat_url)
        if not html:
            continue
            
        # Get all brand links
        brand_links = [link for link in extract_links(html, base_url) if f'/verkaufen/{cat_slug}/' in link and link not in visited_urls]
        
        print(f"[v0] Found {len(brand_links)} brands in {cat_name}")
        
        for brand_url in brand_links[:50]:  # Limit to prevent timeout
            if brand_url in visited_urls:
                continue
            visited_urls.add(brand_url)
            
            brand_html = fetch_url(brand_url)
            if not brand_html:
                continue
            
            # Extract brand name from URL
            brand_name = brand_url.split('/')[-1].replace('-', ' ').title()
            
            # Check if this is a series page or product list
            product_links = [link for link in extract_links(brand_html, base_url) if brand_url in link and link != brand_url]
            
            if product_links:
                print(f"[v0] Processing brand: {brand_name} ({len(product_links)} items)")
                
                for product_url in product_links[:100]:  # Limit products per brand
                    if product_url in visited_urls:
                        continue
                    visited_urls.add(product_url)
                    
                    # Check if it's a series or final product
                    if product_url.count('/') > brand_url.count('/'):
                        product_html = fetch_url(product_url)
                        if product_html:
                            # Check if this is a final product page (has price)
                            if '€' in product_html and 'Jetzt verkaufen' in product_html:
                                product_info = extract_product_info(product_html, product_url)
                                product_info['category'] = cat_name
                                product_info['brand'] = brand_name
                                all_products.append(product_info)
                                print(f"[v0] Added: {product_info['name']} - {product_info['price']}€")
                            else:
                                # It's a series page, get products from it
                                series_links = [link for link in extract_links(product_html, base_url) if product_url in link and link != product_url]
                                for series_product_url in series_links[:50]:
                                    if series_product_url not in visited_urls:
                                        visited_urls.add(series_product_url)
                                        series_product_html = fetch_url(series_product_url)
                                        if series_product_html and '€' in series_product_html:
                                            product_info = extract_product_info(series_product_html, series_product_url)
                                            product_info['category'] = cat_name
                                            product_info['brand'] = brand_name
                                            all_products.append(product_info)
                                            print(f"[v0] Added: {product_info['name']} - {product_info['price']}€")
                    
                    time.sleep(0.1)  # Be nice to the server
            
            time.sleep(0.2)
    
    print(f"\n[v0] Scraping complete! Total products found: {len(all_products)}")
    
    # Save to JSON
    with open('avatel_products.json', 'w', encoding='utf-8') as f:
        json.dump(all_products, f, ensure_ascii=False, indent=2)
    
    print(f"[v0] Products saved to avatel_products.json")
    
    return all_products

if __name__ == '__main__':
    products = scrape_avatel()
    print(f"\n[v0] Summary:")
    print(f"Total products: {len(products)}")
    
    # Group by category
    by_category = {}
    for p in products:
        cat = p['category']
        by_category[cat] = by_category.get(cat, 0) + 1
    
    for cat, count in sorted(by_category.items()):
        print(f"  {cat}: {count} products")
