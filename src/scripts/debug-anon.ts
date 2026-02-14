import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function debug() {
    console.log("--- ANON ACCESS DEBUG ---");
    const anonClient = createClient(supabaseUrl, anonKey);

    console.log("Fetching listings with ANON_KEY...");
    const { data, error } = await anonClient
        .from("listings")
        .select("*");

    if (error) {
        console.log("ERROR fetching listings (ANON):", error.message);
        console.log("Error Details:", JSON.stringify(error, null, 2));
    } else {
        console.log(`SUCCESS: Found ${data?.length} listings.`);
    }

    console.log("\nFetching profiles with ANON_KEY...");
    const { data: pData, error: pError } = await anonClient
        .from("profiles")
        .select("*")
        .limit(1);

    if (pError) {
        console.log("ERROR fetching profiles (ANON):", pError.message);
    } else {
        console.log(`SUCCESS: Profiles are visible.`);
    }
}

debug();
