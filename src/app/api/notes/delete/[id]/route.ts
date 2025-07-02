// app/api/notes/delete/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import Note from "@/models/Note";
import DeletedNote from "@/models/DeletedNote";
import { connect } from "@/lib/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();

  try {
    const note = await Note.findById(params.id);

    if (!note) {
      return NextResponse.json({ success: false, error: "Note not found" }, { status: 404 });
    }

    // Move to DeletedNote
    await DeletedNote.create({
      originalNoteId: note._id,
      title: note.title,
      content: note.content,
      ownerId: note.ownerId,
      deletedAt: new Date(),
    });

    // Remove original
    await Note.findByIdAndDelete(note._id);

    return NextResponse.json({ success: true, message: "Note moved to trash." });
  } catch (err) {
    console.error("[DELETE NOTE ERROR]", err);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
