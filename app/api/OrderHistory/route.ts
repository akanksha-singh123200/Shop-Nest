import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
    try {
        let currentUserId: number | null = null;
        let loginMethod: string | null = null;

        // =====================================================
        // 1. GOOGLE LOGIN
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
        // 4. FETCH CURRENT USER
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
        // 5. FETCH USER ORDERS
        // =====================================================

        const [orders]: any = await pool.query(
            `SELECT
                o.order_id,
                o.user_id,
                o.total_amount,
                o.status AS order_status_id,
                os.status_name AS order_status,
                o.payment_status AS payment_status_id,
                ps.payment_status_name AS payment_status,
                o.shipping_address,
                o.created_at,

                oi.order_items_id,
                oi.product_id,
                oi.order_quantity,
                oi.order_price,

                p.title AS product_title,
                p.image AS product_image

             FROM orders o

             LEFT JOIN order_items oi
                ON o.order_id = oi.order_id

             LEFT JOIN product_schema p
                ON oi.product_id = p.id

             LEFT JOIN order_status os
                ON o.status = os.order_status_id

             LEFT JOIN payment_status ps
                ON o.payment_status = ps.payment_status_id

             WHERE o.user_id = ?

             ORDER BY o.created_at DESC`,
            [currentUserId]
        );

        // =====================================================
        // 6. NO ORDERS
        // =====================================================

        if (orders.length === 0) {
            return NextResponse.json({
                success: true,
                loggedIn: true,
                loginMethod: loginMethod,
                user: user,
                hasOrders: false,
                orders: [],
            });
        }

        // =====================================================
        // 7. ORDERS FOUND
        // =====================================================

        return NextResponse.json({
            success: true,
            loggedIn: true,
            loginMethod: loginMethod,
            user: user,
            hasOrders: true,
            orders: orders,
        });
    } catch (error) {
        console.error("Order History API Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch order history",
            },
            { status: 500 }
        );
    }
}