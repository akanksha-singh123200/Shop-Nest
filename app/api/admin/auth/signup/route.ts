
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            name,
            email,
            password,
            phone,
            role,
            confirmPassword,
        } = body;

        // Step 1: Validation
        if (
            !name ||
            !email ||
            !password ||
            !confirmPassword ||
            !phone ||
            !role
        ) {
            return NextResponse.json({
                success: false,
                message: "All fields are required",
            });
        }

        // Step 2: Check password
        if (password !== confirmPassword) {
            return NextResponse.json({
                success: false,
                message: "Password and confirm password do not match",
            });
        }

        // Step 3: Check email exists or not
        const [user]: any = await pool.query(
            "SELECT * FROM admin_login WHERE admin_email = ?",
            [email]
        );

        // Step 4: If email already exists
        if (user.length > 0) {
            return NextResponse.json({
                success: false,
                message: "Email already registered",
            });
        }

        // Step 5: Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 6: Insert admin/user data
        const [admin_login]: any = await pool.query(
            `INSERT INTO admin_login  
            (admin_name, admin_email, admin_password, admin_phone, admin_role) 
            VALUES (?, ?, ?, ?, ?)`,
            [
                name,
                email,
                hashedPassword,
                phone,
                role,
            ]
        );

        // Step 7: Success response
        return NextResponse.json({
            success: true,
            message: "User Registered Successfully",
            userId: admin_login.insertId,
        });

    } catch (error) {
        console.error("Signup Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Error occurred while registering user",
            },
            {
                status: 500,
            }
        );
    }
}