
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email, password } = body;

        // ==============================
        // Validate fields
        // ==============================

        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please enter email and password.",
                },
                { status: 400 }
            );
        }

        // ==============================
        // Find Admin
        // ==============================

        const [admins]: any = await pool.query(
            "SELECT * FROM admin_login WHERE admin_email = ?",
            [email]
        );

        if (admins.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Admin account not found.",
                },
                { status: 404 }
            );
        }

        const admin = admins[0];

        // ==============================
        // Check Password
        // ==============================

        const isMatch = await bcrypt.compare(
            password,
            admin.admin_password
        );

        if (!isMatch) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid email or password.",
                },
                { status: 401 }
            );
        }

        // ==============================
        // Generate JWT
        // ==============================

        const token = jwt.sign(
            {
                id: admin.admin_id,
                email: admin.admin_email,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1d",
            }
        );

        // ==============================
        // Response
        // ==============================

        const response = NextResponse.json({
            success: true,
            message: "Login successful.",
            admin: {
                id: admin.admin_id,
                email: admin.admin_email,
                phone: admin.admin_phone,
            },
        });

        response.cookies.set("adminToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

        response.cookies.set("adminId", admin.admin_id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("ADMIN LOGIN ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong. Please try again.",
            },
            { status: 500 }
        );
    }
}
