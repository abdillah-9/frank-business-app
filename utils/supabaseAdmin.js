
import { createClient } from '@supabase/supabase-js'

const adminKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhscHB5aWxuZ3Bxd3hmaWprb2FiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNzc0OTY2MywiZXhwIjoyMDUzMzI1NjYzfQ.OI9pzxzhr5GjcylQAl0FWSpylPKS64W02BaunQagCoI";
const supabaseUrl = 'https://hlppyilngpqwxfijkoab.supabase.co'
const supabaseAdmin = createClient(supabaseUrl, adminKey);

export default supabaseAdmin;