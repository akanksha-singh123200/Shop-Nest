import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged Out Successfully",
  });

  // response.cookies.delete("userId");
  response.cookies.delete("token");

  return response;
}