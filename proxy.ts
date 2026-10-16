
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function verifyAdminToken(token: string) {
    try {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.error("JWT_SECRET is missing.");
            return false;
        }

        const secretKey = new TextEncoder().encode(secret);

        await jwtVerify(token, secretKey);

        return true;
    } catch (error) {
        console.error("Admin token verification failed:", error);
        return false;
    }
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get("adminToken")?.value;

    // ==========================================
    // ADMIN LOGIN PAGE
    // ==========================================

    if (pathname.startsWith("/admin/auth/login")) {
        if (token) {
            const isValid = await verifyAdminToken(token);

            if (isValid) {
                return NextResponse.redirect(
                    new URL("/admin/", request.url)
                );
            }
        }

        return NextResponse.next();
    }

    // ==========================================
    // ADMIN SIGNUP PAGE
    // ==========================================

    if (pathname.startsWith("/admin/auth/signup")) {
        if (token) {
            const isValid = await verifyAdminToken(token);

            if (isValid) {
                return NextResponse.redirect(
                    new URL("/admin/", request.url)
                );
            }
        }

        return NextResponse.next();
    }

    // ==========================================
    // PROTECT ALL OTHER ADMIN PAGES
    // ==========================================

    if (pathname.startsWith("/admin")) {
        // No admin token
        if (!token) {
            return NextResponse.redirect(
                new URL("/admin/auth/login", request.url)
            );
        }

        // Verify admin token
        const isValid = await verifyAdminToken(token);

        if (!isValid) {
            const response = NextResponse.redirect(
                new URL("/admin/auth/login", request.url)
            );

            // Remove invalid cookies
            response.cookies.delete("adminToken");
            response.cookies.delete("adminId");

            return response;
        }

        // Token is valid
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
