import Image from "next/image";
import Link from "next/link";

import {
    LayoutDashboard,
    Package,
    Tags,
    Users,
    ShoppingCart,
    Star,
    BarChart3,
    Settings,
    LogOut,
    Bell,
    UserCircle,
    TrendingUp,
} from "lucide-react";

export default function AdminNavbar() {
    return (
        <>
            {/* ================= TOP HORIZONTAL NAVBAR ================= */}
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
                            className="relative rounded-full p-2.5 text-gray-600 transition hover:bg-[#fff8f3] hover:text-[#F06A55]"
                        >
                            <Bell size={21} />

                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#F06A55]" />
                        </button>


                        {/* Admin Profile */}
                        <div className="flex items-center gap-3 border-l border-gray-200 pl-6">

                            <UserCircle
                                size={36}
                                className="text-[#F06A55]"
                            />

                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    Admin
                                </p>

                                <p className="text-xs text-gray-500">
                                    Administrator
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </header>


            {/* ================= LEFT VERTICAL SIDEBAR ================= */}
            <aside className="fixed bottom-0 left-0 top-0 z-50 flex w-64 flex-col bg-[#FFF8F3] px-5 py-6 shadow-md">

                {/* ================= LOGO ================= */}
                <div className="mb-8 flex justify-start">

                    <Image
                        src="/logo.png"
                        height={100}
                        width={170}
                        alt="ShopNest Logo"
                        priority
                    />

                </div>


                {/* ================= MAIN MENU ================= */}
                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Main Menu
                </p>


                <nav className="flex flex-col gap-2">

                    {/* Dashboard */}
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 rounded-lg bg-[#F06A55] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>


                    {/* Products */}
                    <Link
                        href="/admin/products"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
                    >
                        <Package size={20} />
                        <span>Products</span>
                    </Link>


                    {/* Categories */}
                    <Link
                        href="/admin/categories"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
                    >
                        <Tags size={20} />
                        <span>Categories</span>
                    </Link>


                    {/* Users */}
                    <Link
                        href="/admin/users"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
                    >
                        <Users size={20} />
                        <span>Users</span>
                    </Link>


                    {/* Orders */}
                    <Link
                        href="/admin/orders"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
                    >
                        <ShoppingCart size={20} />
                        <span>Orders</span>
                    </Link>


                    {/* Trending */}
                    <Link
                        href="/admin/trendings"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
                    >
                        <TrendingUp size={20} />
                        <span>Trending</span>
                    </Link>


                    {/* Reviews */}
                    <Link
                        href="/admin/reviews"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
                    >
                        <Star size={20} />
                        <span>Reviews</span>
                    </Link>


                    {/* Reports */}
                    <Link
                        href="/admin/reports"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
                    >
                        <BarChart3 size={20} />
                        <span>Reports</span>
                    </Link>

                </nav>


                {/* ================= BOTTOM MENU ================= */}
                <div className="mt-auto border-t border-gray-200 pt-4">

                    {/* Settings */}
                    <Link
                        href="/admin/settings"
                        className="mb-2 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-white hover:text-[#F06A55]"
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>


                    {/* Logout */}
                    <Link
                        href="/admin/logout"
                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </Link>

                </div>

            </aside>
        </>
    );
}