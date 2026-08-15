import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userID, productID } = body;
    console.log("UserID", userID);
    console.log("ProductID", productID);

    const [users]: any = await pool.query(
      "select * from user where id=?",
      [userID]
    );
    const [products]: any = await pool.query(
      "SELECT * FROM product_schema WHERE id = ?",
      [productID]
    );
    const [wishlist]: any = await pool.query(
      "select * from wishlist where product_id=? and user_id=? ",
      [userID, productID]
    );
    if (wishlist.length === 0) {
      await pool.query(
        "INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)",
        [userID, productID]
      );


      return NextResponse.json({
        success: true,
        message: "Product added to wishlist",
      });
    }
    else {
      if (wishlist.length > 0) {
        return NextResponse.json({
          success: false,
          message: "Product already exists in wishlist",
        });
      }


    }


    // return NextResponse.json({
    //     success: true,
    //     message: "Success",
    //     user: users[0],
    //     product: products[0],
    // });

  }
  catch (error) {
    return NextResponse.json({
      success: false,
      message: "Invalid",

    });

  }

}
export async function GET() {
  try {
    const [wishlist]: any = await pool.query(
      `SELECT * FROM wishlist`
    );

    return NextResponse.json({
      success: true,
      message: "Wishlist fetched successfully",
      wishlist,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const { userID, productID } = body;

    await pool.query(
      "DELETE FROM wishlist WHERE user_id=? AND product_id=?",
      [userID, productID]
    );

    return NextResponse.json({
      success: true,
      message: "Product removed from wishlist",
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}