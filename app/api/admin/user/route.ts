import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request) {
  try {
    const [user]: any = await pool.query(
      "SELECT id, name, email FROM user"
    );

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error fetching users",
      },
      {
        status: 500,
      }
    );
  }
}