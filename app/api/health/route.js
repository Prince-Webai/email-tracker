import { testSupabaseConnection } from '../../../lib/supabase';

export async function GET() {
  try {
    const supabaseStatus = await testSupabaseConnection();
    
    const healthData = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        supabase: supabaseStatus ? 'connected' : 'disconnected'
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing',
        supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'configured' : 'missing'
      }
    };

    const statusCode = supabaseStatus ? 200 : 503;
    
    return Response.json(healthData, { status: statusCode });

  } catch (error) {
    console.error('❌ Health check error:', error);
    
    return Response.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message
    }, { status: 500 });
  }
} 