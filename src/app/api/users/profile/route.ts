import { connect } from "@/lib/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/auth";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User Found",
      data: {
        _id: user._id,
        username: user.username, // ✅ username included
        email: user.email        // Optional: include other fields
      },
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
