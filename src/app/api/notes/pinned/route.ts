// src/app/api/notes/pinned/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import Note from "@/models/Note";
import { getDataFromToken } from "@/utils/auth";

export async function GET(req: NextRequest) {
  try {
    await connect();
    const userId = getDataFromToken(req);

    // 🔧 One-time fix: convert any "pinned" field to "isPinned"
    await Note.updateMany(
      { pinned: { $exists: true } },
      { $rename: { pinned: "isPinned" } }
    );

    const pinnedNotes = await Note.find({
      ownerId: userId,
      isPinned: true,
    })
      .sort({ updatedAt: -1 })
      .limit(3);

    return NextResponse.json(pinnedNotes);
  } catch (err) {
    console.error("❌ Failed to fetch pinned notes:", err);
    return NextResponse.json({ error: "Failed to fetch pinned notes" }, { status: 500 });
  }
}
