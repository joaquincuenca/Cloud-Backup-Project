import { createClient } from '@supabase/supabase-js';

// Your Supabase project details
const SUPABASE_URL = "https://zydwdjocyfyovsagfque.supabase.co"; // Replace with your Project URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5ZHdkam9jeWZ5b3ZzYWdmcXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2Mjc3OTIsImV4cCI6MjA1ODIwMzc5Mn0.rd2jrpPjuMcUsicnuTzO_lVqUaMCDIFHu9iVzBi7XLw"; // Replace with your Anon Key

// Create a Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
