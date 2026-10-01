
import { NextResponse } from "next/server";

import pool from "@/lib/db";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import jwt from "jsonwebtoken";

export async function GET(request: Request) {
    try {
        // =====================================================
        // 1. CHECK CURRENT LOGGED-IN USER
        // =====================================================

        let currentUserId: number | null = null;
        let loginMethod: string | null = null;

        // =====================================================
        // 1A. CHECK GOOGLE / NEXTAUTH SESSION
        // =====================================================

        // GOOGLE LOGIN CODE - DO NOT CHANGE
        const session: any = await getServerSession(authOptions);

        if (session?.user?.email) {
            console.log(
                "NextAuth Session Found:",
                session.user
            );

            const [users]: any = await pool.query(
                `SELECT id, name, email
                 FROM \`user\`
                 WHERE email = ?`,
                [session.user.email]
            );

            if (users.length > 0) {
                currentUserId = users[0].id;
                loginMethod = "Google";
            }
        }

        // =====================================================
        // 1B. CHECK NORMAL LOGIN - JWT COOKIE
        // =====================================================

        // Google se user nahi mila tabhi normal JWT check hoga
        if (!currentUserId) {
            try {
                const cookieHeader =
                    request.headers.get("cookie");

                console.log(
                    "Cookie Header:",
                    cookieHeader
                );

                // -------------------------------------------------
                // token cookie properly extract karo
                // -------------------------------------------------

                const token = cookieHeader
                    ?.split(";")
                    .map((cookie) => cookie.trim())
                    .find((cookie) =>
                        cookie.startsWith("token=")
                    )
                    ?.substring("token=".length);

                console.log(
                    "Normal Login Token Found:",
                    !!token
                );

                // -------------------------------------------------
                // JWT verify
                // -------------------------------------------------

                if (token) {
                    try {
                        const decoded: any = jwt.verify(
                            token,
                            process.env.JWT_SECRET!
                        );

                        console.log(
                            "Decoded JWT:",
                            decoded
                        );

                        // JWT mein id kis naam se save hai
                        const jwtUserId =
                            decoded.id ??
                            decoded.userId ??
                            decoded.user_id;

                        if (jwtUserId) {
                            currentUserId =
                                Number(jwtUserId);

                            loginMethod =
                                "Normal Login";

                            console.log(
                                "Normal Login JWT User ID:",
                                currentUserId
                            );
                        }
                    } catch (jwtError) {
                        console.error(
                            "JWT verification failed:",
                            jwtError
                        );
                    }
                }
            } catch (cookieError) {
                console.error(
                    "Normal Login Cookie Error:",
                    cookieError
                );
            }
        }

        // =====================================================
        // 2. CHECK USER LOGIN
        // =====================================================

        if (!currentUserId) {
            return NextResponse.json(
                {
                    success: false,
                    loggedIn: false,
                    message: "User is not logged in",
                },
                { status: 401 }
            );
        }

        // =====================================================
        // 3. FETCH USER FROM DATABASE
        // =====================================================

        const [user]: any = await pool.query(
            `SELECT id, name, email
             FROM \`user\`
             WHERE id = ?`,
            [currentUserId]
        );

        if (user.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    loggedIn: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        // =====================================================
        // 4. FETCH SHIPPING ADDRESS
        // =====================================================

        const [address]: any = await pool.query(
            `SELECT *
             FROM user_details
             WHERE user_id = ?`,
            [currentUserId]
        );

        console.log(
            "Current User ID:",
            currentUserId
        );

        console.log(
            "Login Method:",
            loginMethod
        );

        console.log(
            "User:",
            user[0]
        );

        console.log(
            "Shipping Address:",
            address
        );

        // =====================================================
        // 5. FINAL RESPONSE
        // =====================================================

        return NextResponse.json({
            success: true,
            loggedIn: true,
            loginMethod: loginMethod,

            message:
                "Checkout data fetched successfully",

            user: user[0],

            hasAddress:
                address.length > 0,

            userDetails:
                address.length > 0
                    ? address[0]
                    : null,

            // Existing field bhi rakha hai
            // taaki tumhare current frontend mein
            // koi problem na aaye.
            address:
                address.length > 0
                    ? address[0]
                    : null,
        });
    } catch (error) {
        console.error(
            "Error fetching checkout data:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                loggedIn: false,
                message:
                    "Checkout data not fetched",
            },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        // 1. Request body
        const body = await req.json();

        const {
            phone,
            alternate_phone,
            address1,
            address2,
            landmark,
            city,
            state_name,
            pincode,
            country_name,
            address_type,
        } = body;

        // 2. Current logged-in user
        let currentUserId: number | null = null;

        // --------------------------------
        // Google / NextAuth Login
        // --------------------------------
        const session: any = await getServerSession(authOptions);

        if (session?.user?.email) {
            const [users]: any = await pool.query(
                `SELECT id, name, email
                 FROM \`user\`
                 WHERE email = ?`,
                [session.user.email]
            );

            if (users.length > 0) {
                currentUserId = users[0].id;
            }
        }

        // --------------------------------
        // Normal Login JWT
        // --------------------------------
        if (!currentUserId) {
            const cookieHeader = req.headers.get("cookie");

            const token = cookieHeader
                ?.split(";")
                .find((cookie) =>
                    cookie.trim().startsWith("token=")
                )
                ?.split("=")[1];

            if (token) {
                try {
                    const decoded: any = jwt.verify(
                        token,
                        process.env.JWT_SECRET!
                    );

                    currentUserId =
                        decoded.id ||
                        decoded.userId ||
                        decoded.user_id;

                } catch (error) {
                    console.error("JWT verification failed:", error);
                }
            }
        }

        // --------------------------------
        // 3. Login check
        // --------------------------------
        if (!currentUserId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User is not logged in",
                },
                { status: 401 }
            );
        }

        // --------------------------------
        // 4. Get user name and email
        // --------------------------------
        const [users]: any = await pool.query(
            `SELECT id, name, email
             FROM \`user\`
             WHERE id = ?`,
            [currentUserId]
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

        // --------------------------------
        // 5. Insert shipping address
        // --------------------------------
        const [result]: any = await pool.query(
            `INSERT INTO user_details
            (
                user_id,
                full_name,
                phone,
                alternate_phone,
                address_line1,
                address_line2,
                landmark,
                city,
                state,
                pincode,
                country,
                address_type,
                email
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                currentUserId,
                user.name,
                phone,
                alternate_phone || null,
                address1,
                address2 || null,
                landmark || null,
                city,
                state_name,
                pincode,
                country_name,
                address_type,
                user.email,
            ]
        );

        // --------------------------------
        // 6. Success response
        // --------------------------------
        return NextResponse.json({
            success: true,
            message: "Shipping address saved successfully",
            addressId: result.insertId,
        });

    } catch (error) {
        console.error("Error inserting address:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to save shipping address",
            },
            { status: 500 }
        );
    }
}
export async function DELETE(req: Request) {
    try {
        const body = await req.json();

        const { id } = body;

        await pool.query(
            `DELETE FROM user_details WHERE user_details_id = ?`,
            [id]
        );

        return NextResponse.json({
            success: true,
            message: "Product Deleted Successfully",
        });

    } catch (error) {
        console.error("Delete product error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Delete Failed",
            },
            {
                status: 500,
            }
        );
    }
}

