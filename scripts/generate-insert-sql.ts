import * as fs from 'fs'

const devices = JSON.parse(
  fs.readFileSync('/tmp/cc-agent/57977831/project/scripts/all-devices.json', 'utf-8')
)

let sql = `/*
  # Sync All 587 Devices from Mock Data

  1. Purpose
    - Import all 587 devices from the frontend mock data into Supabase
    - Replaces the existing 206 devices with the complete dataset

  2. Changes
    - Deletes all existing devices
    - Inserts 587 devices with complete information
    - Covers all categories: smartphones, tablets, laptops, smartwatches, cameras, consoles, headphones

  3. Security
    - No RLS changes (already configured)
*/

-- Delete existing devices to avoid conflicts
DELETE FROM devices;

-- Insert all 587 devices
`

for (const device of devices) {
  const id = device.id.replace(/'/g, "''")
  const category = device.category.replace(/'/g, "''")
  const brand = device.brand.replace(/'/g, "''")
  const model = device.model.replace(/'/g, "''")
  const variant = device.variant ? `'${device.variant.replace(/'/g, "''")}'` : 'NULL'
  const releaseYear = device.release_year
  const basePrice = device.base_price
  const imageUrl = device.image_url ? `'${device.image_url.replace(/'/g, "''")}'` : 'NULL'
  const specifications = device.specifications ? `'${JSON.stringify(device.specifications).replace(/'/g, "''")}'::jsonb` : 'NULL'

  sql += `INSERT INTO devices (id, category, brand, model, variant, release_year, base_price, image_url, specifications)
VALUES ('${id}', '${category}', '${brand}', '${model}', ${variant}, ${releaseYear}, ${basePrice}, ${imageUrl}, ${specifications});\n\n`
}

fs.writeFileSync(
  '/tmp/cc-agent/57977831/project/scripts/06-sync-all-587-devices.sql',
  sql
)

console.log('SQL migration generated: 06-sync-all-587-devices.sql')
console.log(`Total devices to insert: ${devices.length}`)
