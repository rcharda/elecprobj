const SUPABASE_URL = window.__ELECPRO_ENV__?.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = window.__ELECPRO_ENV__?.SUPABASE_ANON_KEY || '';
window.supabaseClient = window.supabase?.createClient?.(SUPABASE_URL, SUPABASE_ANON_KEY) || null;
