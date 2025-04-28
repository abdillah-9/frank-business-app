
import { createClient } from '@supabase/supabase-js'

const key =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyc2ZlZmZuZnF5b2hhZ2Rha2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NTMxOTIsImV4cCI6MjA2MTEyOTE5Mn0.Itlko0rrHNWEs8g7gGjnbmSKtVGei7QbbVcuuNAw_YU";
const supabaseUrl = 'https://qrsfeffnfqyohagdakgd.supabase.co'
const supabaseKey = key;
const supabase1 = createClient(supabaseUrl, supabaseKey);

export default supabase1;