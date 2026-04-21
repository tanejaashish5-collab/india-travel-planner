import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});
const { data, error } = await supabase.from('destinations').select('*').limit(1);
console.log('err:', error); console.log('cols:', data ? Object.keys(data[0]) : 'none'); console.log('row:', data ? data[0] : 'none');
