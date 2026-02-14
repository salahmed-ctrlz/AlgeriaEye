
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function findById() {
    const { data, error } = await supabase.from('listings').select('*').eq('id', '10465f6f-ca4e-4adf-be8c-ab0badcdddf1');
    if (error) console.error(error);
    console.log('ID_SEARCH_RESULT:', JSON.stringify(data, null, 2));
}

findById();
