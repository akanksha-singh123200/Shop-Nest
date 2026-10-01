import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import pool from "@/lib/db";

import jwt from "jsonwebtoken";

export async function GET(request: Request) {

    try {

        const { searchParams } = new URL(request.url);

        // =====================================================
        // ONLY PRODUCT ID WILL COME FROM URL
        // =====================================================

        const productId = searchParams.get("product_id");

        if (!productId) {

            return NextResponse.json(
                {
                    success: false,
                    message: "product_id is required",
                },
                { status: 400 }
            );
        }

        // =====================================================
        // 1. CHECK CURRENT LOGGED-IN USER
        // =====================================================

        let currentUserId: number | null = null;

        let loginMethod: string | null = null;


        // =====================================================
        // 1A. CHECK GOOGLE / NEXTAUTH SESSION
        // =====================================================

        const session: any = await getServerSession(authOptions);

        // Google login ka existing flow
        // Isme koi change nahi kiya gaya hai.

        if (session?.user) {

            console.log(
                "NextAuth Session Found:",
                session.user
            );

            if (session.user.email) {

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
        }


        // =====================================================
        // 1B. CHECK NORMAL LOGIN - JWT COOKIE
        // =====================================================

        if (!currentUserId) {

            try {

                // Next.js se token cookie directly read karo
                const token = request.headers
                    .get("cookie")
                    ?.split(";")
                    .map((cookie) => cookie.trim())
                    .find((cookie) =>
                        cookie.startsWith("token=")
                    )
                    ?.substring("token=".length);

                console.log(
                    "Normal Login Token:",
                    token ? "Found" : "Not Found"
                );


                // Token nahi mila
                if (!token) {

                    console.log(
                        "Normal Login token cookie not found"
                    );

                } else {

                    // =================================================
                    // JWT VERIFY
                    // =================================================

                    const decoded: any = jwt.verify(
                        decodeURIComponent(token),
                        process.env.JWT_SECRET!
                    );

                    console.log(
                        "Decoded Normal Login JWT:",
                        decoded
                    );


                    // =================================================
                    // JWT SE USER ID
                    // =================================================

                    const decodedUserId =
                        decoded.id ??
                        decoded.userId ??
                        decoded.user_id;


                    if (decodedUserId) {

                        currentUserId = Number(
                            decodedUserId
                        );

                        loginMethod = "Normal Login";

                        console.log(
                            "Normal Login User ID:",
                            currentUserId
                        );

                    } else {

                        console.log(
                            "JWT verified but user ID not found"
                        );
                    }
                }

            } catch (error) {

                console.error(
                    "Normal Login JWT verification failed:",
                    error
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
        // 3. FETCH CURRENT USER FROM DATABASE
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
        // 4. FETCH PRODUCT
        // =====================================================

        const [product]: any = await pool.query(
            `SELECT
                id,
                title,
                description,
                price,
                image,
                stock,
                category
             FROM product_schema
             WHERE id = ?`,
            [productId]
        );


        if (product.length === 0) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found",
                },
                { status: 404 }
            );
        }


        // =====================================================
        // 5. CHECKOUT RESPONSE
        // =====================================================

        return NextResponse.json({

            success: true,

            loggedIn: true,

            loginMethod: loginMethod,

            message: "Checkout data fetched successfully",

            user: user[0],

            product: product[0],

        });


    } catch (error) {

        console.error(
            "Checkout API Error:",
            error
        );

        return NextResponse.json(
            {
                success: false,

                loggedIn: false,

                message: "Failed to fetch checkout data",

                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error",
            },
            { status: 500 }
        );
    }
}