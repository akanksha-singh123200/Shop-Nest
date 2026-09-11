
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AdminNavbar from "@/components/AdminNavbar";

export default function Trending() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState<number | null>(null);


  const DeleteProductFormTrending = async (product: any) => {
    try {
      const confirmDelete = confirm(
        `Are you sure you want to remove "${product.title}" from trending?`
      );

      if (!confirmDelete) return;

      const response = await fetch("/api/admin/trending", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: product.trending_id,
        }),
      });

      const data = await response.json();

      alert(data.message);

      if (data.success) {
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting trending product:", error);
      alert("Something went wrong");
    }
  };






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
      <>
        <AdminNavbar />

        <section className="ml-64 min-h-screen bg-[#fff8f3] px-6 py-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-4xl font-bold text-gray-900">
              Trending Products
            </h2>

            <p className="mt-3 text-center text-gray-500">
              Loading products...
            </p>

            <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="h-16 animate-pulse bg-gray-100" />

              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-20 animate-pulse border-t border-gray-100 bg-white"
                />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <section className="ml-64 min-h-screen px-6 py-22 md:px-8 md:py-27">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="mb-5">
            <h2 className="text-3xl  md:text-3xl font-bold">
              Trendings
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Manage products that are currently trending.
            </p>
          </div>

          {/* Products Table */}
          {products.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              {/* Table Responsive Wrapper */}
              <div className="overflow-x-auto">

                <table className="w-full min-w-225 border-collapse">

                  {/* Table Header */}
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Product
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Price
                      </th>

                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Display Order
                      </th>

                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Actions
                      </th>

                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-gray-100">

                    {products.map((item, index) => (
                      <tr
                        key={item.id}
                        className="transition hover:bg-gray-50"
                      >

                        {/* Product */}
                        <td className="px-6 py-4">

                          <div className="flex items-center gap-4">

                            {/* Image */}
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f8f8f8]">

                              <Image
                                src={item.image}
                                width={80}
                                height={80}
                                alt={item.title}
                                className="h-full w-full object-contain p-2"
                              />

                            </div>

                            {/* Name */}
                            <div>
                              <h3 className="max-w-xs truncate text-sm font-semibold text-gray-900">
                                {item.title}
                              </h3>

                              <p className="mt-1 text-xs text-gray-400">
                                Product ID: #{item.id}
                              </p>
                            </div>

                          </div>

                        </td>

                        {/* Price */}
                        <td className="px-6 py-4">

                          <span className="text-base font-bold text-gray-900">
                            ₹{item.price}
                          </span>

                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 text-center">

                          {item.is_trending === 1 ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-600">
                              <span>↗</span>
                              Trending
                            </span>
                          ) : (
                            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500">
                              Not Trending
                            </span>
                          )}

                        </td>

                        {/* Display Order */}
                        <td className="px-6 py-4 text-center">

                          {item.is_trending === 1 ? (
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#E39F7F]/10 text-sm font-bold text-[#d98968]">
                              {item.display_order || index + 1}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">
                              —
                            </span>
                          )}

                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">

                          <div className="flex items-center justify-center gap-2">

                            {/* Add To Trending */}
                            <button
                              onClick={() =>
                                InsertProductForTrending(item)
                              }
                              disabled={
                                item.is_trending === 1 ||
                                adding === item.id
                              }
                              className={`rounded-lg px-4 py-2 text-xs font-semibold transition active:scale-95 ${item.is_trending === 1
                                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                                  : "bg-[#E39F7F] text-white hover:bg-[#d98968]"
                                }`}
                            >
                              {adding === item.id
                                ? "Adding..."
                                : item.is_trending === 1
                                  ? "✓ Trending"
                                  : "+ Add"}
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => DeleteProductFormTrending(item)}
                              className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-500 hover:text-white active:scale-95"
                            >
                              Delete
                            </button>

                           

                          </div>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>
            </div>
          ) : (

            /* Empty State */
            <div className="flex min-h-87.5 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 text-center">

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
    </>
  );
}

