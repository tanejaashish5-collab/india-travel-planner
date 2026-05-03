import { createClient } from "@supabase/supabase-js";
const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const { data, error } = await s.from("emergency_sos").select("destination_id, source_url, source_label, last_verified_attempt_at").limit(1);
if (error) console.error("emergency_sos cols missing:", error.message);
else console.log("emergency_sos source columns OK. Sample:", JSON.stringify(data));
