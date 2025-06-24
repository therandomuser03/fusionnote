import { connect } from "@/lib/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/utils/mailer";
import jwt from 'jsonwebtoken';
import { getDataFromToken } from "@/utils/auth";

connect()

export async function POST(request: NextRequest) {
    const userId = await getDataFromToken(request)
    const user = User.findOne({_id: userId}).select("-password")

    return NextResponse.json({
        message: "User Found",
        data: user
    })

}