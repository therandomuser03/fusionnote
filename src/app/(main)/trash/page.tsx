// src/app/(main)/trash/page.tsx

import AppFooter from '@/components/layout/AppFooter'
import AppNavbar from '@/components/layout/AppNavbar'
import TrashHeader from '@/components/trash/TrashHeader'
import TrashNotes from '@/components/trash/TrashNotes'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { DropdownMenu, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import React from 'react'

export default function Trash() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky top navbar */}
      <div className="sticky top-0 z-50 bg-background">
        <div className="mx-auto items-center justify-center py-3 max-w-6xl">
        <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <DropdownMenu>
                    <BreadcrumbPage>Trash</BreadcrumbPage>
                  <DropdownMenuContent align="start">
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>

            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <AppNavbar />
      </div>

      <TrashHeader />

      {/* Main content should grow to fill space */}
      <div className="flex-grow pt-16 pb-16">
        <TrashNotes />
      </div>

      {/* Footer always at bottom */}
      <AppFooter />
    </div>
  )
}













// import React from 'react'

// export default function Trash() {
//   return (
//     <div className="p-8 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold">Trash</h1>
//       <p className="text-gray-500 mt-2">This is your trash. Notes you delete will appear here.</p>
//     </div>
//   );
// }