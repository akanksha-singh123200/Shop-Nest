import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        const [paymentTypes] = await pool.query(
            "SELECT id, name, code FROM payment_types ORDER BY id ASC"
        );

        return NextResponse.json({
            success: true,
            paymentTypes,
        });
    } catch (error) {
        console.error("Payment Types API Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch payment types",
                paymentTypes: [],
            },
            { status: 500 }
        );
    }
}