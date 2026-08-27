"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AddtoCart() {
  const [cart, setcart] = useState<any[]>([]);

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/AddtoCart");
      const data = await response.json();

      setcart(data.cart || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const grandTotal = cart.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  const removeitem = async (productID: number) => {
    try {
      await fetch("/api/AddtoCart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: 1,
          productID,
        }),
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = async (item: any) => {
    try {
      await fetch("/api/AddtoCart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: item.user_id,
          productID: item.product_id,
          quantity: item.quantity + 1,
        }),
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async (item: any) => {
    // Quantity 1 se neeche nahi jayegi
    if (item.quantity <= 1) {
      return;
    }

    try {
      await fetch("/api/AddtoCart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: item.user_id,
          productID: item.product_id,
          quantity: item.quantity - 1,
        }),
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen  bg-gray-50 py-30">
      <div className="mx-auto items-center max-w-6xl px-4">

        <h1 className="mb-8 text-3xl font-bold">
          My Cart
        </h1>

        {cart.length === 0 ? (
          <div className="rounded-lg bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Add some products to your cart.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">

              {cart.map((item: any) => (
                <div
                  key={item.id}
                  className="flex gap-5 rounded-lg bg-white p-5 shadow"
                >

                  {/* Product Image */}
                  <div className="relative h-32 w-32 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title || "Product"}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-1 flex-col justify-between">

                    <div>
                      <h2 className="text-xl font-semibold">
                        {item.title}
                      </h2>

                      <p className="mt-1 text-gray-600">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">

                      {/* Quantity */}
                      <div className="flex items-center gap-3">

                        <button
                          onClick={() => decreaseQuantity(item)}
                          disabled={item.quantity <= 1}
                          className="flex h-8 w-8 items-center justify-center rounded border text-lg hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          -
                        </button>

                        <span className="min-w-6 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item)}
                          className="flex h-8 w-8 items-center justify-center rounded border text-lg hover:bg-gray-100"
                        >
                          +
                        </button>

                      </div>

                      {/* Subtotal */}
                      <p className="font-semibold">
                        ₹{item.price * item.quantity}
                      </p>

                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeitem(item.product_id)}
                      className="mt-3 w-fit text-sm text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              ))}

            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-lg bg-white p-6 shadow">

              <h2 className="mb-5 text-xl font-bold">
                Order Summary
              </h2>

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-600">
                  Items
                </span>

                <span>
                  {cart.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="font-semibold">
                  Grand Total
                </span>

                <span className="text-xl font-bold">
                  ₹{grandTotal}
                </span>
              </div>

              <button
                className="mt-6 w-full rounded-md bg-black py-3 text-white transition hover:bg-gray-800"
              >
                Proceed to Checkout
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}