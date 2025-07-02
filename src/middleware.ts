// src/middleware.ts
import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get("token")?.value || ''

  const isAuthPage = path === '/' || path === '/login' || path === '/signup'
  const isProtectedRoute = !isAuthPage

  // 🔒 If logged in and accessing login/signup → redirect to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // 🚫 If NOT logged in and accessing protected route → redirect to login with callback
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', path)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/dashboard',
    '/profile',
    '/some-other-private-page',
    '/changelog/feedback', // ✅ Include feedback page here
  ],
}
