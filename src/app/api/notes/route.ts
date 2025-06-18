import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log(req.method); // or whatever you plan to do with it
  return new Response("OK");
}
