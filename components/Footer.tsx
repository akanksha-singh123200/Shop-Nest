import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#fff8f3]">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-4 gap-10">

        {/* Logo Section */}
        <div>
          <Image
            src="/logo.png"
            height={160}
            width={160}
            alt="ShopNest Logo"
          />

          <p className="text-black mt-4 text-sm leading-6">
            ShopNest is your trusted ecommerce platform for
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
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/wishlist">Wishlist</Link>
            <Link href="/AddtoCart">Cart</Link>
            <Link href="/Contact">Contact Us</Link>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-xl text-black font-semibold mb-4">
            Customer Service
          </h2>

          <div className="flex flex-col gap-3 text-black">
            <Link href="/faqs">FAQs</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">
              Terms & Conditions
            </Link>

            <Link href="/shipping-and-delivery">
              Shipping & Delivery
            </Link>

            <Link href="/return-and-refund">
              Return & Refund
            </Link>

            
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold text-black mb-4">
            Follow Us
          </h2>

          <div className="flex gap-4">

            {/* Facebook */}
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
            >
              <Image
                src="/products/FooterImages/facebook.webp"
                height={24}
                width={24}
                alt="Facebook"
              />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-500 transition"
            >
              <Image
                src="/products/FooterImages/instagram.webp"
                height={24}
                width={24}
                alt="Instagram"
              />
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              aria-label="YouTube"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition"
            >
              <Image
                src="/products/FooterImages/youtube.jpg"
                height={24}
                width={24}
                alt="YouTube"
              />
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              aria-label="https://linkedin.com"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-500 transition"
            >
              <Image
                src="/products/FooterImages/linkedin.webp"
                height={24}
                width={24}
                alt="LinkedIn"
              />
            </a>

          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto border-t border-gray-300 py-5 text-center text-black text-sm">
        © 2026 ShopNest. All Rights Reserved.
      </div>
    </footer>
  );
}