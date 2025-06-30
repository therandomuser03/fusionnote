// api/users/profile/route.ts

import { connect } from "@/lib/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/auth";

connect();

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    // This should fetch all fields EXCEPT password, including 'image' if it exists on the schema.
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userData = user.toObject(); // Convert Mongoose document to a plain JavaScript object

    return NextResponse.json({
      message: "User Found",
      data: {
        _id: userData._id,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        image: userData.image || null, // Explicitly include image, with a fallback to null
      },
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}