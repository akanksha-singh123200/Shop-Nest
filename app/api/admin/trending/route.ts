import { NextResponse } from "next/server";
import pool from "@/lib/db";

// export async function GET() {
//   try {
//     const [rows] = await pool.query("SELECT 1");

//     return NextResponse.json({
//       success: true,
//       message: "Database connected successfully",
//       rows,
//     });

//   } catch (error) {
//     console.error("Database connection error:", error);

//     return NextResponse.json({
//       success: false,
//       message: "Database connection failed",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// }

export async function GET(req: Request) {
  try {
    const [products]: any = await pool.query(
      "SELECT p.*,t.id AS trending_id,t.is_trending,t.display_order FROM product_schema p LEFT JOIN trendings t ON p.id = t.product_id ORDER BY t.display_order ASC,p.id DESC;"
    );

    if (products.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No products found",
        products: [],
      });
    }

    return NextResponse.json({
      success: true,
      message: "All products fetched successfully",
      products: products,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
}
export async function POST(req:Request){
  try{
    const body = await req.json();
    const {product_id,is_trending,display_order}=body;

    const [result]:any =await pool.query(
    `Insert into trendings (product_id,is_trending,display_order) Values (?,?,?)`,
    [product_id,is_trending,display_order]
    );
     return NextResponse.json({
      success: true,
      message: "Product added to trending successfully",
      trending_id: result.insertId,
    });
  }
  catch(error){
    console.error(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Unknown Error",
    });

  }

}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const { id } = body;

    await pool.query(
      `DELETE FROM trendings WHERE id = ?`,
      [id]
    );

    return NextResponse.json({
      success: true,
      message: "Trending Product Deleted Successfully",
    });

  } catch (error) {
    console.error("Delete user error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Delete Failed",
      },
      {
        status: 500,
      }
    );
  }
}
