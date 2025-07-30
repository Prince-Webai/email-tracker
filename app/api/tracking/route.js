import { supabaseService } from '../../../lib/supabase';

export async function GET() {
  try {
    console.log('📊 Fetching tracking data from Supabase...');
    
    const { data, error } = await supabaseService
      .from('email_tracking')
      .select('*')
      .order('opened_at', { ascending: false });

    if (error) {
      console.error('❌ Supabase error:', error);
      return Response.json({
        error: 'Failed to fetch tracking data',
        details: error.message
      }, { status: 500 });
    }

    console.log(`✅ Retrieved ${data?.length || 0} tracking records`);
    
    return Response.json(data || []);

  } catch (error) {
    console.error('❌ Server error:', error);
    return Response.json({
      error: 'Internal server error',
      details: error.message
    }, { status: 500 });
  }
} 