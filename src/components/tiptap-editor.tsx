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
        emptyEditorClass: 'is-editor-empty',
        emptyNodeClass: 'is-node-empty',
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
        includeChildren: true,
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
    autofocus: true,
    editable: true,
    enableInputRules: true,
    enablePasteRules: true,
    editorProps: {
      handleDOMEvents: {
        keydown: (view, event) => {
          // Prevent default browser shortcuts when editor is focused
          if (view.hasFocus()) {
            const { key, ctrlKey, metaKey, shiftKey } = event
            
            // List of shortcuts to handle
            const shortcuts: Record<string, () => boolean> = {
              'b': () => {
                event.preventDefault()
                return editor?.chain().focus().toggleBold().run() || false
              },
              'i': () => {
                event.preventDefault()
                return editor?.chain().focus().toggleItalic().run() || false
              },
              'h': () => {
                event.preventDefault()
                return editor?.chain().focus().toggleHeading({ level: 1 }).run() || false
              },
              'l': () => {
                event.preventDefault()
                return editor?.chain().focus().toggleBulletList().run() || false
              },
              's': () => {
                event.preventDefault()
                handleSave()
                return true
              },
              'z': () => {
                event.preventDefault()
                if (shiftKey) {
                  editor?.chain().focus().redo().run()
                } else {
                  editor?.chain().focus().undo().run()
                }
                return true
              },
              'y': () => {
                event.preventDefault()
                editor?.chain().focus().redo().run()
                return true
              },
              'f': () => {
                event.preventDefault()
                // Find functionality will be implemented later
                return true
              },
              'a': () => {
                event.preventDefault()
                editor?.chain().focus().selectAll().run()
                return true
              }
            }

            // Handle backspace with modifier
            if ((ctrlKey || metaKey) && key === 'Backspace') {
              event.preventDefault()
              editor?.chain().focus().deleteRange({ from: editor.state.selection.$anchor.pos - 1, to: editor.state.selection.$anchor.pos }).run()
              return true
            }

            // Check if the pressed key combination matches any shortcut
            if ((ctrlKey || metaKey) && shortcuts[key]) {
              shortcuts[key]()
              return true
            }

            // Allow native browser behavior for word navigation
            if ((ctrlKey || metaKey) && ['ArrowLeft', 'ArrowRight', 'Backspace'].includes(key)) {
              return false
            }
          }
          return false
        }
      }
    }
  })

  if (!editor) {
    return null
  }

  const handleSave = async () => {
    if (!editor || !userId) return

    try {
      const content = editor.getHTML()
      const token = await getToken()
      
      let savedNote: Note | null
      if (note) {
        savedNote = await updateNote(note.id, title, content, token, userId)
      } else {
        savedNote = await createNote(title, content, token, userId)
      }

      if (savedNote && onSave) {
        onSave(savedNote)
      }
    } catch (error) {
      console.error('Error saving note:', error)
      toast.error('Failed to save note')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <MenuBar editor={editor} onSave={handleSave} title={title} setTitle={setTitle} />
      <div 
        className="flex-1 overflow-auto p-4"
        onClick={() => editor.commands.focus()}
        onKeyDown={(e) => {
          // Prevent default browser shortcuts when editor is focused
          if (editor.isFocused && (e.ctrlKey || e.metaKey)) {
            e.preventDefault()
          }
        }}
      >
        <EditorContent 
          editor={editor} 
          className="prose dark:prose-invert max-w-none focus:outline-none" 
        />
      </div>
    </div>
  )
} 