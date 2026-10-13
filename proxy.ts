import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error("JWT_SECRET is missing.");
      return false;
    }

    const secretKey = new TextEncoder().encode(secret);

    await jwtVerify(token, secretKey);

    return true;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("adminToken")?.value;

  // Allow admin login and signup pages without authentication.
  if (
    pathname.startsWith("/admin/auth/login") ||
    pathname.startsWith("/admin/auth/signup")
  ) {
    if (token && (await verifyAdminToken(token))) {
      return NextResponse.redirect(new URL("/admin/", request.url));
    }

    return NextResponse.next();
  }

  // Protect all other admin pages.
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/auth/login", request.url)
      );
    }

    const isValid = await verifyAdminToken(token);

    if (!isValid) {
      const response = NextResponse.redirect(
        new URL("/admin/auth/login", request.url)
      );

      response.cookies.delete("adminToken");
      response.cookies.delete("adminId");

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};