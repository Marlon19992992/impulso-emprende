// El SDK agrega internamente la ruta /rest/v1; aquí debe ir la URL base del proyecto.
const SUPABASE_URL = "https://jgbtglvvkkwydsluiqqn.supabase.co";

const SUPABASE_KEY = "sb_publishable_HZdIVUWYSsWnddgSX8v81w_XyXhFlWX";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
