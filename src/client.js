import { createClient } from '@supabase/supabase-js';

const URL = 'https://xylgkopkxxjrgdpchuzh.supabase.co';
const API_KEY = 'sb_publishable_R5UtMCw_kOiAAuwDOUAfhg_K8fJlBcV';

export const supabase = createClient(URL, API_KEY);

