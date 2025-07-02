// src/app/api/feedback/route.ts

import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

// Connect to MongoDB (adjust this according to your setup)
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.DATABASE_URL!);
  }
}

// Define feedback schema and model
const feedbackSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    rating: { type: String, enum: ["ONE", "TWO", "THREE", "FOUR", "FIVE"], required: true },
    email: { type: String },
  },
  { timestamps: true }
);

const Feedback =
  mongoose.models.Feedback ||
  mongoose.model("Feedback", feedbackSchema, "feedbacks");

// The required named export for POST method
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { message, rating, email } = body;

    if (!message || !rating) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const feedback = await Feedback.create({ message, rating, email });
    return NextResponse.json({ success: true, data: feedback }, { status: 201 });
  } catch (error) {
    console.error("Feedback submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
