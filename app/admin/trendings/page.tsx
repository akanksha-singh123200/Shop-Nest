"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Trending() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState<number | null>(null);

  // --------------------------------
  // Add Product To Trending
  // --------------------------------
  const InsertProductForTrending = async (product: any) => {
    try {
      setAdding(product.id);

      // Agar already trending hai
      if (product.is_trending === 1) {
        alert("This product is already trending.");
        return;
      }

      // Display order calculate karna
      const trendingProducts = products.filter(
        (item) => item.is_trending === 1
      );

      const display_order = trendingProducts.length + 1;

      const response = await fetch("/api/admin/trending", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.id,
          is_trending: 1,
          display_order: display_order,
        }),
      });

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        // Products dobara fetch karenge
        fetchProducts();
      }
    } catch (error) {
      console.error("Error adding product to trending:", error);
      alert("Something went wrong");
    } finally {
      setAdding(null);
    }
  };

  // --------------------------------
  // Fetch All Products
  // --------------------------------
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/trending", {
        method: "GET",
      });

      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      } else {
        console.error(data.message);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --------------------------------
  // Loading UI
  // --------------------------------
  if (loading) {
    return (
      <section className="min-h-screen bg-[#fff8f3] px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-playfair text-4xl font-bold text-gray-900 md:text-5xl">
            Trending Products
          </h2>

          <p className="mt-4 text-center text-gray-500">
            Loading products...
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-130 animate-pulse rounded-3xl bg-white shadow-sm"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#fff8f3] px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-3 inline-block rounded-full bg-[#E39F7F]/10 px-4 py-1.5 text-sm font-medium text-[#d98968]">
            ✨ Our Collection
          </span>

          <h2 className="font-playfair text-4xl font-bold text-gray-900 md:text-5xl">
            Trending Products
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 md:text-base">
            Manage your trending products and choose which products should
            appear in the trending collection.
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {/* Image Section */}
                <div className="relative m-3 h-64 overflow-hidden rounded-2xl bg-[#f8f8f8]">

                  {/* Trending Badge */}
                  {item.is_trending === 1 && (
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-[#E39F7F] px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                      ↗ Trending
                    </span>
                  )}

                  {/* Image */}
                  <div className="flex h-full items-center justify-center p-6">
                    <Image
                      src={item.image}
                      width={250}
                      height={250}
                      alt={item.title}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div className="px-5 pb-5 pt-2">

                  {/* Product Title */}
                  <h3 className="min-h-14 line-clamp-2 text-lg font-bold leading-7 text-gray-900">
                    {item.title}
                  </h3>

                  {/* Rating */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm tracking-wide">
                      ⭐⭐⭐⭐☆
                    </span>

                    <span className="text-xs text-gray-400">
                      No reviews
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400">
                        Price
                      </p>

                      <p className="text-2xl font-bold text-gray-900">
                        ₹{item.price}
                      </p>
                    </div>

                    {item.is_trending === 1 && (
                      <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 space-y-2.5">

                    {/* Add To Trending */}
                    <button
                      onClick={() => InsertProductForTrending(item)}
                      disabled={
                        item.is_trending === 1 || adding === item.id
                      }
                      className={`w-full rounded-xl py-2.5 text-sm font-semibold transition active:scale-[0.98] ${
                        item.is_trending === 1
                          ? "cursor-not-allowed bg-gray-200 text-gray-500"
                          : "bg-[#E39F7F] text-white hover:bg-[#d98968] hover:shadow-md"
                      }`}
                    >
                      {adding === item.id
                        ? "Adding..."
                        : item.is_trending === 1
                        ? "✓ Already Trending"
                        : "+ Add to Trending"}
                    </button>

                    {/* Delete + Update */}
                    <div className="grid grid-cols-2 gap-2.5">

                      <button
                        className="rounded-xl border border-red-200 bg-red-50 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white active:scale-[0.98]"
                      >
                        Delete
                      </button>

                      <button
                        className="rounded-xl border border-blue-200 bg-blue-50 py-2.5 text-sm font-semibold text-blue-500 transition hover:bg-blue-500 hover:text-white active:scale-[0.98]"
                      >
                        Update
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (

          /* Empty State */
          <div className="flex min-h-87.5 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white/60 px-6 text-center">

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E39F7F]/10 text-3xl">
              🛍️
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              No Products Found
            </h3>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              There are currently no products in your product collection.
            </p>

          </div>
        )}
      </div>
    </section>
  );
}