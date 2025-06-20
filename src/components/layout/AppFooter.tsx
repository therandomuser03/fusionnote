import React from 'react'

export default function AppFooter() {
  return (
    <footer className="relative border-t border-primary/10 py-16 pb-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} FusionNote. All rights reserved.
          </p>
        </div>
      </div>

      {/* Outlined Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[15rem] font-bold lowercase select-none text-outline text-transparent dark:text-gray-300/10">
          FusionNote
        </h1>
      </div>
    </footer>
  )
}
