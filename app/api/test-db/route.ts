import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT 1");

    return NextResponse.json({
      success: true,
      message: "Database connected successfully",
      rows,
    });

  } catch (error) {
    console.error("Database connection error:", error);

    return NextResponse.json({
      success: false,
      message: "Database connection failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}