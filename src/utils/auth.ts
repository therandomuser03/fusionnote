// utils/auth.ts

import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export const getDataFromToken = (request: NextRequest): string => {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

    if (!decoded.id) {
      throw new Error("Token payload is invalid.");
    }

    return decoded.id;
  } catch (err: unknown) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token.");
    }

    if (err instanceof jwt.TokenExpiredError) {
      throw new Error("Token has expired.");
    }

    throw new Error("Authentication failed.");
  }
};
