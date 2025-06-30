import { NextResponse, NextRequest } from 'next/server';
import { connect } from '@/lib/db';
import Note from '@/models/Note';
import { getDataFromToken } from '@/utils/auth';

export async function POST(req: NextRequest) {
  try {
    await connect();
    const userId = getDataFromToken(req);

    const body = await req.json();
    console.log("📥 POST body received:", body);

    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
    }

    const note = await Note.create({
      title,
      content,
      ownerId: userId,
    });

    console.log("✅ Note created:", note._id);
    return NextResponse.json(note);
  } catch (err: any) {
    console.error('❌ POST /api/notes failed:', err.message);
    return NextResponse.json({ error: err.message || 'Failed to create note' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connect();
    const userId = getDataFromToken(req);

    const body = await req.json();
    console.log("📥 PUT body received:", body);

    const { id, title, content } = body;

    if (!id || !title || !content) {
      return NextResponse.json({ error: 'Missing id, title, or content' }, { status: 400 });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, ownerId: userId },
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ error: 'Note not found or unauthorized' }, { status: 404 });
    }

    console.log("✅ Note updated:", updatedNote._id);
    return NextResponse.json(updatedNote);
  } catch (err: any) {
    console.error('❌ PUT /api/notes failed:', err.message);
    return NextResponse.json({ error: err.message || 'Failed to update note' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connect();
    const userId = getDataFromToken(req);

    const notes = await Note.find({ ownerId: userId }).sort({ updatedAt: -1 });

    console.log("📤 GET notes:", notes.length);
    return NextResponse.json(notes);
  } catch (err: any) {
    console.error('❌ GET /api/notes failed:', err.message);
    return NextResponse.json({ error: err.message || 'Failed to fetch notes' }, { status: 500 });
  }
}
