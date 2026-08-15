"use client";

import { useEffect, useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  const removeItem = async (productID: number) => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: 1,
          productID,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // State se bhi remove kar do
        setWishlist((prev) =>
          prev.filter((item: any) => item.product_id !== productID)
        );

        alert("Removed from Wishlist");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ShowItem = async () => {
    try {
      const response = await fetch("/api/wishlist/products?userID=1");
      const data = await response.json();

      if (data.success) {
        setWishlist(data.wishlist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ShowItem();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Wishlist</h1>

      {wishlist.map((item: any) => (
        <div
          key={item.wishlist_id}
          className="border p-4 mb-4 rounded shadow"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-40 h-40 object-cover"
          />

          <h2 className="font-bold">{item.title}</h2>

          <p>₹ {item.price}</p>

          <button
            onClick={() => removeItem(item.product_id)}
            className="bg-red-500 text-black px-4 py-2 rounded mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}