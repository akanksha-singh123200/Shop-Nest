import Image from "next/image";
import {
//   FacebookIcon,
//   Instagram,
//  Youtube,
//   Linkedin,
} from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-[#fff8f3]">
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-4 gap-10">

        {/* Logo Section */}
        <div>
          <Image
            src="/logo4.png"
            height={160}
            width={160}
            alt="logo"
          />

          <p className="text-black mt-4 text-sm leading-6">
            Shop Nest is your trusted ecommerce platform for
            shopping quality products with fast delivery and
            secure payments.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl text-black font-semibold mb-4">
            Quick Links
          </h2>

          <div className="flex flex-col gap-3 text-black">
            <a href="#">Home</a>
            <a href="#">Products</a>
            <a href="#">Categories</a>
            <a href="#">Cart</a>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-xl text-black font-semibold mb-4">
            Customer Service
          </h2>

          <div className="flex flex-col gap-3 text-black">
            <a href="#">Contact Us</a>
            <a href="#">FAQs</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold text-black mb-4">
            Follow Us
          </h2>

          {/* <div className="flex gap-4">

            <a
              href="#"
              className="bg-white/10 p-3 rounded-full hover:bg-blue-600 transition"
            >
              <FacebookIcon size={20} />
            </a>

            <a
              href="#"
              className="bg-white/10 p-3 rounded-full hover:bg-pink-600 transition"
            >
              <Instagram size={20} />
            </a>

            <a
              href="#"
              className="bg-white/10 p-3 rounded-full hover:bg-red-600 transition"
            >
              <Youtube size={20} />
            </a>

            <a
              href="#"
              className="bg-white/10 p-3 rounded-full hover:bg-blue-500 transition"
            >
              <Linkedin size={20} />
            </a>

          </div> */}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className=" max-w-7xl mx-auto border-t border-gray-800 py-5 text-center text-black text-sm">
        © 2026 QuickCart. All Rights Reserved.
      </div>
    </footer>
  );
}