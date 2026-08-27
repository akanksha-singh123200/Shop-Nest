import Image from "next/image";
import { products } from "@/data/products";

export default function Products() {
  return (
    <section className="min-h-screen bg-[#fff8f3] py-16">

      {/* Heading */}
      <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-12">
        Featured Products
      </h2>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {products.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1"
          >

            {/* Product Image */}
            <div className="relative bg-white rounded-xl h-64 p-4">

              {/* Wishlist */}
              <button
                className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-[#E39F7F] hover:text-white transition"
                title="Add to Wishlist"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-0.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>

              {/* Image */}
              <div className="flex items-center justify-center h-full">
                <Image
                  src={item.image}
                  width={220}
                  height={220}
                  alt={item.title}
                  className="object-contain h-48 w-full"
                />
              </div>

            </div>

            {/* Product Details */}
            <div className="pt-4">

              {/* Product Title */}
              <h2 className="text-xl font-bold">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-2 leading-5">
                Stylish, lightweight, and comfortable sneakers perfect for everyday wear.
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-lg">
                  ⭐⭐⭐⭐☆
                </span>

                <span className="text-sm text-gray-500">
                  No reviews
                </span>
              </div>

              {/* Price */}
              <p className="text-xl font-bold text-gray-800 mt-3">
                ₹{item.price}
              </p>

              {/* Add To Cart */}
              <button className="w-full mt-4 py-3 rounded-full bg-[#E39F7F] text-white font-bold hover:bg-[#d98968] transition">
                Add to Cart
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}