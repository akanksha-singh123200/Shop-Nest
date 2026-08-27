import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = body;

        // 1. Email check
        if (!email) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email is required",
                },
                { status: 400 }
            );
        }

        // 2. Find user
        const [users]: any = await pool.query(
            "SELECT id, email FROM user WHERE email = ?",
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

        const user = users[0];

        // 3. Generate 6 digit OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // 4. Hash OTP before storing
        const otpHash = await bcrypt.hash(otp, 10);

        // 5. OTP expires after 5 minutes
        const expiresAt = new Date(
            Date.now() + 5 * 60 * 1000
        );

        // 6. Delete old OTP
        await pool.query(
            "DELETE FROM password_reset WHERE user_id = ?",
            [user.id]
        );

        // 7. Insert new OTP
        await pool.query(
            `INSERT INTO password_reset
            (user_id, otp_hash, expires_at)
            VALUES (?, ?, ?)`,
            [user.id, otpHash, expiresAt]
        );

        // 8. For development/testing only
        console.log("OTP :- ", otp);

        return NextResponse.json({
            success: true,
            message: "OTP generated successfully",
        });

    } catch (error) {
        console.error("Forgot password error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}