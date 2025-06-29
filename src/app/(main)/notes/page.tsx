import AppFooter from '@/components/layout/AppFooter'
import AppNavbar from '@/components/layout/AppNavbar'
import NotesContent from '@/components/notes/NotesContent'
import NotesHeader from '@/components/notes/NotesHeader'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { DropdownMenu, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import React from 'react'

export default function Notes() {
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
                    <BreadcrumbPage>Notes</BreadcrumbPage>
                  <DropdownMenuContent align="start">
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>

            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <AppNavbar />
      </div>

      <NotesHeader />

      {/* Main content should grow to fill space */}
      <div className="flex-grow pt-16 pb-16">
        <NotesContent />
      </div>

      {/* Footer always at bottom */}
      <AppFooter />
    </div>
  )
}
