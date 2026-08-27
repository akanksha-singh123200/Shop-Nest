import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email, otp } = body;

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

        // 2. Check OTP
        if (!otp) {
            return NextResponse.json(
                {
                    success: false,
                    message: "OTP is required",
                },
                { status: 400 }
            );
        }

        // 3. Find user
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

        // 4. Get OTP record
        const [resetData]: any = await pool.query(
            `SELECT user_id, otp_hash, expires_at, attempts
             FROM password_reset
             WHERE user_id = ?`,
            [userId]
        );

        if (resetData.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "OTP not found",
                },
                { status: 404 }
            );
        }

        const reset = resetData[0];

        // 5. Compare user_id
        if (userId !== reset.user_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User verification failed",
                },
                { status: 403 }
            );
        }

        // 6. Check OTP expiry
        if (new Date() > new Date(reset.expires_at)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "OTP expired",
                },
                { status: 400 }
            );
        }

        // 7. Check attempts
        if (reset.attempts >= 5) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Too many wrong attempts. Please request a new OTP.",
                },
                { status: 429 }
            );
        }

        // 8. Compare entered OTP with hashed OTP
        const isMatch = await bcrypt.compare(
            otp,
            reset.otp_hash
        );

        // 9. Wrong OTP
        if (!isMatch) {

            await pool.query(
                `UPDATE password_reset
                 SET attempts = attempts + 1
                 WHERE user_id = ?`,
                [userId]
            );

            return NextResponse.json(
                {
                    success: false,
                    message: `Wrong OTP. Attempt ${reset.attempts + 1} of 5`,
                },
                { status: 400 }
            );
        }

        // 10. OTP verified
        return NextResponse.json({
            success: true,
            message: "OTP verified successfully",
        });

    } catch (error) {
        console.error("Verify OTP error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}