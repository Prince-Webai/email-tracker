import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Client for browser usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service client for server-side operations
export const supabaseService = createClient(supabaseUrl, supabaseServiceKey);

// Test connection
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabaseService
      .from('email_tracking')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      return false;
    }

    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection error:', error.message);
    return false;
  }
} 