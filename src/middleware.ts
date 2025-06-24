import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isAuthPage = path === '/' || path === '/login' || path === '/signup'
  const token = request.cookies.get("token")?.value || ''

  // 🔒 If user is logged in and trying to access auth pages → redirect to /dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // 🚫 If user is NOT logged in and trying to access non-auth pages → redirect to /
  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // ✅ Allow valid access
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/dashboard',
    '/profile',
    '/some-other-private-page', // Add any other private paths here
  ],
}
