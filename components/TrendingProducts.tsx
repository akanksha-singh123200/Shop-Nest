import Image from "next/image";
import { products } from "@/data/products";

export default function Products() {
  return (
    <section className="min-h-screen">

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Trending Products
      </h2>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {products.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 rounded-xl p-4 shadow-sm hover:shadow-lg transition duration-300"
          >

            {/* Product Image */}
            <div className="bg-white rounded-lg flex justify-center items-center p-4">
              <Image
                src={item.image}
                width={200}
                height={200}
                alt={item.title}
                className="object-contain h-48 w-full"
              />
            </div>

            {/* Product Details */}
            <h2 className="text-xl font-bold mt-4">
              {item.title}
            </h2>
            <div className="text-lg gap-5 flex mt-2">
              ⭐⭐⭐⭐☆  <div>No reviews</div>
            </div>



            <p className="text-lg font-semibold text-gray-700 mt-2">
              ₹{item.price}
            </p>


            <button className="p-3 w-full rounded-full bg-amber-600 font-bold">
              Add to cart
            </button>


            


            

          </div>
        ))}

      </div>

    </section>
  );
}