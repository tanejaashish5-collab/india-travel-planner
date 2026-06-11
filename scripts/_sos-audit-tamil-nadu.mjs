import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const { data, error } = await supabase
  .from('emergency_sos')
  .select(`
    destination_id,
    rescue_contact,
    mountain_rescue,
    nearest_hospital,
    destinations!inner(state_id, id, name)
  `)
  .eq('destinations.state_id', 'tamil-nadu');

if (error) {
  console.error('Query error:', error);
  process.exit(1);
}

// Filter for rows with actual phone data
const rows = data.filter(row =>
  (row.rescue_contact && /[0-9]{6,}/.test(row.rescue_contact)) ||
  (row.mountain_rescue && /[0-9]{6,}/.test(row.mountain_rescue)) ||
  (row.nearest_hospital && /[0-9]{6,}/.test(row.nearest_hospital))
);

console.log(`Found ${rows.length} Tamil Nadu SOS records with phone numbers:\n`);
console.log(JSON.stringify(rows, null, 2));
