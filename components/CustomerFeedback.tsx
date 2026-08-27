"use client";

import Image from "next/image";

export default function CustomerFeedback() {
  return (
    <section className="bg-[#fff8f3] py-20 px-4">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">

          <span className="inline-block bg-[#E39F7F]/45 rounded-full px-5 py-2 text-sm font-semibold">
            ❤️ CUSTOMER LOVE
          </span>

          <h2 className="font-playfair text-4xl md:text-5xl font-bold mt-4">
            Customer Experiences
          </h2>

          <p className="text-gray-600 text-lg mt-3">
            What our customers say about us
          </p>

        </div>


        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Image */}
          <div className="flex justify-center">

            <div className="relative">

              <div className="absolute -top-5 -left-5 w-24 h-24 rounded-full bg-[#E39F7F]/30"></div>

              <div className="absolute -bottom-5 -right-5 w-32 h-32 rounded-full bg-[#E39F7F]/20"></div>

              <Image
                src="/HappyClients.jpg"
                width={500}
                height={500}
                alt="Happy Customers"
                className="relative z-10 w-full max-w-md rounded-3xl object-cover shadow-lg"
              />

            </div>

          </div>


          {/* Right Content */}
          <div className="w-full">

            {/* Overall Rating */}
            <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">

              <div className="flex flex-col sm:flex-row sm:items-center gap-6">

                <div className="text-center sm:text-left">

                  <div className="text-5xl font-bold">
                    4.8
                  </div>

                  <div className="text-yellow-400 text-xl mt-1">
                    ★★★★★
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    Based on 245 reviews
                  </p>

                </div>


                {/* Rating Bars */}
                <div className="flex-1">

                  {/* 5 Stars */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 text-sm">5 ★</span>

                    <div className="h-2.5 bg-gray-200 rounded-full flex-1">
                      <div className="h-2.5 bg-yellow-400 rounded-full w-[80%]"></div>
                    </div>

                    <span className="w-10 text-sm text-gray-500">
                      80%
                    </span>
                  </div>


                  {/* 4 Stars */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 text-sm">4 ★</span>

                    <div className="h-2.5 bg-gray-200 rounded-full flex-1">
                      <div className="h-2.5 bg-yellow-400 rounded-full w-[65%]"></div>
                    </div>

                    <span className="w-10 text-sm text-gray-500">
                      65%
                    </span>
                  </div>


                  {/* 3 Stars */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 text-sm">3 ★</span>

                    <div className="h-2.5 bg-gray-200 rounded-full flex-1">
                      <div className="h-2.5 bg-yellow-400 rounded-full w-[35%]"></div>
                    </div>

                    <span className="w-10 text-sm text-gray-500">
                      35%
                    </span>
                  </div>


                  {/* 2 Stars */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 text-sm">2 ★</span>

                    <div className="h-2.5 bg-gray-200 rounded-full flex-1">
                      <div className="h-2.5 bg-yellow-400 rounded-full w-[15%]"></div>
                    </div>

                    <span className="w-10 text-sm text-gray-500">
                      15%
                    </span>
                  </div>


                  {/* 1 Star */}
                  <div className="flex items-center gap-3">
                    <span className="w-10 text-sm">1 ★</span>

                    <div className="h-2.5 bg-gray-200 rounded-full flex-1">
                      <div className="h-2.5 bg-yellow-400 rounded-full w-[5%]"></div>
                    </div>

                    <span className="w-10 text-sm text-gray-500">
                      5%
                    </span>
                  </div>

                </div>

              </div>

            </div>


            {/* Customer Review */}
            <div className="bg-[#E39F7F]/30 rounded-3xl p-6">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl">
                    👩
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Happy Customer
                    </h3>

                    <p className="text-sm text-gray-500">
                      Verified Purchase
                    </p>
                  </div>

                </div>

                <div className="text-yellow-400">
                  ★★★★★
                </div>

              </div>


              <p className="text-gray-700 leading-7 mt-5">
                "Amazing quality and very fast delivery. I really loved
                the product and the overall shopping experience."
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}