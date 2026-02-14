
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing Supabase URL or Service Role Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function deleteListing() {
    const listingId = '10465f6f-ca4e-4adf-be8c-ab0badcdddf1';

    console.log(`Attempting to delete listing: ${listingId}`);

    const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', listingId);

    if (error) {
        console.error('Error deleting listing:', error);
    } else {
        console.log('Listing deleted successfully (if it existed).');
    }
}

deleteListing();
