"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  productId: number;
  stock: number;
};

export default function ProductActions({ productId, stock }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const buyNowClick = async () => {
    if (stock <= 0 || loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/checkout?product_id=${productId}`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await response.json();

      // User is not logged in
      if (response.status === 401 || data.loggedIn === false) {
        router.push("/login");
        return;
      }

      // Other errors
      if (!response.ok || data.success === false) {
        alert(data.message || "Unable to proceed to checkout.");
        return;
      }

      // Navigate to checkout
      router.push(`/checkout?product_id=${productId}`);
    } catch (error) {
      console.error("Buy Now Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7 flex flex-col gap-4 sm:flex-row">
      <button
        type="button"
        onClick={buyNowClick}
        disabled={stock <= 0 || loading}
        className="flex-1 rounded-xl bg-[#F06A55] px-6 py-3.5 font-semibold text-white transition hover:bg-[#d95c4a] disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {loading
          ? "Please wait..."
          : stock <= 0
            ? "Out of Stock"
            : "Buy Now"}
      </button>

      <button
        type="button"
        disabled
        className="flex-1 cursor-not-allowed rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-400"
        title="Add to Cart functionality is not connected yet"
      >
        Add to Cart
      </button>
    </div>
  );
}