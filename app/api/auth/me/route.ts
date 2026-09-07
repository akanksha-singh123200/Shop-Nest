import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "@/lib/db";

export async function GET() {
    try {
        const cookieStore = await cookies();

        const userId = cookieStore.get("userId")?.value;

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User is not logged in",
                },
                { status: 401 }
            );
        }

        const [rows]: any = await pool.query(
            "SELECT id, name, email FROM user WHERE id = ?",
            [userId]
        );

        if (rows.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }
        

        return NextResponse.json({
            success: true,
            Name: rows[0].name,
            email: rows[0].email,
            userId: rows[0].id,
        });
    } catch (error) {
        console.error("ME API ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}