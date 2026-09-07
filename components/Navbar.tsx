"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const [customerName, setCustomerName] = useState("");

    // Product filters
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sort, setSort] = useState("");
    const [categories, setCategories] = useState<any[]>([]);

    const router = useRouter();

    // =========================
    // GET CUSTOMER
    // =========================
    useEffect(() => {
        if (session) {
            setCustomerName("");
            return;
        }

        const getCustomer = async () => {
            try {
                const response = await fetch("/api/auth/me");

                if (!response.ok) {
                    setCustomerName("");
                    return;
                }

                const data = await response.json();

                if (data.success) {
                    setCustomerName(data.Name);
                } else {
                    setCustomerName("");
                }
            } catch (error) {
                console.log("Error fetching customer:", error);
                setCustomerName("");
            }
        };

        getCustomer();
    }, [session]);

    // =========================
    // GET CATEGORIES
    // =========================
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories");

                if (!response.ok) {
                    throw new Error("Categories fetch failed");
                }

                const data = await response.json();

                setCategories(data.categories || []);
            } catch (error) {
                console.log("Category Error:", error);
            }
        };

        fetchCategories();
    }, []);

    // =========================
    // GET FILTER VALUES FROM URL
    // =========================
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        setSearch(params.get("search") || "");
        setCategoryFilter(params.get("categorySearch") || "");
        setSort(params.get("sort") || "");
    }, []);

    // =========================
    // APPLY FILTERS
    // =========================
    const applyFilters = (
        nextSearch = search,
        nextCategory = categoryFilter,
        nextSort = sort
    ) => {
        const params = new URLSearchParams();

        if (nextSearch.trim()) {
            params.set("search", nextSearch.trim());
        }

        if (nextCategory) {
            params.set("categorySearch", nextCategory);
        }

        if (nextSort) {
            params.set("sort", nextSort);
        }

        const query = params.toString();

        router.push(`/products${query ? `?${query}` : ""}`);

        setOpen(false);
    };

    // =========================
    // SEARCH
    // =========================
    const handleSearch = () => {
        applyFilters();
    };

    // =========================
    // SORT
    // =========================
    const handleSortChange = (value: string) => {
        setSort(value);
        applyFilters(search, categoryFilter, value);
    };

    // =========================
    // CATEGORY
    // =========================
    const handleCategoryChange = (value: string) => {
        setCategoryFilter(value);
        applyFilters(search, value, sort);
    };

    // =========================
    // LOGIN NAME
    // =========================
    const loggedInName = session?.user?.name || customerName;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 shadow-md backdrop-blur-sm">

            {/* =========================
                MAIN NAVBAR
            ========================= */}
            <div className="mx-auto flex max-w-7xl items-center gap-10 px-4 py-3">

                {/* LOGO */}
                <Link href="/" className="shrink-0">
                    <Image
                        src="/logo.png"
                        height={70}
                        width={110}
                        alt="ShopNest Logo"
                    />
                </Link>

                {/* =========================
                    DESKTOP MENU
                ========================= */}
                <div className="hidden shrink-0 items-center gap-5 whitespace-nowrap text-sm font-medium xl:flex">

                    <Link
                        href="/"
                        className="text-[#F06A55] transition hover:text-[#d95542]"
                    >
                        Home
                    </Link>

                    <Link
                        href="/products"
                        className="text-gray-800 transition hover:text-[#F06A55]"
                    >
                        Products
                    </Link>

                    <a
                        href="#quicklinks"
                        className="text-gray-800 transition hover:text-[#F06A55]"
                    >
                        Quick Links
                    </a>

                    <Link
                        href="/trendings"
                        className="text-gray-800 transition hover:text-[#F06A55]"
                    >
                        Trendings
                    </Link>

                </div>

                {/* =========================
                    DESKTOP FILTERS
                ========================= */}
                <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">

                    {/* SEARCH */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch();
                        }}
                        className="relative min-w-0 flex-1"
                    >
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products..."
                            className="w-full rounded-full border border-gray-300 bg-white px-3 py-2 pr-9 text-xs outline-none focus:border-[#E39F7F]"
                        />

                        <button
                            type="submit"
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full px-2 text-gray-600 hover:text-[#F06A55]"
                        >
                            🔍
                        </button>
                    </form>

                    {/* SORT */}
                    <select
                        value={sort}
                        onChange={(e) =>
                            handleSortChange(e.target.value)
                        }
                        className="w-20 shrink-0 rounded-full border border-gray-300 bg-white px-2 py-1.5 text-xs outline-none focus:border-[#E39F7F]"
                    >
                        <option value="">Sort</option>
                        <option value="price_asc">Price ↑</option>
                        <option value="price_desc">Price ↓</option>
                        <option value="name_asc">Name A-Z</option>
                        <option value="name_desc">Name Z-A</option>
                    </select>

                    {/* CATEGORY */}
                    <select
                        value={categoryFilter}
                        onChange={(e) =>
                            handleCategoryChange(e.target.value)
                        }
                        className="w-24 shrink-0 rounded-full border border-gray-300 bg-white px-2 py-2 text-xs outline-none focus:border-[#E39F7F]"
                    >
                        <option value="">Category</option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>

                </div>

                {/* =========================
                    DESKTOP ICONS
                ========================= */}
                <div className="hidden shrink-0 items-center gap-4 xl:flex">

                    <Link
                        href="/wishlist"
                        className="text-lg text-gray-700 transition hover:text-[#F06A55]"
                        title="Wishlist"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-5">
                            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>

                    </Link>

                    <Link
                        href="/Contact"
                        className="text-lg text-gray-700 transition hover:text-[#F06A55]"
                        title="Contact"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-5">
                            <path d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                        </svg>

                    </Link>

                    <Link
                        href="/AddtoCart"
                        className="text-lg text-gray-700 transition hover:text-[#F06A55]"
                        title="Cart"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-5">
                            <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>

                    </Link>

                </div>

                {/* =========================
                    LOGIN / CUSTOMER
                ========================= */}
                <div className="shrink-0">

                    {loggedInName ? (

                        <div className="flex items-center gap-2">

                            <span className="hidden whitespace-nowrap text-xs font-medium text-[#F06A55] 2xl:block">
                                Hiii, {loggedInName} 👋
                            </span>

                            <LogoutButton />

                        </div>

                    ) : (

                        <Link
                            href="/login"
                            className="inline-block whitespace-nowrap rounded-full bg-[#E39F7F] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#d95542]"
                        >
                            Login
                        </Link>

                    )}

                </div>

                {/* =========================
                    MOBILE MENU BUTTON
                ========================= */}
                <button
                    onClick={() => setOpen(true)}
                    className="ml-auto text-2xl text-gray-800 xl:hidden"
                    aria-label="Open menu"
                >
                    ☰
                </button>

            </div>

            {/* =========================
                MOBILE FILTER BAR
            ========================= */}
            <div className="border-t border-gray-100 px-4 pb-3 pt-2 xl:hidden">

                {/* SEARCH */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                    className="relative"
                >
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 pr-12 text-sm outline-none focus:border-[#E39F7F]"
                    />

                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-1"
                    >
                        🔍
                    </button>
                </form>

                {/* SORT + CATEGORY */}
                <div className="mt-2 grid grid-cols-2 gap-2">

                    <select
                        value={sort}
                        onChange={(e) =>
                            handleSortChange(e.target.value)
                        }
                        className="rounded-full border border-gray-300 bg-white px-3 py-2 text-sm outline-none"
                    >
                        <option value="">Sort By</option>

                        <option value="price_asc">
                            Price Low → High
                        </option>

                        <option value="price_desc">
                            Price High → Low
                        </option>

                        <option value="name_asc">
                            Name A → Z
                        </option>

                        <option value="name_desc">
                            Name Z → A
                        </option>
                    </select>

                    <select
                        value={categoryFilter}
                        onChange={(e) =>
                            handleCategoryChange(e.target.value)
                        }
                        className="rounded-full border border-gray-300 bg-white px-3 py-2 text-sm outline-none"
                    >
                        <option value="">All Categories</option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>

                </div>

            </div>

            {/* =========================
                MOBILE MENU
            ========================= */}
            <div
                className={`fixed left-0 top-0 z-50 h-screen w-72 transform bg-[#fff8f3] p-6 shadow-xl transition-transform duration-300 ease-in-out ${open
                    ? "translate-x-0"
                    : "-translate-x-full"
                    } xl:hidden`}
            >

                {/* CLOSE */}
                <button
                    onClick={() => setOpen(false)}
                    className="mb-8 text-2xl text-gray-800"
                >
                    ✕
                </button>

                <div className="flex flex-col gap-6 text-[16px] font-medium">

                    <Link
                        href="/"
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </Link>

                    <Link
                        href="/products"
                        onClick={() => setOpen(false)}
                    >
                        Products
                    </Link>

                    <a
                        href="#quicklinks"
                        onClick={() => setOpen(false)}
                    >
                        Quick Links
                    </a>

                    <Link
                        href="/trendings"
                        onClick={() => setOpen(false)}
                    >
                        Trendings
                    </Link>

                    <Link
                        href="/wishlist"
                        onClick={() => setOpen(false)}
                    >
                        Wishlist
                    </Link>

                    <Link
                        href="/AddtoCart"
                        onClick={() => setOpen(false)}
                    >
                        Cart
                    </Link>

                    <Link
                        href="/Contact"
                        onClick={() => setOpen(false)}
                    >
                        Contact Us
                    </Link>

                    {loggedInName ? (

                        <div className="mt-4">

                            <p className="mb-3 text-[#F06A55]">
                                Hiii, {loggedInName} 👋
                            </p>

                            <LogoutButton />

                        </div>

                    ) : (

                        <Link
                            href="/login"
                            onClick={() => setOpen(false)}
                            className="w-fit rounded-full bg-[#E39F7F] px-5 py-2 text-white"
                        >
                            Login
                        </Link>

                    )}

                </div>

            </div>

        </div>
    );
}