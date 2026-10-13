
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import jwt from "jsonwebtoken";

import pool from "@/lib/db";
import { authOptions } from "@/lib/authOptions";


/*
=====================================================
GET CURRENT USER ID
Google Login  → NextAuth
Normal Login  → JWT token
=====================================================
*/

async function getCurrentUserID() {

  /*
  ============================================
  1. GOOGLE LOGIN
  ============================================
  */

  const session = await getServerSession(authOptions);

  if (session?.user?.email) {

    const [users]: any = await pool.query(
      "SELECT id FROM user WHERE email = ?",
      [session.user.email]
    );

    if (users.length > 0) {
      return users[0].id;
    }
  }


  /*
  ============================================
  2. NORMAL LOGIN - JWT
  ============================================
  */

  const { cookies } = await import("next/headers");

  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (token) {

    try {

      const decoded: any = jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

      const userID =
        decoded.id ||
        decoded.userId ||
        decoded.user_id;

      if (userID) {
        return userID;
      }

    } catch (error) {

      console.log("JWT verification failed");

    }
  }


  /*
  ============================================
  USER NOT LOGGED IN
  ============================================
  */

  return null;
}


/*
=====================================================
GET WISHLIST PRODUCTS
=====================================================
*/

export async function GET() {

  try {

    /*
    Get currently logged-in user
    */

    const userID = await getCurrentUserID();


    /*
    User login nahi hai
    */

    if (!userID) {

      return NextResponse.json(
        {
          success: false,
          message: "Please login first",
        },
        { status: 401 }
      );

    }


    /*
    ============================================
    ONLY CURRENT USER'S WISHLIST
    ============================================
    */

    const [wishlist]: any = await pool.query(

      `SELECT
        w.wishlist_id,
        w.user_id,
        p.id AS product_id,
        p.title,
        p.description,
        p.price,
        p.image,
        p.stock,
        p.category

       FROM wishlist w

       INNER JOIN product_schema p
       ON w.product_id = p.id

       WHERE w.user_id = ?

       ORDER BY w.wishlist_id DESC`,

      [userID]

    );


    return NextResponse.json({

      success: true,
      wishlist,

    });


  } catch (error) {

    console.error(
      "Wishlist Products GET Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );

  }
}


/*
=====================================================
DELETE WISHLIST PRODUCT
=====================================================
*/

export async function DELETE(req: Request) {

  try {

    /*
    Get currently logged-in user
    */

    const userID = await getCurrentUserID();


    /*
    User login nahi hai
    */

    if (!userID) {

      return NextResponse.json(
        {
          success: false,
          message: "Please login first",
        },
        { status: 401 }
      );

    }


    /*
    Get product ID from frontend
    */

    const body = await req.json();

    const { productID } = body;


    /*
    Product ID check
    */

    if (!productID) {

      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required",
        },
        { status: 400 }
      );

    }


    /*
    ============================================
    DELETE ONLY CURRENT USER'S PRODUCT
    ============================================

    userID frontend se nahi liya ja raha.

    Backend khud logged-in user ka ID
    use kar raha hai.
    */

    const [result]: any = await pool.query(

      `DELETE FROM wishlist
       WHERE user_id = ?
       AND product_id = ?`,

      [userID, productID]

    );


    /*
    Product wishlist mein mila hi nahi
    */

    if (result.affectedRows === 0) {

      return NextResponse.json(
        {
          success: false,
          message: "Product not found in wishlist",
        },
        { status: 404 }
      );

    }


    return NextResponse.json({

      success: true,
      message: "Product removed from wishlist",

    });


  } catch (error) {

    console.error(
      "Wishlist Products DELETE Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );

  }
}
