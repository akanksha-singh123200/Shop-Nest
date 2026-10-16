import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const paymentStatus = searchParams.get("payment_status");
    const search = searchParams.get("search");

    let whereConditions: string[] = [];
    let queryParams: any[] = [];

    // ================================
    // ORDER STATUS FILTER
    // ================================
    if (status) {
      whereConditions.push("o.status = ?");
      queryParams.push(Number(status));
    }

    // ================================
    // PAYMENT STATUS FILTER
    // ================================
    if (paymentStatus) {
      whereConditions.push("o.payment_status = ?");
      queryParams.push(Number(paymentStatus));
    }

    // ================================
    // SEARCH ORDER ID / CUSTOMER
    // ================================
    if (search) {
      whereConditions.push(`
        (
          o.order_id LIKE ?
          OR u.name LIKE ?
        )
      `);

      queryParams.push(`%${search}%`);
      queryParams.push(`%${search}%`);
    }

    // ================================
    // WHERE CLAUSE
    // ================================
    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    // ================================
    // FETCH ORDERS
    // ================================
    const [allOrders]: any = await pool.query(
      `
      SELECT
        o.order_id,
        o.user_id,
        u.name AS user_name,

        o.total_amount,

        o.status AS order_status_id,
        os.status_name AS order_status,

        o.payment_status AS payment_status_id,
        ps.payment_status_name AS payment_status,

        o.shipping_address,
        o.created_at,

        oi.order_items_id,
        oi.product_id,

        p.title AS product_title,

        oi.order_quantity,
        oi.order_price

      FROM orders AS o

      INNER JOIN order_items AS oi
        ON o.order_id = oi.order_id

      INNER JOIN user AS u
        ON o.user_id = u.id

      INNER JOIN order_status AS os
        ON o.status = os.order_status_id

      INNER JOIN payment_status AS ps
        ON o.payment_status = ps.payment_status_id

      INNER JOIN product_schema AS p
        ON oi.product_id = p.id

      ${whereClause}

      ORDER BY o.created_at ASC
      `,
      queryParams
    );

    // ================================
    // STATUS OPTIONS
    // ================================
    const [order_status]: any = await pool.query(
      `SELECT * FROM order_status`
    );

    // ================================
    // PAYMENT STATUS OPTIONS
    // ================================
    const [payment_status]: any = await pool.query(
      `SELECT * FROM payment_status`
    );

    return NextResponse.json({
      success: true,
      message: "Orders fetched successfully",
      data: allOrders,
      order_status,
      payment_status,
    });

  } catch (error) {
    console.error("Fetch orders error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// PUT - UPDATE ORDER STATUS / PAYMENT STATUS
// =====================================================

export async function PUT(req: Request) {
    try {

        const body = await req.json();

        const {
            order_id,
            status,
            payment_status
        } = body;


        // =====================================================
        // 1. CHECK ORDER ID
        // =====================================================

        if (!order_id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Order ID is required"
                },
                {
                    status: 400
                }
            );
        }


        // =====================================================
        // 2. CHECK STATUS DATA
        // =====================================================

        if (status === undefined && payment_status === undefined) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Order status or payment status is required"
                },
                {
                    status: 400
                }
            );
        }


        // =====================================================
        // 3. UPDATE BOTH STATUS
        // =====================================================

        if (status !== undefined && payment_status !== undefined) {

            await pool.query(
                `UPDATE orders
                 SET status = ?,
                     payment_status = ?
                 WHERE order_id = ?`,
                [
                    status,
                    payment_status,
                    order_id
                ]
            );

        }


        // =====================================================
        // 4. UPDATE ONLY ORDER STATUS
        // =====================================================

        else if (status !== undefined) {

            await pool.query(
                `UPDATE orders
                 SET status = ?
                 WHERE order_id = ?`,
                [
                    status,
                    order_id
                ]
            );

        }


        // =====================================================
        // 5. UPDATE ONLY PAYMENT STATUS
        // =====================================================

        else if (payment_status !== undefined) {

            await pool.query(
                `UPDATE orders
                 SET payment_status = ?
                 WHERE order_id = ?`,
                [
                    payment_status,
                    order_id
                ]
            );

        }


        // =====================================================
        // 6. RESPONSE
        // =====================================================

        return NextResponse.json({
            success: true,
            message: "Order updated successfully"
        });

    } catch (error) {

        console.error("PUT ORDER ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update order"
            },
            {
                status: 500
            }
        );
    }
}