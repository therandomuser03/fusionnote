// app/api/notes/by-tag/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/auth";
import { connect } from "@/lib/db";
import Note from "@/models/Note";
import Tag from "@/models/Tag";
import NoteTag from "@/models/NoteTag";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const userId = getDataFromToken(req);
    const { tagNames } = await req.json();

    if (!Array.isArray(tagNames) || tagNames.length === 0) {
      return NextResponse.json(
        { error: "tagNames must be a non-empty array" },
        { status: 400 }
      );
    }

    const tags = await Tag.find({ name: { $in: tagNames } }).select("_id");
    const tagIds = tags.map((tag) => tag._id);

    if (tagIds.length === 0) return NextResponse.json([]);

    const noteTagMappings = await NoteTag.find({
      tagId: { $in: tagIds },
    }).select("noteId");

    const noteIds = [
      ...new Set(noteTagMappings.map((nt) => nt.noteId.toString())),
    ];

    if (noteIds.length === 0) return NextResponse.json([]);

    const notes = await Note.find({
      _id: { $in: noteIds },
      ownerId: userId,
    }).sort({ createdAt: -1 });

    return NextResponse.json(notes);
  } catch (err: unknown) {
    console.error("Error in /api/notes/by-tag:", err);

    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
