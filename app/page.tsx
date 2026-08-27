// import { cookies } from "next/headers";
// import Image from "next/image";
// import Products from "@/components/Products";





// export default function Home() {
//     const cookieStore = await cookies();


//   const loginCookie =
//     cookieStore.get("isLoggedIn");

//   console.log(loginCookie);

//   return (

//     <main>
//       <h1>
//         Cookie Value:
//         {loginCookie?.value}
//       </h1>
//       {/* Hero Section */}
//       <section className="max-w-7xl mx-auto gap-5 md:gap-0 flex flex-col md:flex-row items-center justify-between px-10 py-20">

//         <div>
//           <h1 className="text-5xl font-bold">
//             Shop The Latest Trends
//           </h1>

//           <p className="mt-4 text-gray-600">
//             Discover amazing products at best prices.
//           </p>

//           <button className="mt-6 bg-black text-white px-6 py-3 rounded">
//             Shop Now
//           </button>
//         </div>

//         <div>
//           <img
//             src="/sunlight.png"
//             alt="Hero"
//             className="rounded-3xl"
//           />
//         </div>

//       </section>


//       {/* Category section */}
//       <section className="max-w-7xl space-y-15 mx-auto px-10 py-20">

//         <h2 className="text-5xl text-center font-bold">
//           Categories
//         </h2>

//         <div className="grid text-2xl grid-cols-2 md:grid-cols-4 gap-6">

//           <div className="p-6 hover:bg-amber-500 bg-gray-200 text-center rounded-3xl
//     transition duration-300 hover:-translate-y-2">
//             Shoes
//           </div>

//           <div className="p-6 hover:bg-amber-500 text-center bg-gray-200 rounded-3xl
//     transition duration-300 hover:-translate-y-2">
//             Mobiles
//           </div>

//           <div className="p-6 hover:bg-amber-500 text-center bg-gray-200 rounded-3xl
//     transition duration-300 hover:-translate-y-2">
//             Fashion
//           </div>

//           <div className="p-6 hover:bg-amber-500 text-center bg-gray-200 rounded-3xl
//     transition duration-300 hover:-translate-y-2">
//             Watches
//           </div>

//         </div>

//       </section>



//       <Products />


//       {/* Category section */}
//       <section className="max-w-7xl space-y-15 mx-auto px-10 py-20">

//         <h2 className="text-5xl text-center font-bold">
//           Trending Products
//         </h2>

//         <div className="grid text-2xl grid-cols-2 md:grid-cols-4 gap-6">

//           <div className="p-6 hover:bg-amber-500 bg-gray-200 text-center rounded-3xl
//     transition duration-300 hover:-translate-y-2">
//             Shoes
//           </div>

//           <div className="p-6 hover:bg-amber-500 text-center bg-gray-200 rounded-3xl
//     transition duration-300 hover:-translate-y-2">
//             Mobiles
//           </div>

//           <div className="p-6 hover:bg-amber-500 text-center bg-gray-200 rounded-3xl
//     transition duration-300 hover:-translate-y-2">
//             Fashion
//           </div>

//           <div className="p-6 hover:bg-amber-500 text-center bg-gray-200 rounded-3xl
//     transition duration-300 hover:-translate-y-2">
//             Watches
//           </div>

//         </div>

//       </section>


//        <Products />














//     </main>
//   );
// }

// 'use client';
// import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import Products from "@/components/Products";
import Navbar from "@/components/Navbar";
import LogoutButton from "@/components/LogoutButton";
// import TrendingProducts from "@/components/TrendingProducts";
import SpecialOffers from "@/components/SpecialOffers";
import WhyChooseUs from "@/components/WhyChooseus";
import CustomerFeedback from "@/components/CustomerFeedback";
import Footer from "@/components/Footer";
import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import Products from "./(customer)/products/page";
import Trending from "./(customer)/trendings/page";


export default async function Home() {
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




      <LogoutButton />

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