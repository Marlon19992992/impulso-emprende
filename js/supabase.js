// URL de tu proyecto
const SUPABASE_URL = "https://jgbtglvvkkwydsluiqqn.supabase.co";

// Clave pública (Publishable / anon)
const SUPABASE_KEY = "sb_publishable_HZdIVUWYSsWnddgSX8v81w_XyXhFlWX";

// Cliente de Supabase
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);