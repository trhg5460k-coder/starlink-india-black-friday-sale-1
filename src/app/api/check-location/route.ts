import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Get IP from headers - try multiple sources
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');
    
    const ip = forwardedFor?.split(',')[0] || realIp || cfConnectingIp || 'unknown';
    
    // For development/localhost, allow access
    if (ip === 'unknown' || ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return NextResponse.json({ 
        allowed: true, 
        country: 'IN', 
        message: 'Development mode - access granted',
        ip: ip
      });
    }

    // Use ip-api.com for geolocation (free, no API key needed)
    const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode`);
    const geoData = await geoResponse.json();
    
    if (geoData.status === 'fail') {
      // If geolocation fails, allow access (fail-open approach)
      return NextResponse.json({ 
        allowed: true, 
        country: 'UNKNOWN', 
        message: 'Geolocation failed - access granted',
        ip: ip
      });
    }

    const countryCode = geoData.countryCode;
    const isIndia = countryCode === 'IN';
    
    return NextResponse.json({
      allowed: isIndia,
      country: countryCode,
      countryName: geoData.country,
      message: isIndia ? 'Access granted' : 'Access restricted to India only',
      ip: ip
    });
    
  } catch (error) {
    console.error('Geolocation check error:', error);
    // Fail open - allow access if check fails
    return NextResponse.json({ 
      allowed: true, 
      country: 'UNKNOWN', 
      message: 'Error checking location - access granted',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
