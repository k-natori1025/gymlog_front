import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/', '/record', '/log', '/ai_coach']

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value

  if (
    !sessionCookie &&
    protectedRoutes.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (sessionCookie && request.nextUrl.pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
