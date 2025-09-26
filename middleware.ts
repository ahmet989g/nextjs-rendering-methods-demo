import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const start = Date.now();
  const response = NextResponse.next();
  
  // Add server timing headers for performance monitoring
  response.headers.set('Server-Timing', `total;dur=${Date.now() - start}`);
  
  // Add rendering type header based on path
  const path = request.nextUrl.pathname;
  if (path.includes('/csr/')) {
    response.headers.set('X-Rendering-Type', 'CSR');
  } else if (path.includes('/ssr/')) {
    response.headers.set('X-Rendering-Type', 'SSR');
  } else if (path.includes('/ssg/')) {
    response.headers.set('X-Rendering-Type', 'SSG');
  } else if (path.includes('/isr/')) {
    response.headers.set('X-Rendering-Type', 'ISR');
  } else if (path.includes('/ppr/')) {
    response.headers.set('X-Rendering-Type', 'PPR');
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}