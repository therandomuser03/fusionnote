import Editor from '@/components/editor'
import { Features } from '@/components/features'
import { Footer } from '@/components/footer'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import React from 'react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-y-auto">
      <div className="sticky top-0 z-50">
      <Navbar />
      </div>
      <main className="flex-grow">
      <Hero />
      <Editor />
      <Features />
      </main>
      <Footer />
    </div>
  )
}
