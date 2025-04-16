"use client"

import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { Note, getNotes, deleteNote } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  FileText, 
  Trash2, 
  Plus,
  Clock
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function NotesList() {
  const { getToken, userId } = useAuth()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchNotes() {
      if (!userId) return
      const token = await getToken()
      const fetchedNotes = await getNotes(token, userId)
      if (fetchedNotes) {
        setNotes(fetchedNotes)
      }
      setLoading(false)
    }
    fetchNotes()
  }, [getToken, userId])

  const handleDelete = async (id: string) => {
    if (!userId) return
    const token = await getToken()
    const success = await deleteNote(id, token, userId)
    if (success) {
      setNotes(notes.filter(note => note.id !== id))
      toast.success('Note deleted successfully')
    } else {
      toast.error('Failed to delete note')
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch {
      return 'Unknown date'
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={() => router.push('/dashboard/notes/new')}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        {notes.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">No notes yet. Create your first note!</div>
        ) : (
          <div className="p-2">
            {notes.map((note) => (
              <div 
                key={note.id} 
                className="group flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer mb-1"
                onClick={() => router.push(`/dashboard/notes/${note.id}`)}
              >
                <div className="flex items-center overflow-hidden">
                  <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                  <div className="overflow-hidden">
                    <div className="font-medium truncate">{note.title || 'Untitled Note'}</div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(note.updated_at)}
                    </div>
                  </div>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="opacity-0 group-hover:opacity-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Note</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this note? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(note.id)
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
} 