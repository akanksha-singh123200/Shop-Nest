// import { NextResponse } from "next/server";
// import pool from "@/lib/db";

// // export async function GET() {
// //     try {
// //         const [user] = await pool.query("Select * from user");
// //         const [products] = await pool.query("Select * from product_schema");
// //         const [cart] = await pool.query("Select * from addtocart")
// //         return NextResponse.json({
// //             success: true,
// //             user, products, cart
// //         });


// //     }
// //     catch (error) {
// //         return NextResponse.json({
// //             success: false,
// //             message: "Something went wrong",
// //         });

// //     }

// // }
// export async function POST(req: Request) {
//     try {
//         const body = await req.json();

//         const { userID, productID, quantity, } = body;

//         console.log("User ID:", userID);
//         console.log("Product ID:", productID);
//         console.log("Quantity:", quantity);


//         const [cart]: any = await pool.query(
//             "SELECT * FROM addtocart WHERE user_id = ? AND product_id = ?",
//             [userID, productID]
//         );
//         console.log(cart);

//          // User Validation
//         const [users]: any = await pool.query(
//             "SELECT * FROM user WHERE id = ?",
//             [userID]
//         );

//         if (users.length === 0) {
//             return NextResponse.json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         // Product Validation
//         const [products]: any = await pool.query(
//             "SELECT * FROM product_schema WHERE id = ?",
//             [productID]
//         );

//         if (products.length === 0) {
//             return NextResponse.json({
//                 success: false,
//                 message: "Product not found",
//             });
//         }

//         // Stock Validation
//         if (quantity > products[0].stock) {
//             return NextResponse.json({
//                 success: false,
//                 message: "Out of Stock",
//             });
//         } else {
//             // return NextResponse.json({
//             //     success: true,
//             //     message: "Stock Available",
//             //     user: users[0],
//             //     product: products[0],
//             // });

//         }




//         if (cart.length === 0) {
//             const [addtocartt]: any = await pool.query(
//                 "INSERT INTO addtocart(user_id, product_id, quantity) VALUES (?, ?, ?)",
//                 [userID, productID, quantity]
//             );
//             return NextResponse.json({
//                 success: true,
//                 message: "Product added to cart"
//             });




//         }
//         else {
//             //frontend ke page per add to cart ka button products wale page per add karna hai aur
//             //phir uske baad add to cart per click karte hi wo addto cart wale page per jaye aur 
//             //chech bhi kare ki wo cart mai hai ya nhi agar nhi ai tho add karega aur agar 
//             //hoga tho usko hi update kar dega 
//             return NextResponse.json({
//                 success: true,
//                 message: "Cart updated"
//             });



//         }

//     } catch (error) {
//         console.error(error);

//         return NextResponse.json({
//             success: false,
//             message: "Something went wrong",
//             error: error instanceof Error ? error.message : "Unknown Error",
//         });
//     }
// }



import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { userID, productID, quantity } = body;

        console.log("User ID:", userID);
        console.log("Product ID:", productID);
        console.log("Quantity:", quantity);

        // ==========================
        // User Validation
        // ==========================
        const [users]: any = await pool.query(
            "SELECT * FROM user WHERE id = ?",
            [userID]
        );

        // if (users.length === 0) {
        //     return NextResponse.json({
        //         success: false,
        //         message: "User not found",
        //     });
        // }

        // ==========================
        // Product Validation
        // ==========================
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

        // ==========================
        // Quantity Validation
        // ==========================
        if (quantity <= 0) {
            return NextResponse.json({
                success: false,
                message: "Invalid Quantity",
            });
        }

        // ==========================
        // Stock Validation
        // ==========================
        if (quantity > products[0].stock) {
            return NextResponse.json({
                success: false,
                message: "Out of Stock",
            });
        }

        // ==========================
        // Cart Validation
        // ==========================
        const [cart]: any = await pool.query(
            "SELECT * FROM addtocart WHERE user_id = ? AND product_id = ?",
            [userID, productID]
        );

        console.log("Cart:", cart);

        // ==========================
        // Insert into Cart
        // ==========================
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

            // const newQuantity=cart[0].quantity+quantity;
            await pool.query(
                "update addtocart set quantity = ? where user_id = ? and product_id = ? ",
                [quantity, userID, productID]
            );
            // UPDATE Query baad me likhenge
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
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export async function GET() {
    try {
        const [cart]: any = await pool.query(
            "SELECT addtocart.id,addtocart.user_id,addtocart.quantity,product_schema.id AS product_id,product_schema.title,product_schema.price,product_schema.image,product_schema.stock FROM addtocart INNER JOIN product_schema ON addtocart.product_id = product_schema.id;"
        );
        return NextResponse.json({
            success: true,
            cart,
        });

    }
    catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        })
    }
}



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

export async function DELETE(req:Request) {
    const body = await req.json();
    const { userID,productID}=body;

    await pool.query(
        "Delete from addtocart where user_id=? and product_id=?",
        [userID,productID]
    );
    return NextResponse.json({
        success: true,
        message: "Product Deleted"
    });
    
}




