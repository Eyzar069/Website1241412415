import { MOCK_DEVICES } from '../lib/mock-data'
import * as fs from 'fs'

const devices = MOCK_DEVICES.map(device => ({
  id: device.id,
  category: device.category,
  brand: device.brand,
  model: device.model,
  variant: device.variant || null,
  release_year: device.releaseYear,
  base_price: device.basePrice,
  image_url: device.imageUrl || null,
  specifications: device.specifications || null,
}))

console.log(`Total devices: ${devices.length}`)

fs.writeFileSync(
  '/tmp/cc-agent/57977831/project/scripts/all-devices.json',
  JSON.stringify(devices, null, 2)
)

console.log('Devices exported to all-devices.json')
