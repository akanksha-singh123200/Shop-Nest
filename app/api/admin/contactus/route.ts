import { NextResponse } from "next/server";
import pool from "@/lib/db";

// ==============================
// POST - Submit Feedback
// ==============================
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { name, email, phone, message } = body;

        // Check required fields
        if (!name || !email || !phone || !message) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please fill all fields",
                },
                { status: 400 }
            );
        }

        const [result]: any = await pool.query(
            `
            INSERT INTO contact_us
            (
                contact_name,
                contact_email,
                contact_phone,
                contact_message
            )
            VALUES (?, ?, ?, ?)
            `,
            [name, email, phone, message]
        );

        return NextResponse.json(
            {
                success: true,
                message: "Feedback submitted successfully",
                contact_id: result.insertId,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Contact Us Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Feedback not submitted. Please try again later.",
            },
            { status: 500 }
        );
    }
}


// ==============================
// GET - Fetch Feedback
// ==============================
export async function GET(req: Request) {
    try {

        const [feedback]: any = await pool.query(`
            SELECT
                contact_us_id,
                contact_name,
                contact_email,
                contact_phone,
                contact_message
            FROM contact_us
            ORDER BY contact_us_id ASC
        `);

        return NextResponse.json(
            {
                success: true,
                message: "Feedback fetched successfully",
                feedback: feedback,
            },
            { status: 200 }
        );

    } catch (error) {

        console.error("Feedback fetch error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Feedback not fetched",
                error: error instanceof Error
                    ? error.message
                    : "Unknown error",
            },
            { status: 500 }
        );
    }
}


// ========================================
// DELETE - Delete 
// ========================================

export async function DELETE(req: Request) {
    try {

        const body = await req.json();

        const { contact_us_id } = body;

        if (!contact_us_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Feedback ID is required",
                },
                { status: 400 }
            );
        }

        const [result]: any = await pool.query(
            `
            DELETE FROM contact_us
            WHERE contact_us_id = ?
            `,
            [contact_us_id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Feedback not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Feedback deleted successfully",
            },
            { status: 200 }
        );

    } catch (error) {

        console.error("Delete feedback error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Feedback not deleted",
            },
            { status: 500 }
        );
    }
}