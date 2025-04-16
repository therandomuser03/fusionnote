"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import { Button } from '@/components/ui/button'
import { useAuth } from '@clerk/nextjs'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
  Save,
  Heading1,
  Heading2,
  Heading3,
  Code,
  CheckSquare,
  Image as ImageIcon,
  Link as LinkIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Note, createNote, updateNote } from '@/lib/supabase'
import { toast } from "sonner"
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const lowlight = createLowlight(common)

const MenuBar = ({ editor, onSave, title, setTitle }: { 
  editor: ReturnType<typeof useEditor>
  onSave: () => void
  title: string
  setTitle: (title: string) => void
}) => {
  if (!editor) {
    return null
  }

  const addImage = () => {
    toast.info("Currently, we only support image URLs. Direct upload functionality will be available soon!")
    const url = window.prompt('Enter image URL')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const url = window.prompt('Enter URL')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="border-b p-2 flex flex-wrap gap-2">
      <div className="flex-1">
        <Input
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="max-w-md"
        />
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          data-active={editor.isActive('bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          data-active={editor.isActive('italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          data-active={editor.isActive('strike')}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-4" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          data-active={editor.isActive('heading', { level: 1 })}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          data-active={editor.isActive('heading', { level: 2 })}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          data-active={editor.isActive('heading', { level: 3 })}
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-4" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          data-active={editor.isActive('bulletList')}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          data-active={editor.isActive('orderedList')}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          data-active={editor.isActive('taskList')}
        >
          <CheckSquare className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-4" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          data-active={editor.isActive('codeBlock')}
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          data-active={editor.isActive('blockquote')}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-4" />
        <Button
          variant="ghost"
          size="icon"
          onClick={addImage}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={addLink}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-4" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-1 h-4" />
        <Button
          variant="ghost"
          size="icon"
          onClick={onSave}
        >
          <Save className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export function TiptapEditor({ note, onSave }: { note?: Note, onSave?: (note: Note) => void }) {
  const { getToken, userId } = useAuth()
  const [title, setTitle] = useState(note?.title || '')
  const [saving, setSaving] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({
        placeholder: 'Start writing your note...',
      }),
      CharacterCount,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: note?.content || '',
  })

  const handleSave = async () => {
    if (!editor || !userId) return

    setSaving(true)
    try {
      const content = editor.getHTML()
      const token = await getToken()
      let savedNote: Note | null

      if (note?.id) {
        savedNote = await updateNote(note.id, title || 'Untitled Note', content, token, userId)
      } else {
        savedNote = await createNote(title || 'Untitled Note', content, token, userId)
      }

      if (savedNote) {
        onSave?.(savedNote)
        toast.success('Note saved successfully')
      } else {
        toast.error('Failed to save note')
      }
    } catch (error) {
      console.error('Error saving note:', error)
      toast.error('Failed to save note')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="relative min-h-[500px] border rounded-lg">
      <MenuBar editor={editor} onSave={handleSave} title={title} setTitle={setTitle} />
      <EditorContent editor={editor} className="prose prose-sm max-w-none p-4" />
      {saving && (
        <div className="absolute bottom-4 right-4 text-sm text-muted-foreground">
          Saving...
        </div>
      )}
      <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">
        {editor?.storage.characterCount.characters()} characters
      </div>
    </div>
  )
} 