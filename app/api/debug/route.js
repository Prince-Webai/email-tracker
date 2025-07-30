import { supabaseService } from '../../../lib/supabase';

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
      supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing',
      nodeEnv: process.env.NODE_ENV || 'development'
    };

    // Test Supabase connection
    let supabaseStatus = '❌ Failed';
    let testData = null;
    
    try {
      const { data, error } = await supabaseService
        .from('email_tracking')
        .select('count')
        .limit(1);

      if (error) {
        supabaseStatus = `❌ Error: ${error.message}`;
      } else {
        supabaseStatus = '✅ Connected';
        
        // Try to get actual data
        const { data: trackingData, error: dataError } = await supabaseService
          .from('email_tracking')
          .select('*')
          .limit(5);

        if (dataError) {
          testData = `❌ Data Error: ${dataError.message}`;
        } else {
          testData = `✅ Found ${trackingData?.length || 0} records`;
        }
      }
    } catch (error) {
      supabaseStatus = `❌ Exception: ${error.message}`;
    }

    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: envCheck,
      supabase: {
        status: supabaseStatus,
        testData: testData
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    };

    return Response.json(debugInfo, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });

  } catch (error) {
    return Response.json({
      error: 'Debug endpoint failed',
      message: error.message,
      timestamp: new Date().toISOString()
    }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
} 