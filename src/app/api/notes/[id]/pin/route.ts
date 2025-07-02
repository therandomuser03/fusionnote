// src/app/api/notes/[id]/pin/route.ts

import { NextResponse } from "next/server";
import { connect } from "@/lib/db";
import Note from "@/models/Note";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ FIXED HERE
  const { pinned } = await req.json();

  await connect();

  if (typeof pinned !== "boolean") {
    return NextResponse.json({ error: "Invalid pinned value" }, { status: 400 });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { isPinned: pinned },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Pin status updated",
      isPinned: updatedNote.isPinned,
    });
  } catch (error) {
    console.error("Error updating pin status:", error);
    return NextResponse.json(
      { error: "Failed to update pinned status" },
      { status: 500 }
    );
  }
}
