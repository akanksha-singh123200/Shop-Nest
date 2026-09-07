import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const product_id = searchParams.get("product_id");

        const [reviews]: any = await pool.query(
            `
    SELECT
        reviews.id,
        reviews.rating,
        reviews.comment,
        reviews.created_at,
        user.name
    FROM reviews
    JOIN user ON reviews.user_id = user.id
    WHERE reviews.product_id = ?
    ORDER BY reviews.created_at DESC
    `,
            [product_id]
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