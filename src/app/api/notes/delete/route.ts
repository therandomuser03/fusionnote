// src/app/api/notes/delete/route.ts

import { NextResponse } from "next/server";
import DeletedNote from "@/models/DeletedNote";
import { connect } from "@/lib/db";

export async function GET() {
  await connect();

  try {
    const notes = await DeletedNote.find({})
      .sort({ deletedAt: -1 })
      .limit(3)
      .lean();

    return NextResponse.json({ notes });
  } catch (err) {
    console.error("[GET deleted notes] error:", err);
    return NextResponse.json({ error: "Failed to fetch deleted notes" }, { status: 500 });
  }
}
