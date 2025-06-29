import { connect } from "@/lib/db";
import Note from "@/models/Note";
import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connect();

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing note ID" }, { status: 400 });
  }

  try {
    const note = await Note.findById(id);
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(`
      <html>
        <head>
          <meta charset="utf-8">
          <title>${note.title}</title>
        </head>
        <body>${note.content}</body>
      </html>
    `);

    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${note.title}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
