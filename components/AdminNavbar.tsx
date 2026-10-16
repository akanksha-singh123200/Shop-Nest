"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  LayoutDashboard,
  Package,
  Tags,
  Users,
  ShoppingCart,
  Star,
  BarChart3,
  Settings,
  Bell,
  UserCircle,
  TrendingUp,
  MessageSquareText,
  LogOut,
} from "lucide-react";

export default function AdminNavbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Admin Logout
  const handleLogout = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.replace("/admin/auth/login");
        router.refresh();
      } else {
        alert(data.message || "Logout failed.");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Top Horizontal Navbar */}
      <header className="fixed left-0 right-0 top-0 z-40 h-20 bg-white shadow-sm">
        <div className="ml-64 flex h-full items-center justify-between px-8">
          {/* Page Title */}
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Manage your ShopNest store
            </p>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {/* Notification */}
            <button
              type="button"
              aria-label="Notifications"
              className="relative rounded-full p-2.5 text-gray-600 transition hover:bg-[#fff8f3] hover:text-[#F06A55]"
            >
              <Bell size={21} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#F06A55]" />
            </button>

            {/* Admin Profile */}
            <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
              <UserCircle size={36} className="text-[#F06A55]" />

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Admin
                </p>
                <p className="text-xs text-gray-500">
                  Administrator
                </p>
              </div>
            </div>

            {/* Greeting and Logout */}
            <div className="flex items-center gap-3">
              <span className="whitespace-nowrap text-xs font-medium text-[#F06A55]">
                Hiii, Admin 👋
              </span>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg border border-[#F06A55] px-3 py-2 text-sm font-medium text-[#F06A55] transition hover:bg-[#F06A55] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LogOut size={16} />
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <aside className="fixed bottom-0 left-0 top-0 z-50 flex w-64 flex-col bg-[#FFF8F3] px-5 py-6 shadow-md">
        {/* Logo */}
        <div className="mb-8 flex justify-start">
          <Image
            src="/logo.png"
            height={100}
            width={170}
            alt="ShopNest Logo"
            priority
          />
        </div>

        {/* Main Menu */}
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Main Menu
        </p>

        <nav className="flex flex-col gap-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg bg-[#F06A55] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/products"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
          >
            <Package size={20} />
            <span>Products</span>
          </Link>

          <Link
            href="/admin/categories"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
          >
            <Tags size={20} />
            <span>Categories</span>
          </Link>

          <Link
            href="/admin/users"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
          >
            <Users size={20} />
            <span>Users</span>
          </Link>

          <Link
            href="/admin/orders"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
          >
            <ShoppingCart size={20} />
            <span>Orders</span>
          </Link>

          <Link
            href="/admin/trendings"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
          >
            <TrendingUp size={20} />
            <span>Trending</span>
          </Link>

          <Link
            href="/admin/reviews"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
          >
            <Star size={20} />
            <span>Reviews</span>
          </Link>

          <Link
            href="/admin/reports"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
          >
            <BarChart3 size={20} />
            <span>Reports</span>
          </Link>

          <Link
            href="/admin/feedback"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
          >
            <MessageSquareText size={20} />
            <span>Feedback</span>
          </Link>
        </nav>

        {/* Bottom Menu */}
        <div className="mt-auto border-t border-gray-200 pt-4">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </div>
      </aside>
    </>
  );
}