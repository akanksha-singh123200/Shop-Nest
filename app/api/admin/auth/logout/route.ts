
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout successful.",
    });

    // ==========================================
    // Delete Admin Token
    // ==========================================

    response.cookies.set("adminToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    // ==========================================
    // Delete Admin ID
    // ==========================================

    response.cookies.set("adminId", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("ADMIN LOGOUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Logout failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
