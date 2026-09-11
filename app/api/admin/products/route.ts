import { NextResponse } from "next/server";
import pool from "@/lib/db";
import fs from "fs/promises";
import path from "path";

// ========================================
// GET - Fetch Products
// ========================================

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const search = searchParams.get("search");
        const categorySearch = searchParams.get("categorySearch");
        const sort = searchParams.get("sort");

        let products;

        // Search + Category Filter
        if (search && categorySearch) {
            [products] = await pool.query(
                `SELECT * 
                 FROM product_schema 
                 WHERE title LIKE ? 
                 AND category = ?`,
                [`%${search}%`, categorySearch]
            );
        }

        // Search
        else if (search) {
            [products] = await pool.query(
                `SELECT * 
                 FROM product_schema 
                 WHERE title LIKE ?`,
                [`%${search}%`]
            );
        }

        // Category Filter
        else if (categorySearch) {
            [products] = await pool.query(
                `SELECT * 
                 FROM product_schema 
                 WHERE category = ?`,
                [categorySearch]
            );
        }

        // Price Low to High
        else if (sort === "price_asc") {
            [products] = await pool.query(
                `SELECT * 
                 FROM product_schema 
                 ORDER BY price ASC`
            );
        }

        // Price High to Low
        else if (sort === "price_desc") {
            [products] = await pool.query(
                `SELECT * 
                 FROM product_schema 
                 ORDER BY price DESC`
            );
        }

        // All Products
        else {
            [products] = await pool.query(
                `SELECT * FROM product_schema`
            );
        }

        return NextResponse.json({
            success: true,
            products,
        });

    } catch (error) {
        console.error("Fetch products error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Error fetching products",
            },
            {
                status: 500,
            }
        );
    }
}


// ========================================
// POST - Add Product
// ========================================

export async function POST(req: Request) {
    try {
        // Frontend FormData bhej raha hai
        const formData = await req.formData();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price") as string;
        const category = formData.get("category") as string;
        const stock = formData.get("stock") as string;

        const imageFile = formData.get("image") as File | null;

        // Validation
        if (!title || !description || !price || !category || !stock) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please fill all required fields",
                },
                {
                    status: 400,
                }
            );
        }

        // ========================================
        // Save Image
        // ========================================

        let imagePath = "";

        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const extension = imageFile.name.split(".").pop() || "jpg";

            const fileName = `product-${Date.now()}.${extension}`;

            const uploadDir = path.join(
                process.cwd(),
                "public",
                "products"
            );

            // Create folder if it doesn't exist
            await fs.mkdir(uploadDir, {
                recursive: true,
            });

            const filePath = path.join(
                uploadDir,
                fileName
            );

            await fs.writeFile(
                filePath,
                buffer
            );

            imagePath = `/products/${fileName}`;
        }

        // ========================================
        // Insert Product
        // ========================================

        await pool.query(
            `INSERT INTO product_schema
            (title, description, price, category, image, stock)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                title,
                description,
                price,
                category,
                imagePath,
                stock,
            ]
        );

        return NextResponse.json({
            success: true,
            message: "Product Added Successfully",
        });

    } catch (error) {
        console.error("Add product error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong while adding product",
            },
            {
                status: 500,
            }
        );
    }
}


// ========================================
// PUT - Update Product
// ========================================

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

        let imagePath: string | null = null;

        // ========================================
        // New Image
        // ========================================

        if (imageFile && imageFile.size > 0) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const extension =
                imageFile.name.split(".").pop() || "jpg";

            const fileName =
                `product-${id}-${Date.now()}.${extension}`;

            const uploadDir = path.join(
                process.cwd(),
                "public",
                "products"
            );

            await fs.mkdir(uploadDir, {
                recursive: true,
            });

            const filePath = path.join(
                uploadDir,
                fileName
            );

            await fs.writeFile(
                filePath,
                buffer
            );

            imagePath = `/products/${fileName}`;
        }

        // ========================================
        // Update with Image
        // ========================================

        if (imagePath) {
            await pool.query(
                `UPDATE product_schema
                 SET title = ?,
                     description = ?,
                     price = ?,
                     category = ?,
                     stock = ?,
                     image = ?
                 WHERE id = ?`,
                [
                    title,
                    description,
                    price,
                    category,
                    stock,
                    imagePath,
                    id,
                ]
            );
        }

        // ========================================
        // Update without Image
        // ========================================

        else {
            await pool.query(
                `UPDATE product_schema
                 SET title = ?,
                     description = ?,
                     price = ?,
                     category = ?,
                     stock = ?
                 WHERE id = ?`,
                [
                    title,
                    description,
                    price,
                    category,
                    stock,
                    id,
                ]
            );
        }

        return NextResponse.json({
            success: true,
            message: "Product updated successfully",
        });

    } catch (error) {
        console.error("Update product error:", error);

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


// ========================================
// DELETE - Delete Product
// ========================================

export async function DELETE(req: Request) {
    try {
        const body = await req.json();

        const { id } = body;

        await pool.query(
            `DELETE FROM product_schema WHERE id = ?`,
            [id]
        );

        return NextResponse.json({
            success: true,
            message: "Product Deleted Successfully",
        });

    } catch (error) {
        console.error("Delete product error:", error);

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