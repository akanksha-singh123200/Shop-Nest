import Image from "next/image";
import { products } from "@/data/products";

export default function TrendingProducts() {
  return (
    <section className="min-h-screen bg-[#fff8f3] py-16">

      {/* Trending Badge */}
      <div className="text-center mb-4">
        <h2 className="inline-block text-3xl font-playfair bg-[#E39F7F]/45 rounded-full px-5 py-2 font-medium text-black backdrop-blur-sm">
          ✨ TRENDING
        </h2>
      </div>

      {/* Heading */}
      <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-12">
        Trending Products
      </h2>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {products.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1"
          >

            {/* Product Image Area */}
            <div className="relative bg-white rounded-xl p-4 h-64">

              {/* Trending Badge */}
              <span className="absolute top-3 left-3 z-10 text-sm font-medium bg-[#E39F7F] text-white rounded-full px-3 py-1">
                ↗ Trending
              </span>

              {/* Product Image */}
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

              <h2 className="text-xl font-bold">
                {item.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-lg">
                <span>⭐⭐⭐⭐☆</span>
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
                Buy Now
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}