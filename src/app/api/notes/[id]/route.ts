import { NextResponse } from 'next/server';
import { connect } from '@/lib/db';
import Note from '@/models/Note'; // Still using Mongoose Note model
import { getDataFromToken } from '@/utils/auth';

// Define the type for the context object, which includes params
interface GetNoteContext {
  params: {
    id: string; // The 'id' will be available in params
  };
}

export async function POST(req: Request) {
  try {
    await connect();
    const userId = getDataFromToken(req as any);

    const { title, content } = await req.json();

    const note = await Note.create({
      title,
      content,
      ownerId: userId,
    });

    return NextResponse.json(note);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
  }
}

// Corrected PUT handler
export async function PUT(req: Request, context: GetNoteContext) {
  try {
    await connect();
    const userId = getDataFromToken(req as any);

    // 💡 THE FIX: Await context.params
    const params = await context.params;
    const { id } = params;

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
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 });
  }
}

// Corrected GET handler
export async function GET(req: Request, context: GetNoteContext) { // Add context parameter
  try {
    await connect();
    const userId = getDataFromToken(req as any);

    // 💡 THE FIX: Await context.params
    const params = await context.params;
    const { id } = params;

    if (!id) {
      // This case should ideally not be hit if the route is correctly matched
      return NextResponse.json({ error: 'Note ID is required in the path' }, { status: 400 });
    }

    const note = await Note.findOne({ _id: id, ownerId: userId });

    if (!note) {
      // This correctly returns a 404 if the note is not found
      return NextResponse.json({ error: 'Note not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch note' }, { status: 500 });
  }
}