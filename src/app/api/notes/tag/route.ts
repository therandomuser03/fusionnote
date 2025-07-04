// app/api/notes/tag/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/auth";
import Note from "@/models/Note";
import { connect } from "@/lib/db";

await connect();

export async function POST(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const body = await request.json();
    const { tags } = body;

    if (!Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json(
        { error: "Tags must be a non-empty array." },
        { status: 400 }
      );
    }

    // Find notes that include any of the tags
    const notes = await Note.find({
      ownerId: userId,
      tags: { $in: tags },
    }).sort({ createdAt: -1 });

    return NextResponse.json(notes, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching notes by tag:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
