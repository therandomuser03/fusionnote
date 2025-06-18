import { NextResponse } from 'next/server'

export default function middleware() {
  // Your middleware logic
  return NextResponse.next()
}
