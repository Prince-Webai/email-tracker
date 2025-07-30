import { supabaseService } from '../../../../lib/supabase';

// 1x1 transparent GIF pixel
const transparentGif = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

export async function GET(request, { params }) {
  try {
    const { emailId } = params;
    
    if (!emailId) {
      return new Response(transparentGif, {
        status: 400,
        headers: {
          'Content-Type': 'image/gif',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }

    // Get user agent and IP
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'Unknown';

    // Log the tracking event to Supabase
    const { error } = await supabaseService
      .from('email_tracking')
      .insert({
        email_id: emailId,
        opened_at: new Date().toISOString(),
        user_agent: userAgent,
        ip_address: ip,
      });

    if (error) {
      console.error('❌ Failed to log tracking event:', error);
    } else {
      console.log(`✅ Tracked email open: ${emailId}`);
    }

    // Always return the transparent GIF for invisible tracking
    // This works for both image requests and background-image CSS
    return new Response(transparentGif, {
      status: 200,
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('❌ Tracking pixel error:', error);
    
    // Still return the pixel even if logging fails
    return new Response(transparentGif, {
      status: 200,
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
} 