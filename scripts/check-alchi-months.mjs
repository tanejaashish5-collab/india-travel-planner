import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: 'apps/web/.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false }});

// Find all 12 destinations with empty best_months
const { data: empty } = await supabase.from('destinations').select('id, name, best_months').or('best_months.is.null,best_months.eq.{}');
console.log('Empty-best_months destinations:', empty);

// Check if destination_months has data for these
for (const d of empty || []) {
  const { data: scores } = await supabase.from('destination_months').select('month, score').eq('destination_id', d.id).order('score', { ascending: false });
  console.log(`\n${d.id} months (score desc):`, scores?.slice(0, 12).map(r => `M${r.month}=${r.score}`).join(' '));
}
