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
          <style>
            @page {
              margin: 1in;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
              font-size: 14px;
              line-height: 1.6;
              color: #111;
              margin: 0;
              padding: 0;
            }
            h1, h2, h3 {
              margin-top: 1.5em;
              font-weight: bold;
            }
            p {
              margin: 0.75em 0;
            }
            blockquote {
              border-left: 4px solid #ccc;
              padding-left: 1em;
              color: #555;
              margin: 1em 0;
            }
            pre {
              background: #f4f4f4;
              padding: 1em;
              border-radius: 6px;
              overflow-x: auto;
            }
            code {
              background: #f4f4f4;
              padding: 2px 4px;
              border-radius: 4px;
              font-family: monospace;
            }
            img {
              max-width: 100%;
              height: auto;
              margin: 1em 0;
            }
          </style>
        </head>
        <body>${note.content}</body>
      </html>
    `);

    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: {
        top: "1in",
        right: "1in",
        bottom: "1in",
        left: "1in",
      },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size:10px; padding-left: 1in; width: 100%; text-align: left; color: gray;">
          ${note.title}
        </div>
      `,
      footerTemplate: `
        <div style="font-size:10px; padding-right: 1in; width: 100%; text-align: right; color: gray;">
          Page <span class="pageNumber"></span> of <span class="totalPages"></span>
        </div>
      `,
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${note.title}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
