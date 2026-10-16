import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


export async function POST(req: Request) {
  try {

    
    let userId = null;

    // ==========================
    // GOOGLE LOGIN
    // ==========================
    const session = await getServerSession(authOptions);

    if (session?.user?.email) {
      const [users]: any = await pool.query(
        "SELECT id FROM user WHERE email=?",
        [session.user.email]
      );

      if (users.length > 0) {
        userId = users[0].id;
      }
    }

    // ==========================
    // NORMAL LOGIN
    // ==========================
    if (!userId) {
      const token = req.headers.get("cookie")
        ?.split("; ")
        .find((c) => c.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        const decoded: any = jwt.verify(
          token,
          process.env.JWT_SECRET!
        );

        userId = decoded.id;
      }
    }

    // ==========================
    // LOGIN CHECK
    // ==========================
    if (!userId) {
      return NextResponse.json({
        success: false,
        loggedIn: false,
        message: "Please login first",
      }, { status: 401 });
    }

    const body = await req.json();
    const { productID } = body;

    // ==========================
    // ALREADY EXISTS CHECK
    // ==========================
    const [wishlist]: any = await pool.query(
      "SELECT * FROM wishlist WHERE user_id=? AND product_id=?",
      [userId, productID]
    );

    if (wishlist.length > 0) {
      return NextResponse.json({
        success: false,
        message: "Product already added in wishlist",
      });
    }

    // ==========================
    // INSERT
    // ==========================
    await pool.query(
      "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)",
      [userId, productID]
    );

    return NextResponse.json({
      success: true,
      message: "Product added to wishlist",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function GET(req: Request) {
  try {

    let userId = null;

    const session = await getServerSession(authOptions);

    if (session?.user?.email) {
      const [users]: any = await pool.query(
        "SELECT id FROM user WHERE email=?",
        [session.user.email]
      );

      if (users.length > 0) {
        userId = users[0].id;
      }
    }

    if (!userId) {
      const token = req.headers.get("cookie")
        ?.split("; ")
        .find((c) => c.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        const decoded: any = jwt.verify(
          token,
          process.env.JWT_SECRET!
        );

        userId = decoded.id;
      }
    }

    if (!userId) {
      return NextResponse.json({
        success: false,
        wishlist: [],
      });
    }

    const [wishlist]: any = await pool.query(
      `
      SELECT product_id
      FROM wishlist
      WHERE user_id=?
      `,
      [userId]
    );

    return NextResponse.json({
      success: true,
      wishlist:wishlist[0]
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
     
    });
  }
}