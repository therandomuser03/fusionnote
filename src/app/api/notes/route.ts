// app/api/notes/route.ts
import { NextResponse } from 'next/server'
import { connect } from '@/lib/db'
import Note from '@/models/Note'
import { getDataFromToken } from '@/utils/auth'

export async function POST(req: Request) {
  try {
    await connect()
    const userId = getDataFromToken(req as any) // casting Request as NextRequest

    const { title, content } = await req.json()

    const note = await Note.create({
      title,
      content,
      ownerId: userId,
    })

    return NextResponse.json(note)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    await connect()
    const userId = getDataFromToken(req as any)

    const { id, title, content } = await req.json()

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, ownerId: userId },
      { title, content },
      { new: true }
    )

    if (!updatedNote) {
      return NextResponse.json({ error: 'Note not found or unauthorized' }, { status: 404 })
    }

    return NextResponse.json(updatedNote)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 })
  }
}
