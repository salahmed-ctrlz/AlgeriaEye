
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function find() {
    console.log('--- Searching for ALL transport listings ---');
    const { data, error } = await supabase.from('listings').select('id, title, type').eq('type', 'transport');
    if (error) console.error(error);
    console.log(JSON.stringify(data, null, 2));

    console.log('--- Searching for keywords ---');
    const { data: keywords } = await supabase.from('listings').select('id, title').ilike('title', '%rental%');
    console.log(JSON.stringify(keywords, null, 2));
}

find();
