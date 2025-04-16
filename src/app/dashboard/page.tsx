"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { TiptapEditor } from "@/components/tiptap-editor"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Note } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"
import { useEffect } from "react"

export default function Dashboard() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/')
    }
  }, [isLoaded, isSignedIn, router])

  const handleSave = async (note: Note) => {
    toast("Note saved", {
      description: "Your note has been saved successfully.",
    })
    
    // If this is a new note, redirect to the note's page
    if (window.location.pathname === '/dashboard') {
      router.push(`/dashboard/notes/${note.id}`)
    }
  }

  // Show loading state while checking authentication
  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Loading...</div>
          <div className="text-muted-foreground">Please wait while we check your authentication.</div>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>New Note</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">New Note</h1>
              <p className="text-muted-foreground">Create a new note using the editor below.</p>
            </div>
            <TiptapEditor onSave={handleSave} />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
