import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Products from "@/components/Products";
import LogoutButton from "@/components/LogoutButton";

export default async function Customer() {
  // const cookieStore = await cookies();

  // const token = cookieStore.get("token")?.value;

  // if (!token) {
  //   redirect("/login");
  // }

  // try {
  //   jwt.verify(token, process.env.JWT_SECRET!);
  // } catch {
  //   redirect("/login");
  // }

  return (
    <main>
      <LogoutButton />

      <section className="max-w-7xl mx-auto gap-5 md:gap-0 flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div>
          <h1 className="text-5xl font-bold">
            Shop The Latest Trends
          </h1>

          <p className="mt-4 text-gray-600">
            Discover amazing products at best prices.
          </p>

          <button className="mt-6 bg-black text-white px-6 py-3 rounded">
            Shop Now
          </button>
        </div>

        <div>
          <img
            src="/sunlight.png"
            alt="Hero"
            className="rounded-3xl"
          />
        </div>
      </section>

      <Products />
    </main>
  );
}