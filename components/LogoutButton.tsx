"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/login");
  };

  return (
    // <button
    //   onClick={handleLogout}
    //   className="bg-pink-500 text-black px-4 py-2 rounded"
    // >
    //   Logout
    // </button>
    <div></div>
  );
}