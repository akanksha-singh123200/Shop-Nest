import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const product_id = searchParams.get("product_id");

        if (!product_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product ID is required",
                },
                { status: 400 }
            );
        }

        const [result]: any = await pool.query(
            `
            SELECT
                ROUND(AVG(rating), 1) AS average_rating,
                COUNT(*) AS total_reviews
            FROM reviews
            WHERE product_id = ?
            `,
            [product_id]
        );

        return NextResponse.json({
            success: true,
            average_rating: result[0].average_rating || 0,
            total_reviews: result[0].total_reviews || 0,
        });

    } catch (error) {
        console.error("GET RATING ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Rating fetch nahi ho paayi",
            },
            { status: 500 }
        );
    }
}