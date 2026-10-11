import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {

        // =====================================================
        // 1. GET TOTAL USERS
        // =====================================================

        const [userRows]: any = await pool.query(
            `SELECT COUNT(*) AS total_users FROM user`
        );

        const totalUsers = userRows[0].total_users;


        // =====================================================
        // 2. GET TOTAL PRODUCTS
        // =====================================================

        const [productRows]: any = await pool.query(
            `SELECT COUNT(*) AS total_products FROM product_schema`
        );

        const totalProducts = productRows[0].total_products;


        // =====================================================
        // 3. GET TOTAL ORDERS
        // =====================================================

        const [orderRows]: any = await pool.query(
            `SELECT COUNT(*) AS total_orders FROM orders`
        );

        const totalOrders = orderRows[0].total_orders;


        // =====================================================
        // 4. GET TOTAL SALES
        // Only Paid orders
        // =====================================================

        const [salesRows]: any = await pool.query(`
            SELECT COALESCE(SUM(o.total_amount), 0) AS total_sales
            FROM orders o
            JOIN payment_status ps
                ON o.payment_status = ps.payment_status_id
            WHERE ps.payment_status_name = 'Paid'
        `);

        const totalSales = salesRows[0].total_sales;


        // =====================================================
        // 5. GET TOTAL PENDING SALES
        // =====================================================

        const [pendingSalesRows]: any = await pool.query(`
            SELECT COALESCE(SUM(o.total_amount), 0) AS total_pending_sales
            FROM orders o
            JOIN payment_status ps
                ON o.payment_status = ps.payment_status_id
            WHERE ps.payment_status_name = 'Pending'
        `);

        const totalPendingSales = pendingSalesRows[0].total_pending_sales;


        // =====================================================
        // 6. GET TOTAL REVIEWS
        // =====================================================

        const [reviewRows]: any = await pool.query(
            `SELECT COUNT(*) AS total_reviews FROM reviews`
        );

        const totalReviews = reviewRows[0].total_reviews;


        // =====================================================
        // 7. GET TOTAL PENDING ORDERS
        // =====================================================

        const [pendingOrderRows]: any = await pool.query(`
            SELECT COUNT(*) AS total_pending_orders
            FROM orders o
            JOIN payment_status ps
                ON o.payment_status = ps.payment_status_id
            WHERE ps.payment_status_name = 'Pending'
        `);

        const totalPendingOrders =
            pendingOrderRows[0].total_pending_orders;


        // =====================================================
        // 8. ORDER STATUS SUMMARY
        // =====================================================

        const [orderStatusRows]: any = await pool.query(`
            SELECT
                os.status_name,
                COUNT(o.order_id) AS total_orders
            FROM orders o
            JOIN order_status os
                ON o.status = os.order_status_id
            GROUP BY os.order_status_id, os.status_name
            ORDER BY os.order_status_id
        `);

        const orderStatusSummary = orderStatusRows;


        // =====================================================
        // 9. TOP SELLING PRODUCTS
        // Cancelled orders are excluded
        // =====================================================

        const [topSellingRows]: any = await pool.query(`
    SELECT
        p.id AS product_id,
        p.title,
        SUM(oi.order_quantity) AS total_sold
    FROM order_items oi
    JOIN product_schema p
        ON oi.product_id = p.id
    JOIN orders o
        ON oi.order_id = o.order_id
    JOIN order_status os
        ON o.status = os.order_status_id
    WHERE os.status_name != 'Cancelled'
    GROUP BY p.id, p.title
    ORDER BY total_sold DESC
    LIMIT 5
`);

const [lowStockRows]: any = await pool.query(`
    SELECT
        id AS product_id,
        title,
        stock
    FROM product_schema
    WHERE stock <= 5
    ORDER BY stock ASC
`);

        const topSellingProducts = topSellingRows;
        const lowStockProducts = lowStockRows;


        // =====================================================
        // 10. RETURN DASHBOARD DATA
        // =====================================================

        return NextResponse.json({
            success: true,
            message: "Dashboard data fetched successfully",

            data: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalSales,
                totalPendingSales,
                totalReviews,
                totalPendingOrders,
                orderStatusSummary,
                topSellingProducts,
                lowStockProducts
            }
        });

    } catch (error) {

        console.error("Dashboard Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch dashboard data"
            },
            {
                status: 500
            }
        );
    }
}