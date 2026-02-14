
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Service Role Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function findAndDeleteSamir() {
    console.log("Searching for 'Samir' listings...");

    // 1. Fetch all listings that might be relevant
    const { data: listings, error } = await supabase
        .from('listings')
        .select('id, title, description')
        .ilike('title', '%Samir%');

    if (error) {
        console.error('Error fetching listings:', error);
        return;
    }

    console.log(`Found ${listings?.length || 0} listings matching 'Samir' in title.`);

    if (listings && listings.length > 0) {
        for (const listing of listings) {
            console.log(`Deleting listing: ${listing.title} (${listing.id})`);
            const { error: deleteError } = await supabase
                .from('listings')
                .delete()
                .eq('id', listing.id);

            if (deleteError) {
                console.error(`Failed to delete ${listing.id}:`, deleteError);
            } else {
                console.log(`Deleted ${listing.id} successfully.`);
            }
        }
    }

    // Double check specific ID provided by user
    const specificId = '10465f6f-ca4e-4adf-be8c-ab0badcdddf1';
    console.log(`Checking specific ID: ${specificId}`);
    const { data: specific, error: specificError } = await supabase
        .from('listings')
        .select('id')
        .eq('id', specificId)
        .single();

    if (specific) {
        console.log(`Specific listing ${specificId} STILL EXISTS. Force deleting...`);
        const { error: forceDeleteError } = await supabase
            .from('listings')
            .delete()
            .eq('id', specificId);
        if (forceDeleteError) {
            console.error(`Failed to force delete ${specificId}:`, forceDeleteError);
        } else {
            console.log(`Force deleted ${specificId} successfully.`);
        }
    } else {
        console.log(`Specific listing ${specificId} not found (already deleted?).`);
    }
}

findAndDeleteSamir();
