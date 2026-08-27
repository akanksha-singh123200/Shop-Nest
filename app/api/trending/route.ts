import { NextResponse } from "next/server";
import pool from "@/lib/db";

// export async function GET() {
//   try {
//     const [rows] = await pool.query("SELECT 1");

//     return NextResponse.json({
//       success: true,
//       message: "Database connected successfully",
//       rows,
//     });

//   } catch (error) {
//     console.error("Database connection error:", error);

//     return NextResponse.json({
//       success: false,
//       message: "Database connection failed",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// }
export async function GET(req: Request) {
  try {
    const [products]: any = await pool.query(`
      SELECT
        p.id,
        p.title,
        p.description,
        p.price,
        p.image,
        p.stock,

        t.id AS trending_id,
        t.product_id,
        t.is_trending,
        t.display_order

      FROM product_schema p

      INNER JOIN trendings t
        ON p.id = t.product_id

      WHERE t.is_trending = 1

      ORDER BY t.display_order ASC, p.id DESC
    `);

    if (products.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No trending products found",
        products: [],
      });
    }

    return NextResponse.json({
      success: true,
      message: "Trending products fetched successfully",
      products,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      error: error instanceof Error
        ? error.message
        : "Unknown Error",
    });
  }
}