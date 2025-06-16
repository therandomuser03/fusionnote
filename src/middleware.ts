import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  // Your middleware logic
  return NextResponse.next()
}
