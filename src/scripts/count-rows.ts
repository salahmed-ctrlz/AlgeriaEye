import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

async function debug() {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const tables = ['listings', 'profiles', 'reviews', 'bookings'];

    console.log("--- ROW COUNTS (SERVICE ROLE) ---");
    for (const table of tables) {
        const { count, error } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });

        if (error) {
            console.log(`${table}: ERROR - ${error.message}`);
        } else {
            console.log(`${table}: ${count} rows`);
        }
    }
}

debug();
