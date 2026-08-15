// import { NextResponse } from "next/server";
// import pool from "@/lib/db";

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




import { NextResponse } from "next/server";
import pool from "@/lib/db";
export async function GET(request: Request) {
  try {

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const categorySearch = searchParams.get("categorySearch");
    const sort = searchParams.get("sort");


    let products;

    console.log(categorySearch);
    console.log(sort);


    // Search
    if (search && categorySearch) {

      [products] = await pool.query(
        "SELECT * FROM product_schema WHERE title LIKE ?",
        [`%${search}%`]
      );

      [products] = await pool.query(
        "SELECT * FROM product_schema WHERE category = ?",
        [categorySearch]
      );

    }

    // Category Filter
    else if (categorySearch) {

      [products] = await pool.query(
        "SELECT * FROM product_schema WHERE category = ?",
        [categorySearch]
      );

    }
    else if (sort==="price_asc") {
      [products] = await pool.query(
        "SELECT * FROM product_schema ORDER BY price ASC"
      );
    }
     else if (sort==="price_desc") {
      [products] = await pool.query(
        "SELECT * FROM product_schema ORDER BY price DESC"
      );
    }

    // All Products
    else {

      [products] = await pool.query(
        "SELECT * FROM product_schema"
      );

    }

    return NextResponse.json({
      success: true,
      products,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      message: "Error fetching products",
    });

  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, desc, price, category, image, stock } = body;

    await pool.query(
      `INSERT INTO product_schema
      (title, description, price, category, image, stock)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [title, desc, price, category, image, stock]
    );

    const [products]: any = await pool.query(
      "SELECT * FROM product_schema"
    );



    return NextResponse.json({
      success: true,
      message: "Product Added Successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}


export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { id, price } = body;

    await pool.query(
      "UPDATE product_schema SET price=? WHERE id=?",
      [price, id]
    );

    return NextResponse.json({
      success: true,
      message: "Price updated",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Update failed",
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const { id } = body;

    await pool.query(
      "DELETE FROM product_schema WHERE id=?",
      [id]
    );

    return NextResponse.json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Delete Failed",
    });
  }
}

