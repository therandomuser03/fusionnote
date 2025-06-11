import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Example logic
  return NextResponse.next()
}

// Optional: Specify paths where middleware should run
export const config = {
  matcher: ['/dashboard/:path*', '/notes/:path*'], // <-- adjust this to match your needs
}
