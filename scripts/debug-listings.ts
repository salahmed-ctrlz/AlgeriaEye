
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

async function listListings() {
    const { data, error } = await supabase
        .from('listings')
        .select('id, title, owner_id');

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('--- Current Listings ---');
    data.forEach(l => console.log(`ID: ${l.id} | Title: ${l.title}`));
    console.log('------------------------');
}

listListings();
