
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    let connection: any = null;

    try {
        // =====================================================
        // 1. GET PRODUCT ID AND QUANTITY
        // =====================================================

        const { searchParams } = new URL(request.url);

        const productId = searchParams.get("product_id");
        const quantityParam = searchParams.get("quantity");

        if (!productId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product ID is required",
                },
                { status: 400 }
            );
        }

        const quantity = Number(quantityParam);

        if (
            !quantityParam ||
            !Number.isInteger(quantity) ||
            quantity <= 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Valid quantity is required",
                },
                { status: 400 }
            );
        }

        // =====================================================
        // 2. FIND LOGGED-IN USER
        // =====================================================

        let currentUserId: number | null = null;
        let loginMethod: string | null = null;

        // =====================================================
        // 2A. GOOGLE / NEXTAUTH LOGIN
        // =====================================================

        const session: any = await getServerSession(authOptions);

        if (session?.user?.email) {
            const [users]: any = await pool.query(
                `SELECT id, name, email
                 FROM \`user\`
                 WHERE email = ?`,
                [session.user.email]
            );

            if (users.length > 0) {
                currentUserId = Number(users[0].id);
                loginMethod = "Google";
            }
        }

        // =====================================================
        // 2B. NORMAL LOGIN / JWT
        // =====================================================

        if (!currentUserId) {
            try {
                const cookieHeader =
                    request.headers.get("cookie") || "";

                const token = cookieHeader
                    .split(";")
                    .map((cookie) => cookie.trim())
                    .find((cookie) =>
                        cookie.startsWith("token=")
                    )
                    ?.substring("token=".length);

                if (token) {
                    const jwtSecret = process.env.JWT_SECRET;

                    if (!jwtSecret) {
                        throw new Error(
                            "JWT_SECRET is not configured"
                        );
                    }

                    const decoded: any = jwt.verify(
                        decodeURIComponent(token),
                        jwtSecret
                    );

                    const decodedUserId =
                        decoded.id ??
                        decoded.userId ??
                        decoded.user_id;

                    if (decodedUserId) {
                        currentUserId = Number(decodedUserId);
                        loginMethod = "Normal Login";
                    }
                }
            } catch (jwtError) {
                console.error(
                    "JWT Verification Error:",
                    jwtError
                );
            }
        }

        // =====================================================
        // 3. CHECK LOGIN
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
                    loggedIn: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        const currentUser = users[0];

        // =====================================================
        // 5. FETCH PRODUCT
        // =====================================================

        const [products]: any = await pool.query(
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

        if (products.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found",
                },
                { status: 404 }
            );
        }

        const product = products[0];

        // =====================================================
        // 6. CHECK STOCK
        // =====================================================

        const availableStock = Number(product.stock);

        if (quantity > availableStock) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Only ${availableStock} items are available`,
                },
                { status: 400 }
            );
        }

        // =====================================================
        // 7. CALCULATE PRICE
        // =====================================================

        const price = Number(product.price);
        const totalAmount = price * quantity;

        // =====================================================
        // 8. FETCH SHIPPING ADDRESS
        // =====================================================

        const [shippingAddresses]: any =
            await pool.query(
                `SELECT *
                 FROM user_details
                 WHERE user_id = ?
                 LIMIT 1`,
                [currentUserId]
            );

        if (shippingAddresses.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Shipping address is required",
                },
                { status: 400 }
            );
        }

        const address = shippingAddresses[0];

        // =====================================================
        // 9. CREATE SHIPPING ADDRESS STRING
        // =====================================================

        const shippingAddress = [
            address.full_name,
            address.phone,
            address.address_line1,
            address.address_line2,
            address.landmark,
            address.city,
            address.state,
            address.pincode,
            address.country,
        ]
            .filter(
                (value) =>
                    value !== null &&
                    value !== undefined &&
                    value !== ""
            )
            .join(", ");

        // =====================================================
        // 10. GET PENDING ORDER STATUS
        // =====================================================

        const [orderStatusRows]: any =
            await pool.query(
                `SELECT *
                 FROM order_status
                 WHERE LOWER(TRIM(status_name)) = 'pending'
                 LIMIT 1`
            );

        if (orderStatusRows.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Pending order status was not found in database",
                },
                { status: 500 }
            );
        }

        const pendingOrderStatus =
            orderStatusRows[0];

        const orderStatusId =
            pendingOrderStatus.order_status_id;

        // =====================================================
        // 11. GET PENDING PAYMENT STATUS
        // =====================================================

        const [paymentStatusRows]: any =
            await pool.query(
                `SELECT *
                 FROM payment_status
                 WHERE LOWER(TRIM(payment_status_name)) = 'pending'
                 LIMIT 1`
            );

        if (paymentStatusRows.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Pending payment status was not found in database",
                },
                { status: 500 }
            );
        }

        const pendingPaymentStatus =
            paymentStatusRows[0];

        const paymentStatusId =
            pendingPaymentStatus.payment_status_id;

        // =====================================================
        // 12. CREATE DATABASE CONNECTION
        // =====================================================

        connection = await pool.getConnection();

        // =====================================================
        // 13. START TRANSACTION
        // =====================================================

        await connection.beginTransaction();

        // =====================================================
        // 14. INSERT ORDER
        // =====================================================

        const [orderResult]: any =
            await connection.query(
                `INSERT INTO orders
                (
                    user_id,
                    total_amount,
                    status,
                    payment_status,
                    shipping_address
                )
                VALUES (?, ?, ?, ?, ?)`,
                [
                    currentUserId,
                    totalAmount,
                    orderStatusId,
                    paymentStatusId,
                    shippingAddress,
                ]
            );

        // =====================================================
        // 15. GET GENERATED ORDER ID
        // =====================================================

        const orderId = orderResult.insertId;

        if (!orderId) {
            throw new Error(
                "Order ID was not generated"
            );
        }

        // =====================================================
        // 16. INSERT ORDER ITEM
        // =====================================================

        await connection.query(
            `INSERT INTO order_items
            (
                order_id,
                product_id,
                order_quantity,
                order_price
            )
            VALUES (?, ?, ?, ?)`,
            [
                orderId,
                Number(productId),
                quantity,
                price,
            ]
        );

        // =====================================================
        // 17. REDUCE PRODUCT STOCK
        // =====================================================

        const [stockResult]: any =
            await connection.query(
                `UPDATE product_schema
                 SET stock = stock - ?
                 WHERE id = ?`,
                [
                    quantity,
                    Number(productId),
                ]
            );

        if (stockResult.affectedRows === 0) {
            throw new Error(
                "Product stock could not be updated"
            );
        }

        // =====================================================
        // 18. COMMIT TRANSACTION
        // =====================================================

        await connection.commit();

        // =====================================================
        // 19. SUCCESS RESPONSE
        // =====================================================

        return NextResponse.json(
            {
                success: true,
                loggedIn: true,
                loginMethod: loginMethod,
                message:
                    "COD order placed successfully",

                order_id: orderId,
                user_id: currentUserId,
                product_id: Number(productId),
                quantity: quantity,
                price: price,
                total_amount: totalAmount,

                payment_method: "COD",

                status: {
                    id: orderStatusId,
                    name: "Pending",
                },

                payment_status: {
                    id: paymentStatusId,
                    name: "Pending",
                },
            },
            { status: 201 }
        );

    } catch (error: any) {

        // =====================================================
        // 20. ROLLBACK
        // =====================================================

        if (connection) {
            try {
                await connection.rollback();
            } catch (rollbackError) {
                console.error(
                    "Rollback Error:",
                    rollbackError
                );
            }
        }

        // =====================================================
        // 21. LOG ACTUAL DATABASE ERROR
        // =====================================================

        console.error(
            "======================================"
        );

        console.error(
            "PLACE ORDER ERROR"
        );

        console.error(
            "Error:",
            error
        );

        console.error(
            "Error Code:",
            error?.code
        );

        console.error(
            "SQL Message:",
            error?.sqlMessage
        );

        console.error(
            "SQL State:",
            error?.sqlState
        );

        console.error(
            "======================================"
        );

        // =====================================================
        // 22. RETURN ACTUAL ERROR
        // =====================================================

        return NextResponse.json(
            {
                success: false,
                message:
                    error?.sqlMessage ||
                    error?.message ||
                    "Something went wrong while placing order",

                error_code:
                    error?.code || null,

                sql_state:
                    error?.sqlState || null,
            },
            { status: 500 }
        );

    } finally {

        // =====================================================
        // 23. RELEASE CONNECTION
        // =====================================================

        if (connection) {
            connection.release();
        }
    }
}
