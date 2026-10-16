
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// =====================================================
// POST - ADD TO CART
// =====================================================

export async function POST(req: Request) {

    try {

        const body = await req.json();

        const { productID, quantity } = body;

        console.log("Product ID:", productID);
        console.log("Quantity:", quantity);

        // =====================================================
        // USER SESSION CHECK
        // =====================================================

        let userID = null;

        // Google Login
        const session = await getServerSession(authOptions);

        if (session?.user?.email) {

            const [users]: any = await pool.query(
                "SELECT id FROM user WHERE email = ?",
                [session.user.email]
            );

            if (users.length > 0) {
                userID = users[0].id;
            }
        }

        // Normal Login
        if (!userID) {

            const cookieStore = await cookies();

            const token = cookieStore.get("token")?.value;

            if (token) {

                try {

                    const decoded: any = jwt.verify(
                        token,
                        process.env.JWT_SECRET!
                    );

                    userID = decoded.id;

                } catch (error) {

                    console.log("Invalid token");
                }
            }
        }

        // =====================================================
        // USER NOT LOGGED IN
        // =====================================================

        if (!userID) {

            return NextResponse.json(
                {
                    success: false,
                    loggedIn: false,
                    message: "Please login first"
                },
                {
                    status: 401
                }
            );
        }

        // =====================================================
        // PRODUCT VALIDATION
        // =====================================================

        const [products]: any = await pool.query(
            "SELECT * FROM product_schema WHERE id = ?",
            [productID]
        );

        if (products.length === 0) {

            return NextResponse.json({
                success: false,
                message: "Product not found",
            });
        }

        // =====================================================
        // QUANTITY VALIDATION
        // =====================================================

        if (quantity <= 0) {

            return NextResponse.json({
                success: false,
                message: "Invalid Quantity",
            });
        }

        // =====================================================
        // STOCK VALIDATION
        // =====================================================

        if (quantity > products[0].stock) {

            return NextResponse.json({
                success: false,
                message: "Out of Stock",
            });
        }

        // =====================================================
        // CART VALIDATION
        // =====================================================

        const [cart]: any = await pool.query(
            "SELECT * FROM addtocart WHERE user_id = ? AND product_id = ?",
            [userID, productID]
        );

        console.log("Cart:", cart);

        // =====================================================
        // INSERT INTO CART
        // =====================================================

        if (cart.length === 0) {

            await pool.query(
                "INSERT INTO addtocart (user_id, product_id, quantity) VALUES (?, ?, ?)",
                [userID, productID, quantity]
            );

            return NextResponse.json({
                success: true,
                message: "Product added to cart",
            });

        } else {

            // =====================================================
            // UPDATE EXISTING CART PRODUCT
            // =====================================================

            await pool.query(
                "UPDATE addtocart SET quantity = ? WHERE user_id = ? AND product_id = ?",
                [quantity, userID, productID]
            );

            return NextResponse.json({
                success: true,
                message: "Cart updated successfully",
            });
        }

    } catch (error) {

        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Something went wrong",
            error: error instanceof Error
                ? error.message
                : "Unknown Error",
        });
    }
}


// =====================================================
// GET - CURRENT USER CART
// =====================================================

export async function GET() {

    try {

        // =====================================================
        // USER SESSION CHECK
        // =====================================================

        let userID = null;

        // Google Login
        const session = await getServerSession(authOptions);

        if (session?.user?.email) {

            const [users]: any = await pool.query(
                "SELECT id FROM user WHERE email = ?",
                [session.user.email]
            );

            if (users.length > 0) {
                userID = users[0].id;
            }
        }

        // Normal Login
        if (!userID) {

            const cookieStore = await cookies();

            const token = cookieStore.get("token")?.value;

            if (token) {

                try {

                    const decoded: any = jwt.verify(
                        token,
                        process.env.JWT_SECRET!
                    );

                    userID = decoded.id;

                } catch (error) {

                    console.log("Invalid token");
                }
            }
        }

        // =====================================================
        // USER NOT LOGGED IN
        // =====================================================

        if (!userID) {

            return NextResponse.json({
                success: false,
                loggedIn: false,
                cart: [],
                message: "Please login first"
            });
        }

        // =====================================================
        // GET ONLY CURRENT USER CART
        // =====================================================

        const [cart]: any = await pool.query(
            `
            SELECT
                addtocart.id,
                addtocart.user_id,
                addtocart.quantity,
                product_schema.id AS product_id,
                product_schema.title,
                product_schema.price,
                product_schema.image,
                product_schema.stock
            FROM addtocart
            INNER JOIN product_schema
                ON addtocart.product_id = product_schema.id
            WHERE addtocart.user_id = ?
            `,
            [userID]
        );

        return NextResponse.json({
            success: true,
            loggedIn: true,
            cart,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        });
    }
}


// =====================================================
// PUT - UPDATE QUANTITY
// =====================================================

export async function PUT(req: Request) {

    const body = await req.json();

    const { userID, productID, quantity } = body;

    await pool.query(
        `UPDATE addtocart
         SET quantity = ?
         WHERE user_id = ?
         AND product_id = ?`,
        [quantity, userID, productID]
    );

    return NextResponse.json({
        success: true,
        message: "Quantity Updated"
    });
}


// =====================================================
// DELETE - DELETE PRODUCT
// =====================================================

export async function DELETE(req: Request) {

    const body = await req.json();

    const { userID, productID } = body;

    await pool.query(
        "DELETE FROM addtocart WHERE user_id=? AND product_id=?",
        [userID, productID]
    );

    return NextResponse.json({
        success: true,
        message: "Product Deleted"
    });
}
