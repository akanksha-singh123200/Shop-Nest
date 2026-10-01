import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";

export async function PUT(req: Request) {
    let connection: any = null;

    try {
        // =====================================================
        // 1. GET ORDER ID
        // =====================================================

        const body = await req.json();
        const { order_id } = body;

        if (!order_id || !Number.isInteger(Number(order_id))) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Valid order ID is required",
                },
                { status: 400 }
            );
        }

        const orderId = Number(order_id);

        // =====================================================
        // 2. GET CURRENT USER
        // =====================================================

        let currentUserId: number | null = null;

        // -------------------------
        // GOOGLE LOGIN
        // -------------------------

        const session = await getServerSession(authOptions);

        if (session?.user?.email) {
            const email = session.user.email;

            const [users]: any = await pool.query(
                `SELECT id
                 FROM \`user\`
                 WHERE email = ?`,
                [email]
            );

            if (users.length > 0) {
                currentUserId = Number(users[0].id);
            }
        }

        // -------------------------
        // NORMAL LOGIN - JWT
        // -------------------------

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
                        "JWT verification failed:",
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
                    loggedIn: false,
                    message: "Please login first",
                },
                { status: 401 }
            );
        }

        // =====================================================
        // 4. GET CANCELLED STATUS ID
        // =====================================================

        const [cancelledStatusRows]: any = await pool.query(
            `SELECT order_status_id, status_name
             FROM order_status
             WHERE LOWER(TRIM(status_name)) = 'cancelled'
             LIMIT 1`
        );

        if (cancelledStatusRows.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Cancelled order status not found",
                },
                { status: 500 }
            );
        }

        const cancelledStatusId =
            cancelledStatusRows[0].order_status_id;

        // =====================================================
        // 5. CHECK ORDER BELONGS TO CURRENT USER
        // =====================================================

        const [orders]: any = await pool.query(
            `SELECT
                o.order_id,
                o.user_id,
                o.status,
                os.status_name
             FROM orders o
             LEFT JOIN order_status os
                ON o.status = os.order_status_id
             WHERE o.order_id = ?
             AND o.user_id = ?
             LIMIT 1`,
            [orderId, currentUserId]
        );

        if (orders.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Order not found",
                },
                { status: 404 }
            );
        }

        const order = orders[0];

        // =====================================================
        // 6. CHECK WHETHER ORDER CAN BE CANCELLED
        // =====================================================

        const currentStatus =
            String(order.status_name || "").toLowerCase().trim();

        if (
            currentStatus === "shipped" ||
            currentStatus === "delivered" ||
            currentStatus === "cancelled"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Order cannot be cancelled because it is already ${order.status_name}`,
                },
                { status: 400 }
            );
        }

        // =====================================================
        // 7. UPDATE ORDER STATUS
        // =====================================================

        connection = await pool.getConnection();

        await connection.beginTransaction();

        await connection.query(
            `UPDATE orders
             SET status = ?
             WHERE order_id = ?
             AND user_id = ?`,
            [
                cancelledStatusId,
                orderId,
                currentUserId,
            ]
        );

        await connection.commit();

        // =====================================================
        // 8. SUCCESS RESPONSE
        // =====================================================

        return NextResponse.json({
            success: true,
            message: "Order cancelled successfully",
            order: {
                order_id: orderId,
                status_id: cancelledStatusId,
                status: "Cancelled",
            },
        });

    } catch (error) {
        // =====================================================
        // ROLLBACK
        // =====================================================

        if (connection) {
            await connection.rollback();
        }

        console.error("Cancel Order API Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to cancel order",
            },
            { status: 500 }
        );

    } finally {
        // =====================================================
        // RELEASE CONNECTION
        // =====================================================

        if (connection) {
            connection.release();
        }
    }
}