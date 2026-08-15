'use client';
import { useState, useEffect } from "react";
import Image from "next/image";

export default function AddtoCart() {
    const [cart, setcart] = useState([]);


    const grandTotal = cart.reduce(
        (total, item: any) => total + item.price * item.quantity,
        0
    );

    const removeitem = async (productID: any) => {
        await fetch("/api/AddtoCart", {
            method: "DELETE",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify({
                userID: 1,
                productID,
            }),
        });
        fetchCart();
    }
    const increaseQuantity = async (item: any) => {
        await fetch("/api/AddtoCart", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID: item.user_id,
                productID: item.product_id,
                quantity: item.quantity + 1
            }),
        });
        fetchCart();

    }


    const decreaseQuantity = async (item: any) => {
        await fetch("/api/AddtoCart", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID: item.user_id,
                productID: item.product_id,
                quantity: item.quantity - 1
            }),
        });
        fetchCart();

    }

    const fetchCart = async () => {

        const response = await fetch("/api/AddtoCart");

        const data = await response.json();

        setcart(data.cart);

    };
    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <div>
            <p>GrandTotal: {grandTotal} </p>
            {
                cart.map((item: any) => (
                    <div key={item.id} className="border p-4 mb-4">

                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-40 h-40"
                        />

                        <h2>{item.title}</h2>

                        <p>Price: ₹{item.price}</p>

                        <button onClick={() => decreaseQuantity(item)}>-</button>

                        <p>Quantity: {item.quantity}</p>

                        <button onClick={() => increaseQuantity(item)}>+</button><br />
                        <button onClick={() => removeitem(item.product_id)}>Remove</button>
                        <p>Subtotal:{item.price * item.quantity}</p>



                    </div>
                ))
            }
        </div>



    )

}