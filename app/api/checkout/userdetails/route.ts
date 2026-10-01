
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";

// =====================================================
// GET - FETCH CURRENT USER + SHIPPING ADDRESS
// =====================================================

export async function GET(req: Request) {
    try {
        let currentUserId: number | null = null;
        let loginMethod: string | null = null;

        // =====================================================
        // 1. GOOGLE LOGIN - SAME CODE / DO NOT CHANGE
        // =====================================================

        const session = await getServerSession(authOptions);

        if (session?.user?.email) {
            const email = session.user.email;

            const [users]: any = await pool.query(
                `SELECT id, name, email
                 FROM \`user\`
                 WHERE email = ?`,
                [email]
            );

            if (users.length > 0) {
                currentUserId = Number(users[0].id);
                loginMethod = "Google";
            }
        }

        // =====================================================
        // 2. NORMAL LOGIN - JWT COOKIE
        // =====================================================

        if (!currentUserId) {
            const cookieHeader = req.headers.get("cookie");

            const token = cookieHeader
                ?.split(";")
                .map((cookie) => cookie.trim())
                .find((cookie) => cookie.startsWith("token="))
                ?.substring("token=".length);

            if (token) {
                try {
                    const decoded: any = jwt.verify(
                        token,
                        process.env.JWT_SECRET!
                    );

                    const jwtUserId =
                        decoded.id ??
                        decoded.userId ??
                        decoded.user_id;

                    if (jwtUserId) {
                        currentUserId = Number(jwtUserId);
                        loginMethod = "Normal Login";
                    }
                } catch (jwtError) {
                    console.error(
                        "Normal Login JWT verification failed:",
                        jwtError
                    );
                }
            }
        }

        // =====================================================
        // 3. USER LOGIN CHECK
        // =====================================================

        if (!currentUserId) {
            return NextResponse.json(
                {
                    success: false,
                    loggedIn: false,
                    message: "Please login first",
                },
                { status: 401 }
            );
        }

        // =====================================================
        // 4. FETCH USER FROM DATABASE
        // =====================================================

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
                    loggedIn: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        const user = users[0];

        // =====================================================
        // 5. FETCH SHIPPING ADDRESS
        // =====================================================

        const [userDetails]: any = await pool.query(
            `SELECT *
             FROM user_details
             WHERE user_id = ?
             LIMIT 1`,
            [currentUserId]
        );

        console.log("=================================");
        console.log("Login Method:", loginMethod);
        console.log("Current User ID:", currentUserId);
        console.log("User:", user);
        console.log("User Details:", userDetails);
        console.log("=================================");

        // =====================================================
        // 6. NO ADDRESS
        // =====================================================

        if (userDetails.length === 0) {
            return NextResponse.json({
                success: true,
                loggedIn: true,
                loginMethod: loginMethod,
                hasAddress: false,
                user: user,
                userDetails: null,
            });
        }

        // =====================================================
        // 7. ADDRESS FOUND
        // =====================================================

        return NextResponse.json({
            success: true,
            loggedIn: true,
            loginMethod: loginMethod,
            hasAddress: true,
            user: user,
            userDetails: userDetails[0],
        });

    } catch (error) {
        console.error("User Details GET Error:", error);

        return NextResponse.json(
            {
                success: false,
                loggedIn: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}


// =====================================================
// PUT - UPDATE SHIPPING ADDRESS
// =====================================================

export async function PUT(req: Request) {
    try {
        let currentUserId: number | null = null;

        // =====================================================
        // 1. GOOGLE LOGIN - SAME CODE / DO NOT CHANGE
        // =====================================================

        const session = await getServerSession(authOptions);

        if (session?.user?.email) {
            const email = session.user.email;

            const [users]: any = await pool.query(
                `SELECT id, name, email
                 FROM \`user\`
                 WHERE email = ?`,
                [email]
            );

            if (users.length > 0) {
                currentUserId = Number(users[0].id);
            }
        }

        // =====================================================
        // 2. NORMAL LOGIN - JWT COOKIE
        // =====================================================

        if (!currentUserId) {
            const cookieHeader = req.headers.get("cookie");

            const token = cookieHeader
                ?.split(";")
                .map((cookie) => cookie.trim())
                .find((cookie) => cookie.startsWith("token="))
                ?.substring("token=".length);

            if (token) {
                try {
                    const decoded: any = jwt.verify(
                        token,
                        process.env.JWT_SECRET!
                    );

                    const jwtUserId =
                        decoded.id ??
                        decoded.userId ??
                        decoded.user_id;

                    if (jwtUserId) {
                        currentUserId = Number(jwtUserId);
                    }
                } catch (jwtError) {
                    console.error(
                        "Normal Login JWT verification failed:",
                        jwtError
                    );
                }
            }
        }

        // =====================================================
        // 3. LOGIN CHECK
        // =====================================================

        if (!currentUserId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please login first",
                },
                { status: 401 }
            );
        }

        // =====================================================
        // 4. FETCH USER
        // =====================================================

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

        // =====================================================
        // 5. GET UPDATED DATA
        // =====================================================

        const body = await req.json();

        const {
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
            is_default,
        } = body;

        // =====================================================
        // 6. CHECK EXISTING ADDRESS
        // =====================================================

        const [userDetails]: any = await pool.query(
            `SELECT user_details_id
             FROM user_details
             WHERE user_id = ?
             LIMIT 1`,
            [currentUserId]
        );

        if (userDetails.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Shipping address not found. Please add shipping address first.",
                },
                { status: 404 }
            );
        }

        // =====================================================
        // 7. UPDATE ADDRESS
        // =====================================================

        await pool.query(
            `UPDATE user_details
             SET
                full_name = ?,
                phone = ?,
                alternate_phone = ?,
                address_line1 = ?,
                address_line2 = ?,
                landmark = ?,
                city = ?,
                state = ?,
                pincode = ?,
                country = ?,
                address_type = ?,
                is_default = ?,
                updated_at = CURRENT_TIMESTAMP
             WHERE user_id = ?`,
            [
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
                is_default,
                currentUserId,
            ]
        );

        // =====================================================
        // 8. FETCH UPDATED ADDRESS
        // =====================================================

        const [updatedDetails]: any = await pool.query(
            `SELECT *
             FROM user_details
             WHERE user_id = ?
             LIMIT 1`,
            [currentUserId]
        );

        // =====================================================
        // 9. SUCCESS
        // =====================================================

        return NextResponse.json({
            success: true,
            message: "Shipping address updated successfully",
            user: user,
            userDetails: updatedDetails[0],
        });

    } catch (error) {
        console.error(
            "Update Shipping Address Error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Something went wrong while updating shipping address",
            },
            { status: 500 }
        );
    }
}
