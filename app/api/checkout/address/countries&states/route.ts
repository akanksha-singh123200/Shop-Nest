import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        const [countries]: any = await pool.query(
            `SELECT id, country_name FROM countries ORDER BY country_name ASC`
        );
        const [states]: any = await pool.query(
            `SELECT state_id, state_name FROM state ORDER BY state_name ASC`
        );

        return NextResponse.json({
            success: true,
            countries: countries,
            states: states,
        });
    } catch (error) {
        console.error("Country Fetch Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch countries",
            },
            { status: 500 }
        );
    }
}