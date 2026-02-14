import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function debug() {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Listing tables in 'public' schema...");
    const { data: tables, error } = await supabase
        .from('pg_tables') // Wait, Supabase doesn't allow direct from pg_tables via API usually.
        .select('*');

    // Use an RPC or just try standard tables
    const standardTables = ['listings', 'profiles', 'reviews', 'bookings'];
    for (const table of standardTables) {
        const { error } = await supabase.from(table).select('*').limit(0);
        if (error) {
            console.log(`Table '${table}': ERROR - ${error.message}`);
        } else {
            console.log(`Table '${table}': EXISTS`);
        }
    }
}

debug();
