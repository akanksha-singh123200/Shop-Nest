
"use client";
import Image from "next/image";
import { useState } from "react";
import AdminNavbar from "@/components/AdminNavbar";

export default function Orders() {
  const [products, setProducts] = useState<any[]>([]);
  return (

    <>
      <AdminNavbar />
      <div className="ml-64 pt-20 min-h-screen px-6 py-22 md:px-8 md:py-27">
        <div className="mx-auto max-w-7xl" >
         {/* Header */}
          <div className="mb-5">
            <h2 className="text-3xl  md:text-3xl font-bold">
              Orders
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Manage Orders.
            </p>
          </div>

          <div>
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

                            className={`rounded-lg px-4 py-2 text-xs font-semibold transition active:scale-95 ${item.is_trending === 1
                              ? "cursor-not-allowed bg-gray-100 text-gray-400"
                              : "bg-[#E39F7F] text-white hover:bg-[#d98968]"
                              }`}
                          >
                            Add

                          </button>

                          {/* Delete */}
                          <button

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

        </div>

      </div>
    </>

  );
}