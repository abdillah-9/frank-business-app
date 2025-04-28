
import { createClient } from '@supabase/supabase-js'

const adminKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyc2ZlZmZuZnF5b2hhZ2Rha2dkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTU1MzE5MiwiZXhwIjoyMDYxMTI5MTkyfQ.E9CupIcmLehmrcd0eq70WmLOFr2EEjHQKtWBKis_lxg";
const supabaseUrl = 'https://qrsfeffnfqyohagdakgd.supabase.co'
const supabaseAdmin = createClient(supabaseUrl, adminKey);

export default supabaseAdmin;