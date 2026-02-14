
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function findSamir() {
    const { data, error } = await supabase.from('listings').select('id, title').eq('title', 'Samir Car Rental');
    if (error) console.error(error);
    console.log('SAMIR_RESULT:', JSON.stringify(data));
}

findSamir();
