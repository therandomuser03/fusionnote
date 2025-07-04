// src/app/api/notes/delete/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Note from '@/models/Note';
import DeletedNote from '@/models/DeletedNote';
import { connect } from '@/lib/db';

type Context = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: NextRequest, { params }: Context) {
  await connect();

  const resolvedParams = await params;
  if (!resolvedParams?.id) {
    return NextResponse.json({ success: false, error: 'Note ID is required' }, { status: 400 });
  }

  try {
    const note = await Note.findById(resolvedParams.id);

    if (!note) {
      return NextResponse.json({ success: false, error: 'Note not found' }, { status: 404 });
    }

    await DeletedNote.create({
      originalNoteId: note._id,
      title: note.title,
      content: note.content,
      ownerId: note.ownerId,
      workspaceId: note.workspaceId ?? null,
      deletedAt: new Date(),
    });

    await Note.findByIdAndDelete(resolvedParams.id);

    return NextResponse.json({ success: true, message: 'Note successfully moved to trash' });
  } catch (err) {
    console.error('[DELETE NOTE ERROR]', err);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Context) {
  await connect();

  const resolvedParams = await params;
  if (!resolvedParams?.id) {
    return NextResponse.json({ success: false, error: 'Note ID is required' }, { status: 400 });
  }

  try {
    const deletedNote = await DeletedNote.findById(resolvedParams.id);

    if (!deletedNote) {
      return NextResponse.json({ success: false, error: 'Deleted note not found' }, { status: 404 });
    }

    const existing = await Note.findById(deletedNote.originalNoteId);
    if (existing) {
      return NextResponse.json({ success: false, error: 'Note already exists' }, { status: 409 });
    }

    await Note.create({
      _id: deletedNote.originalNoteId,
      title: deletedNote.title,
      content: deletedNote.content,
      ownerId: deletedNote.ownerId,
      workspaceId: deletedNote.workspaceId ?? undefined,
      createdAt: new Date(),
    });

    await DeletedNote.findByIdAndDelete(resolvedParams.id);

    return NextResponse.json({ success: true, message: 'Note successfully restored' });
  } catch (err) {
    console.error('[RESTORE NOTE ERROR]', err);
    return NextResponse.json({ success: false, error: 'Failed to restore note' }, { status: 500 });
  }
}
