
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        const [reviews]: any = await pool.query(
            `
            SELECT 
                reviews.id,
                reviews.user_id,
                reviews.product_id,
                user.name AS user_name,
                
                product_schema.title AS product_name,
                reviews.rating,
                reviews.comment,
                reviews.created_at
            FROM reviews

            LEFT JOIN user
                ON reviews.user_id = user.id

            LEFT JOIN product_schema
                ON reviews.product_id = product_schema.id

            ORDER BY reviews.created_at DESC
            `
        );

        return NextResponse.json({
            success: true,
            reviews: reviews,
        });

    } catch (error) {
        console.error("GET REVIEWS ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Reviews fetch nahi ho paaye",
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const { id } = body;

    await pool.query(
      `DELETE FROM reviews WHERE id = ?`,
      [id]
    );

    return NextResponse.json({
      success: true,
      message: "Reviews Product Deleted Successfully",
    });

  } catch (error) {
    console.error("Delete user error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Delete Failed",
      },
      {
        status: 500,
      }
    );
  }
}

