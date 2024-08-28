import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('auth-token')?.value;
  const protectedRoutes = ['/dashboard', '/calendar', '/infoportal', '/projects', '/team'];
  
 
  if (currentUser && !protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    return Response.redirect(new URL('/dashboard', request.url))
  }
 
  if (!currentUser && !request.nextUrl.pathname.startsWith('/auth')) {
    return Response.redirect(new URL('/auth/login', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}