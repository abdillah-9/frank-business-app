
import { createClient } from '@supabase/supabase-js'

const key =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhscHB5aWxuZ3Bxd3hmaWprb2FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NDk2NjMsImV4cCI6MjA1MzMyNTY2M30.uOth-86ckazHIuFNSo6E72KHArhk40r0UCngMNV94G8";
const supabaseUrl = 'https://hlppyilngpqwxfijkoab.supabase.co'
const supabaseKey = key;
const supabase1 = createClient(supabaseUrl, supabaseKey);

export default supabase1;