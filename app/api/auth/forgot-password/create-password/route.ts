import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email, password } = body;

        // 1. Check email
        if (!email) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email is required",
                },
                { status: 400 }
            );
        }

        // 2. Check password
        if (!password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Password is required",
                },
                { status: 400 }
            );
        }

        // 3. Password length check
        if (password.length < 6) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Password must be at least 6 characters",
                },
                { status: 400 }
            );
        }

        // 4. Find user
        const [users]: any = await pool.query(
            "SELECT id FROM user WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        const userId = users[0].id;

        // 5. Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 6. Update password
        await pool.query(
            "UPDATE user SET password = ? WHERE id = ?",
            [hashedPassword, userId]
        );

        // 7. Delete OTP/reset record
        await pool.query(
            "DELETE FROM password_reset WHERE user_id = ?",
            [userId]
        );

        return NextResponse.json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {
        console.error("Create password error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}