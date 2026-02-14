
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function restore() {
    console.log('Restoring AutoLuxe Yanis...');
    // Find the agency user
    const { data: users } = await supabase.auth.admin.listUsers();
    const user = users.users.find(u => u.email === "test@travel.agency");

    if (!user) {
        console.error("User not found");
        return;
    }

    const { error } = await supabase.from("listings").insert({
        title: "AutoLuxe Yanis",
        owner_id: user.id,
        description: "Premium car rental service in Algeria. Luxury and comfort for your travels.",
        type: "transport",
        wilaya: "Algiers",
        address: "Algiers Center",
        price_per_night: 8000,
        images: ["/images/car.png"],
        features: ["Luxury Cars", "Airport Pickup", "Professional Drivers"],
        created_at: new Date().toISOString()
    });

    if (error) {
        console.error("RESTORE FAILED:", error);
    } else {
        console.log("RESTORE SUCCESS: AutoLuxe Yanis restored.");
    }
}

restore();
