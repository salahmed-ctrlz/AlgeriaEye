
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function find() {
    console.log('--- Searching for Samir ---');
    const { data: samir } = await supabase.from('listings').select('*').ilike('title', '%Samir%');
    console.log(JSON.stringify(samir, null, 2));

    console.log('--- Searching for Yanis ---');
    const { data: yanis } = await supabase.from('listings').select('*').ilike('title', '%Yanis%');
    console.log(JSON.stringify(yanis, null, 2));
}

find();
