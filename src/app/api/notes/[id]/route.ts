import { NextResponse, NextRequest } from 'next/server';
import { connect } from '@/lib/db';
import Note from '@/models/Note';
import { getDataFromToken } from '@/utils/auth';

interface GetNoteContext {
  params: {
    id: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    await connect();
    const userId = getDataFromToken(req);

    const { title, content } = await req.json();

    const note = await Note.create({
      title,
      content,
      ownerId: userId,
    });

    return NextResponse.json(note);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create note';
    console.error('❌ POST error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: GetNoteContext) {
  try {
    await connect();
    const userId = getDataFromToken(req);
    const { id } = context.params;

    const { title, content } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Note ID is required in the path' }, { status: 400 });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, ownerId: userId },
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ error: 'Note not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json(updatedNote);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update note';
    console.error('❌ PUT error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest, context: GetNoteContext) {
  try {
    await connect();
    const userId = getDataFromToken(req);
    const { id } = context.params;

    if (!id) {
      return NextResponse.json({ error: 'Note ID is required in the path' }, { status: 400 });
    }

    const note = await Note.findOne({ _id: id, ownerId: userId });

    if (!note) {
      return NextResponse.json({ error: 'Note not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch note';
    console.error('❌ GET error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
