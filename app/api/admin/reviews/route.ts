import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

// GET - Reviews fetch karna
export async function GET() {
    try {
        const [reviews]: any = await pool.query(`
            SELECT 
                reviews.id,
                reviews.rating,
                reviews.comment,
                reviews.created_at,

                user.id AS user_id,
                user.name AS user_name,
                user.email AS user_email,

                product_schema.id AS product_id,
                product_schema.title,
                product_schema.description,
                product_schema.price,
                product_schema.stock

            FROM reviews

            INNER JOIN user
                ON reviews.user_id = user.id

            INNER JOIN product_schema
                ON reviews.product_id = product_schema.id
        `);

        return NextResponse.json({
            success: true,
            message: "Reviews fetched successfully",
            reviews: reviews,
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Reviews not fetched",
            },
            { status: 500 }
        );
    }
}


// POST - Review database mein insert karna
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            product_id,
            rating,
            comment,
        } = body;

        // Logged-in user ki cookie
        const cookieStore = await cookies();
        const userId = cookieStore.get("userId")?.value;

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please login first",
                },
                { status: 401 }
            );
        }

        if (!product_id || !rating || !comment) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                { status: 400 }
            );
        }

        const [result]: any = await pool.query(
            `
            INSERT INTO reviews
            (user_id, product_id, rating, comment)
            VALUES (?, ?, ?, ?)
            `,
            [
                userId,
                product_id,
                rating,
                comment,
            ]
        );

        return NextResponse.json(
            {
                success: true,
                message: "Review added successfully",
                reviewId: result.insertId,
            },
            { status: 201 }
        );

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Review not added",
            },
            { status: 500 }
        );
    }
}