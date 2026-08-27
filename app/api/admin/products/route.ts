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
import fs from "fs/promises";
import path from "path";
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


// export async function PUT(req: Request) {
//   try {
//     const body = await req.json();

//     const { id, price,image } = body;

//     await pool.query(
//       "UPDATE product_schema SET price=?,image=? WHERE id=?",
//       [price,image, id]
//     );

//     return NextResponse.json({
//       success: true,
//       message: "Image and price updated",
//     });
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json({
//       success: false,
//       message: "Update failed",
//     });
//   }
// }

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






export async function PUT(req: Request) {
    try {
        const formData = await req.formData();

        const id = formData.get("id") as string;
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price") as string;
        const category = formData.get("category") as string;
        const stock = formData.get("stock") as string;

        const imageFile = formData.get("image") as File | null;

        let imagePath = null;

        // Agar new image select ki hai
        if (imageFile && imageFile.size > 0) {

            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const extension = imageFile.name.split(".").pop();

            const fileName = `product-${id}-${Date.now()}.${extension}`;

            const uploadDir = path.join(
                process.cwd(),
                "public",
                "products"
            );

            await fs.mkdir(uploadDir, { recursive: true });

            const filePath = path.join(uploadDir, fileName);

            await fs.writeFile(filePath, buffer);

            imagePath = `/products/${fileName}`;
        }

        // Image change hui hai
        if (imagePath) {

            await pool.query(
                `UPDATE product_schema
                 SET title=?,
                     description=?,
                     price=?,
                     category=?,
                     stock=?,
                     image=?
                 WHERE id=?`,
                [
                    title,
                    description,
                    price,
                    category,
                    stock,
                    imagePath,
                    id
                ]
            );

        } else {

            // Image change nahi hui
            await pool.query(
                `UPDATE product_schema
                 SET title=?,
                     description=?,
                     price=?,
                     category=?,
                     stock=?
                 WHERE id=?`,
                [
                    title,
                    description,
                    price,
                    category,
                    stock,
                    id
                ]
            );
        }

        return NextResponse.json({
            success: true,
            message: "Product updated successfully",
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Update failed",
            },
            {
                status: 500,
            }
        );
    }
}