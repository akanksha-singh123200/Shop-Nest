import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({
            success: true,
            message: "Logout Successful",
        });

        // Normal login cookies delete
        response.cookies.delete("token");
        response.cookies.delete("userId");

        return response;

    } catch (error) {
        console.error("LOGOUT ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Logout failed",
            },
            { status: 500 }
        );
    }
}