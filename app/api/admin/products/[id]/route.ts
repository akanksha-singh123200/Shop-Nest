import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const [rows]: any = await pool.query(
    "SELECT * FROM product_schema WHERE id = ?",
    [id]
  );

  return NextResponse.json({
    success: true,
    product: rows[0],
  });
}