"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        // Normal login cookies logout
        await fetch("/api/auth/logout", {
            method: "POST",
        });

        // Google / NextAuth session logout
        await signOut({
            redirect: false,
        });

        // Login page par bhejo
        router.push("/login");

        // Navbar ko fresh state do
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="rounded-full  bg-[#E39F7F] px-3 py-2 text-xs font-medium text-white transition  hover:bg-[#d95542] "
        >
            Logout
        </button>
    );
}