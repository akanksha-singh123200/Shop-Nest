// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import Products from "@/components/Products";
import Navbar from "@/components/Navbar";
// import LogoutButton from "@/components/LogoutButton";
// import TrendingProducts from "@/components/TrendingProducts";
import SpecialOffers from "@/components/SpecialOffers";
import WhyChooseUs from "@/components/WhyChooseus";
import CustomerFeedback from "@/components/CustomerFeedback";
import Footer from "@/components/Footer";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";
// import Products from "./(customer)/products/page";
import Products from "../products/page";
// import Trending from "./(customer)/trendings/page";
import Trending from "../trendings/page";

export default async function Customer() {
  const cookieStore = await cookies();

  //Session Based
  // const userId =
  //   cookieStore.get("userId")?.value;

  // const useremail =
  //   cookieStore.get("useremail")?.value;

  // if (!userId) {
  //   redirect("/login");
  // }

  // JWT Based 
  // const token =
  //   cookieStore.get("token")?.value;

  // if (!token) {
  //   redirect("/login");
  // }

  // try {
  //   const decoded = jwt.verify(
  //     token,
  //     process.env.JWT_SECRET!
  //   );

  //   console.log(decoded);

  // } catch (error) {
  //   redirect("/login");
  // }


  return (
    <main>
      {/* <h1>
        User ID: {userId}
      </h1>

      <h2>
        User Email: {useremail}
      </h2> */}




     

      {/* Hero Section */}
      <section
        className="relative min-h-screen overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/Banner3.png')" }}
      >
        {/* Bottom Soft Fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-40 bg-linear-to-b from-transparent via-[#fff4ed]/70 to-[#fff8f3]"></div>

        {/* Navbar */}
        <div className="relative z-20">
       
          <Navbar />
        </div>

        {/* Hero Content */}
        <div className="relative  z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 md:px-10">
          <div className="max-w-2xl">

            <span className="inline-block rounded-full bg-white/40 px-4 py-2 text-sm font-medium text-black backdrop-blur-sm">
              ✨ New Collection
            </span>

            <h1 className=" font-playfair text-4xl font-extrabold leading-tight text-black sm:text-5xl md:text-6xl">
              Shop The
              <br />
              Latest Trends
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-black/85 md:text-lg">
              Discover amazing products, stylish collections and
              unbeatable prices — all in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link   href="/products">
              <button className="rounded-full bg-black px-7 py-3.5  text-white transition hover:bg-[#F06A55]">
                Shop Now →
              </button>
              </Link>
              

              <button className="rounded-full border border-black/70 bg-white/10 px-7 py-3.5 font-semibold text-black backdrop-blur-sm transition hover:bg-[#F06A55] hover:text-black">
                Explore Products
              </button>
            </div>

          </div>
        </div>
      </section>


      
      <Products />

      <Trending />

      <SpecialOffers />

      <WhyChooseUs />
           <BackToTop />
      {/* <CustomerFeedback /> */}

      <Footer />




    </main>
  );
}