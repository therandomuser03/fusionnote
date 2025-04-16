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
import { Note, getNoteById } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"

interface NoteContentProps {
  id: string
}

export function NoteContent({ id }: NoteContentProps) {
  const [note, setNote] = useState<Note | null>(null)
  const router = useRouter()
  const { isSignedIn, isLoaded, getToken, userId } = useAuth()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/')
    }
  }, [isLoaded, isSignedIn, router])

  useEffect(() => {
    const fetchNote = async () => {
      if (!userId) return
      try {
        const token = await getToken()
        const fetchedNote = await getNoteById(id, token, userId)
        if (fetchedNote) {
          setNote(fetchedNote)
        } else {
          toast.error("Note not found", {
            description: "The note you're looking for doesn't exist."
          })
          router.push('/dashboard')
        }
      } catch (error) {
        console.error('Error fetching note:', error)
        toast.error("Error fetching note", {
          description: "There was an error loading your note. Please try again."
        })
        router.push('/dashboard')
      }
    }

    if (isSignedIn) {
      fetchNote()
    }
  }, [id, router, isSignedIn, getToken, userId])

  const handleSave = (updatedNote: Note) => {
    setNote(updatedNote)
    toast.success("Note saved", {
      description: "Your note has been saved successfully."
    })
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
                  <BreadcrumbPage>{note?.title || 'Loading...'}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex-1 p-4">
          {note && <TiptapEditor note={note} onSave={handleSave} />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 