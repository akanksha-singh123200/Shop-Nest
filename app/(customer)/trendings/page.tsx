"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Trending() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/trending", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch trending products");
      }

      const data = await response.json();

      if (data.success) {
        // Sirf trending products show karenge
        const trendingProducts = data.products.filter(
          (item: any) => item.is_trending === 1
        );

        setProducts(trendingProducts);
      } else {
        console.error(data.message);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching trending products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // -----------------------------
  // Loading UI
  // -----------------------------
  if (loading) {
    return (
      <section className="min-h-screen bg-[#fff8f3] py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-4 text-center">
            <span className="inline-block rounded-full bg-[#E39F7F]/45 px-5 py-2 font-playfair text-3xl font-medium text-black">
              ✨ TRENDING
            </span>
          </div>

          <h2 className="mb-12 text-center font-playfair text-4xl font-bold md:text-5xl">
            Trending Products
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-107.5 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#fff8f3] py-16">
      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-[#E39F7F]/45 px-5 py-2 font-playfair text-3xl font-medium text-black">
            ✨ TRENDING
          </span>

          <h2 className="font-playfair text-4xl font-bold text-gray-900 md:text-5xl">
            Trending Products
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 md:text-base">
            Discover the products everyone is loving right now.
          </p>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl bg-gray-100 p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image Area */}
                <div className="relative h-64 overflow-hidden rounded-xl bg-white p-4">

                  {/* Trending Badge */}
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-[#E39F7F] px-3 py-1 text-sm font-medium text-white shadow-sm">
                    ↗ Trending
                  </span>

                  {/* Product Image */}
                  <div className="flex h-full items-center justify-center">
                    <Image
                      src={item.image}
                      width={220}
                      height={220}
                      alt={item.title || "Product"}
                      className="h-48 w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div className="pt-4">

                  {/* Title */}
                  <h2 className="line-clamp-2 min-h-14 text-xl font-bold text-gray-900">
                    {item.title}
                  </h2>

                  {/* Rating */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg">
                      ⭐⭐⭐⭐☆
                    </span>

                    <span className="text-sm text-gray-500">
                      No reviews
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-3">
                    <p className="text-xs text-gray-500">
                      Price
                    </p>

                    <p className="text-2xl font-bold text-gray-900">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Buy Now */}
                  <Link
                    href={`/products/${item.id}`}
                    className="mt-4 block w-full rounded-full bg-[#E39F7F] py-3 text-center font-bold text-white transition hover:bg-[#d98968]"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (

          /* Empty State */
          <div className="flex min-h-87.5 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white/60 px-6 text-center">

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E39F7F]/10 text-3xl">
              ✨
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              No Trending Products
            </h3>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              There are currently no trending products available.
            </p>

          </div>
        )}
      </div>
    </section>
  );
}