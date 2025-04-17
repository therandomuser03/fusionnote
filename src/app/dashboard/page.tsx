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
import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Dashboard() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/')
    }
  }, [isLoaded, isSignedIn, router])

  const handleSave = async (note: Note) => {
    toast("Note saved", {
      description: "Your note has been saved successfully.",
    })
    
    // Trigger a refresh of the notes list
    setRefreshTrigger(prev => prev + 1)
    
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
      <AppSidebar refreshTrigger={refreshTrigger} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center gap-2">
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
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium text-background">Keyboard Shortcuts</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-background">Bold</span>
                            <div className="flex gap-1">
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">⌘B</kbd>
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">Ctrl+B</kbd>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-background">Italic</span>
                            <div className="flex gap-1">
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">⌘I</kbd>
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">Ctrl+I</kbd>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-background">Heading</span>
                            <div className="flex gap-1">
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">⌘H</kbd>
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">Ctrl+H</kbd>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-background">List</span>
                            <div className="flex gap-1">
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">⌘L</kbd>
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">Ctrl+L</kbd>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-background">Move by Word</span>
                            <div className="flex gap-1">
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">⌘←/→</kbd>
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">Ctrl+←/→</kbd>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-background">Delete Word</span>
                            <div className="flex gap-1">
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">⌘⌫</kbd>
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">Ctrl+⌫</kbd>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-background">Save</span>
                            <div className="flex gap-1">
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">⌘S</kbd>
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">Ctrl+S</kbd>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-background">Undo</span>
                            <div className="flex gap-1">
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">⌘Z</kbd>
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">Ctrl+Z</kbd>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-background">Redo</span>
                            <div className="flex gap-1">
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">⌘⇧Z</kbd>
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">Ctrl+Y</kbd>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-background">Find</span>
                            <div className="flex gap-1">
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">⌘F</kbd>
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">Ctrl+F</kbd>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-background">Select by Word</span>
                            <div className="flex gap-1">
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">⌘⇧←/→</kbd>
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">Ctrl+⇧←/→</kbd>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-background">Select All</span>
                            <div className="flex gap-1">
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">⌘A</kbd>
                              <kbd className="px-1.5 py-0.5 text-xs bg-muted text-foreground rounded">Ctrl+A</kbd>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <ThemeToggle />
            </div>
            </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto h-full">
            <div className="mb-6 p-6">
              <h1 className="text-3xl font-bold">New Note</h1>
              <p className="text-muted-foreground">Create a new note using the editor below.</p>
            </div>
            <div className="h-[calc(100vh-12rem)]">
              <TiptapEditor onSave={handleSave} />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
