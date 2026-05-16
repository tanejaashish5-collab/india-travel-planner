import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config({ path: "apps/web/.env.local" });
const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);
const { data } = await sb.from("local_eateries")
  .select("price_range, price_per_head_inr")
  .not("price_per_head_inr", "is", null)
  .limit(20);
for (const r of data) console.log(r.price_range, "→", r.price_per_head_inr);
