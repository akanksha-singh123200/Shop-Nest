"use client";

import { products } from "@/data/products";
import Image from "next/image";

export default function SpecialOffers() {
  // Offer ke liye ek product
  const offerProduct = products[0];

  return (
    <section className="min-h-screen bg-[#fff8f3] py-20 px-4">

      <div className="max-w-7xl mx-auto">

        {/* Small Heading */}
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-[#E39F7F]/45 px-5 py-2 text-sm font-semibold tracking-wide text-black">
            🔥 LIMITED TIME OFFER
          </span>

          <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-4">
            Special Offers
          </h2>

          <p className="text-gray-600 mt-3">
            Grab your favorite products at amazing prices.
          </p>
        </div>

        {/* Offer Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-[#E39F7F]/45 px-6 py-10 md:px-12 md:py-14">

          {/* Decorative Circles */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/30" />
          <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-white/20" />

          <div className="relative z-10 grid md:grid-cols-2 items-center gap-10">

            {/* Left Content */}
            <div className="text-center md:text-left">

              <span className="text-sm font-semibold uppercase tracking-widest text-gray-700">
                Don't Miss Out
              </span>

              <h3 className="font-playfair text-4xl md:text-6xl font-bold leading-tight mt-3">
                Up to
                <br />
                <span className="text-black">40% OFF</span>
              </h3>

              <p className="mt-5 max-w-md mx-auto md:mx-0 text-gray-700 leading-7">
                Discover amazing deals on our most popular products.
                Shop now and save more on your favorite items.
              </p>

              {/* Offer Button */}
              <button className="mt-7 rounded-full bg-black px-7 py-3.5 text-white font-semibold hover:bg-[#F06A55] transition duration-300">
                Shop Offers →
              </button>

            </div>

            {/* Right Product */}
            <div className="relative flex justify-center items-center">

              {/* Discount Circle */}
              <div className="absolute top-0 right-5 md:right-10 z-20 w-24 h-24 rounded-full bg-black text-white flex flex-col items-center justify-center rotate-12 shadow-lg">
                <span className="text-xs">
                  SAVE
                </span>
                <span className="text-xl font-bold">
                  40%
                </span>
              </div>

              {/* Product Background */}
              <div className="relative w-full max-w-md h-80 md:h-96 bg-white/70 rounded-3xl flex items-center justify-center backdrop-blur-sm">

                <Image
                  src={offerProduct.image}
                  width={400}
                  height={400}
                  alt={offerProduct.title}
                  className="object-contain w-72 h-72 md:w-80 md:h-80 drop-shadow-xl"
                />

              </div>

            </div>

          </div>
        </div>

        {/* Bottom Offer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="text-3xl mb-2">🚚</div>
            <h4 className="font-bold">
              Free Shipping
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              On orders above ₹999
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="text-3xl mb-2">💳</div>
            <h4 className="font-bold">
              Easy Payment
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              Safe & secure checkout
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="text-3xl mb-2">🎁</div>
            <h4 className="font-bold">
              Best Deals
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              Amazing offers every day
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}