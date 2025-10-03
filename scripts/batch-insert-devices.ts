import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function main() {
  const devices = JSON.parse(
    fs.readFileSync('/tmp/cc-agent/57977831/project/scripts/all-devices.json', 'utf-8')
  )

  console.log(`Starting import of ${devices.length} devices...`)

  // Delete existing devices
  console.log('Deleting existing devices...')
  const { error: deleteError } = await supabase.from('devices').delete().neq('id', '')
  if (deleteError) {
    console.error('Error deleting devices:', deleteError)
    return
  }
  console.log('Existing devices deleted')

  // Insert in batches of 100
  const batchSize = 100
  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < devices.length; i += batchSize) {
    const batch = devices.slice(i, i + batchSize)
    console.log(`Inserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(devices.length / batchSize)} (${batch.length} devices)...`)

    const { error } = await supabase.from('devices').insert(batch)

    if (error) {
      console.error(`Error in batch ${Math.floor(i / batchSize) + 1}:`, error)
      errorCount += batch.length
    } else {
      successCount += batch.length
      console.log(`✓ Batch ${Math.floor(i / batchSize) + 1} inserted successfully`)
    }
  }

  console.log('\n=== Import Complete ===')
  console.log(`Success: ${successCount} devices`)
  console.log(`Errors: ${errorCount} devices`)
  console.log(`Total: ${devices.length} devices`)
}

main()
