// app/api/notes/cleanup/route.ts

import { NextResponse } from "next/server";
import DeletedNote from "@/models/DeletedNote";
import { connect } from "@/lib/db";

export async function GET() {
  await connect();

  const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  try {
    const result = await DeletedNote.deleteMany({
      deletedAt: { $lt: THIRTY_DAYS_AGO },
    });

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error("[CLEANUP ERROR]", err);
    return NextResponse.json({ success: false, error: "Cleanup failed" }, { status: 500 });
  }
}
