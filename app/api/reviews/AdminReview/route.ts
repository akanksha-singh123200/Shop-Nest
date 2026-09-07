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
                reviews.rating,
                reviews.comment,
                reviews.created_at
            FROM reviews
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