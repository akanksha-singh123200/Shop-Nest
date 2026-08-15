"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function CustomerFeedback() {

  return (
    <div className="min-h-screen">
      <h2 className="  text-4xl md:text-5xl font-bold text-center mb-7">
        Customer Experiences
      </h2>
      <div className="text-center text-2xl">
        <p>What our customers say about us</p>
      </div>

      <div className="flex max-w-7xl mx-auto mt-12">
        <div className="grid grid-cols-2 items-center gap-5 w-full">

          {/* Image */}
          <div>
            <Image
              src="/HappyClients.jpg"
              width={400}
              height={400}
              alt="HappyClients"
              className="object-contain  "
            />
          </div>

          {/* Ratings */}
          <div className="w-full max-w-md">

            <h3 className="text-xl font-semibold mb-5">
              Customer Ratings
            </h3>

            {/* 5 Stars */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12">5 ⭐</span>

              <div className="h-3 bg-gray-200 rounded-full flex-1">
                <div className="h-3 bg-yellow-400 rounded-full w-[80%]"></div>
              </div>

              <span className="text-sm text-gray-500">80%</span>
            </div>

            {/* 4 Stars */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12">4 ⭐</span>

              <div className="h-3 bg-gray-200 rounded-full flex-1">
                <div className="h-3 bg-yellow-400 rounded-full w-[65%]"></div>
              </div>

              <span className="text-sm text-gray-500">65%</span>
            </div>

            {/* 3 Stars */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12">3 ⭐</span>

              <div className="h-3 bg-gray-200 rounded-full flex-1">
                <div className="h-3 bg-yellow-400 rounded-full w-[35%]"></div>
              </div>

              <span className="text-sm text-gray-500">35%</span>
            </div>

            {/* 2 Stars */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-12">2 ⭐</span>

              <div className="h-3 bg-gray-200 rounded-full flex-1">
                <div className="h-3 bg-yellow-400 rounded-full w-[15%]"></div>
              </div>

              <span className="text-sm text-gray-500">15%</span>
            </div>

            {/* 1 Star */}
            <div className="flex items-center gap-3">
              <span className="w-12">1 ⭐</span>

              <div className="h-3 bg-gray-200 rounded-full flex-1">
                <div className="h-3 bg-yellow-400 rounded-full w-[5%]"></div>
              </div>

              <span className="text-sm text-gray-500">5%</span>
            </div>

          </div>

        </div>
      </div>


    </div>
  );
}