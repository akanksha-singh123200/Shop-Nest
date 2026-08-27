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
  <div className="min-h-screen bg-[#fff8f3] items-center flex py-10">
    <div className="max-w-7xl mx-auto px-6">

      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        My Wishlist ❤️
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {wishlist.map((item: any) => (

          <div
            key={item.wishlist_id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
          >

            <div className="w-full h-52 bg-gray-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5">

              <h2 className="font-semibold text-lg text-gray-800 truncate">
                {item.title}
              </h2>

              <p className="text-xl font-bold text-[#F06A55] mt-2">
                ₹ {item.price}
              </p>

              <button
                onClick={() => removeItem(item.product_id)}
                className="w-full bg-[#E39F7F] text-white px-4 py-2.5 rounded-lg mt-4 hover:bg-red-600 transition"
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  </div>
);
}