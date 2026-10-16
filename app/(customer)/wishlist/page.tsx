
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  // ============================================
  // REMOVE PRODUCT FROM WISHLIST
  // ============================================

  const removeItem = async (productID: number) => {
    try {
      const response = await fetch("/api/wishlist/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productID,
        }),
      });

      const data = await response.json();

      if (data.success) {
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

  // ============================================
  // SHOW CURRENT USER'S WISHLIST
  // ============================================

  const ShowItem = async () => {
    try {
      const response = await fetch("/api/wishlist/products");

      const data = await response.json();

      if (data.success) {
        setWishlist(data.wishlist);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ShowItem();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff8f3] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-[#F06A55] mb-2">
            Your favourites
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                My Wishlist <span>❤️</span>
              </h1>

              <p className="text-gray-500 mt-2">
                Products you love and want to keep for later.
              </p>
            </div>

            <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-[#f3ddd4]">
              <span className="text-gray-500 text-sm">
                Items
              </span>

              <span className="ml-2 font-bold text-[#F06A55]">
                {wishlist.length}
              </span>
            </div>
          </div>
        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-[#f3ddd4] py-20 px-6 text-center">

            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-5">
              ♡
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Your wishlist is empty
            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              You haven't added anything to your wishlist yet.
              Start exploring and save your favourite products here.
            </p>

            <Link
              href="/products"
              className="inline-block mt-7 bg-[#F06A55] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#df5b47] transition"
            >
              Explore Products
            </Link>
          </div>
        ) : (

          /* Wishlist Products */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

            {wishlist.map((item: any) => (

              <div
                key={item.wishlist_id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#f3ddd4] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* Product Image */}
                <div className="relative h-60 overflow-hidden flex items-center justify-center">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Wishlist Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-xl">
                      ❤️
                    </span>
                  </div>

                </div>

                {/* Product Details */}
                <div className="p-5">

                  <h2
                    className="font-semibold text-lg text-gray-800 truncate"
                    title={item.title}
                  >
                    {item.title}
                  </h2>

                  <div className="flex items-center justify-between mt-3">

                    <p className="text-xl font-bold text-[#F06A55]">
                      ₹ {item.price}
                    </p>

                    <span className="text-xs bg-[#fff0eb] text-[#F06A55] px-3 py-1 rounded-full">
                      Wishlist
                    </span>

                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product_id)}
                    className="w-full mt-5 border border-red-200 text-red-500 py-2.5 rounded-xl font-medium hover:bg-red-500 hover:text-white transition-all duration-200"
                  >
                    Remove from Wishlist
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}