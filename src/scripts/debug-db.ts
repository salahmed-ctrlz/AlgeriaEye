import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function debug() {
    console.log("--- START DEBUG ---");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("\n--- SERVICE ROLE CHECK ---");
    const { data: listings, error: lErr, count: lCount } = await supabase.from("listings").select("*", { count: 'exact' });
    if (lErr) console.error("Listings Table Error:", lErr.message);
    else console.log(`Listings Table: ${lCount} rows found.`);

    const { data: profiles, error: pErr, count: pCount } = await supabase.from("profiles").select("*", { count: 'exact' });
    if (pErr) console.error("Profiles Table Error:", pErr.message);
    else console.log(`Profiles Table: ${pCount} rows found.`);

    console.log("\n--- ANON ROLE CHECK (Simulation) ---");
    const anonClient = createClient(supabaseUrl, anonKey);

    const { data: aListings, error: alErr } = await anonClient.from("listings").select("*");
    if (alErr) console.error("Anon Listings Error:", alErr.message);
    else console.log("Anon Listings visible:", aListings?.length);

    const { data: aProfiles, error: apErr } = await anonClient.from("profiles").select("*");
    if (apErr) console.error("Anon Profiles Error:", apErr.message);
    else console.log("Anon Profiles visible:", aProfiles?.length);

    console.log("--- END DEBUG ---");
}

debug();
