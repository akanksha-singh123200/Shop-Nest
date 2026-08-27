'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {

    const [open, setOpen] = useState(false);

    return (
        <div className="bg-white/50 fixed top-0 left-0 right-0 z-50 shadow-md backdrop-blur-sm">

            <div className="flex items-center gap-5 lg:gap-7 px-4 py-3 lg:px-6 lg:py-4 mx-auto max-w-7xl">

                {/* Logo */}
                <Link href="/" className="shrink-0">
                    <Image
                        src="/logo4.png"
                        height={100}
                        width={140}
                        alt="ShopNest Logo"
                        className=""
                    />
                </Link>


                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-15 text-[16px] font-medium whitespace-nowrap">

                    <a
                        href="/"
                        className="text-[#F06A55] hover:text-[#d95542] transition"
                    >
                        Home
                    </a>
                    <Link
                        href="/products"
                        className="text-gray-800 hover:text-[#F06A55] transition"
                    >
                        Products
                    </Link>

                    <a
                        href="#quicklinks"
                        className="text-gray-800 hover:text-[#F06A55] transition"
                    >
                        Quick Links
                    </a>
                    <a
                        href="/trendings"
                        className="text-gray-800 hover:text-[#F06A55] transition"
                    >
                        Trendings
                    </a>

                </div>


                {/* Search */}
                <div className="relative hidden md:block flex-1 max-w-82.5 xl:max-w-95 ml-auto">

                    <input
                        type="text"
                        placeholder="Search products..."
                        className="
                            bg-[#fff8f3]
                            p-2.5
                            pl-5
                            pr-11
                            w-full
                            rounded-full
                            outline-none
                            border
                            border-gray-300
                            focus:border-[#F06A55]
                            transition
                            text-sm
                        "
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                    </span>

                </div>


                {/* Icons */}
                <div className="hidden lg:flex items-center gap-4 shrink-0">

                    <Link href="/wishlist">
                        {/* Wishlist */}
                        <button
                            className="text-gray-800 hover:text-[#F06A55] transition"
                            title="Wishlist"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                />
                            </svg>
                        </button>

                    </Link>





                    {/* Contact / Phone */}
                    <Link href="/Contact">
                    <button
                        className="text-gray-800 hover:text-[#F06A55] transition"
                        title="Contact"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="size-5">
                            <path d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                        </svg>

                    </button>
                    </Link>



                    {/* Cart */}
                    <Link href="/AddtoCart">
                        <button
                            className="relative text-gray-800 hover:text-[#F06A55] transition"
                            title="Cart"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1-1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1-1.5 0Z"
                                />
                            </svg>


                            {/* Cart Count
                        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#F06A55] px-1 text-[10px] text-white">
                            0
                        </span> */}
                        </button>
                    </Link>

                </div>


                {/* Login */}
                <div className="hidden lg:block shrink-0">

                    <Link
                        href="/login"
                        className="
                            inline-block
                            bg-[#E39F7F]
                            text-white
                            px-5
                            py-2
                            rounded-full
                            text-sm
                            font-medium
                            hover:bg-[#d95542]
                            transition
                        "
                    >
                        Login
                    </Link>

                </div>


                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden ml-auto text-2xl text-gray-800"
                >
                    ☰
                </button>

            </div>


            {/* Mobile Search */}
            <div className="md:hidden px-4 pb-3">

                <div className="relative">

                    <input
                        type="text"
                        placeholder="Search products..."
                        className="
                            bg-[#fff8f3]
                            p-2.5
                            pl-4
                            pr-10
                            w-full
                            rounded-full
                            outline-none
                            border
                            border-gray-300
                            focus:border-[#F06A55]
                        "
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>

                    </span>

                </div>

            </div>


            {/* Mobile Menu */}
            <div
                className={`
                    fixed
                    top-0
                    left-0
                    z-50
                    h-screen
                    w-72
                    bg-[#fff8f3]
                    p-6
                    shadow-xl
                    transform
                    transition-transform
                    duration-300
                    ease-in-out
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:hidden
                `}
            >

                {/* Close Button */}
                <button
                    onClick={() => setOpen(false)}
                    className="text-2xl mb-10 text-gray-800"
                >
                    ✕
                </button>


                <div className="flex flex-col gap-5 text-[17px] font-medium">

                    <a
                        href="#home"
                        onClick={() => setOpen(false)}
                        className="hover:text-[#F06A55]"
                    >
                        Home
                    </a>

                    <a
                        href="#about"
                        onClick={() => setOpen(false)}
                        className="hover:text-[#F06A55]"
                    >
                        About Us
                    </a>

                    <a
                        href="#products"
                        onClick={() => setOpen(false)}
                        className="hover:text-[#F06A55]"
                    >
                        Products
                    </a>

                    <a
                        href="#cart"
                        onClick={() => setOpen(false)}
                        className="hover:text-[#F06A55]"
                    >
                        Cart
                    </a>

                    <a
                        href="#contact"
                        onClick={() => setOpen(false)}
                        className="hover:text-[#F06A55]"
                    >
                        Contact Us
                    </a>

                    <Link
                        href="/login"
                        onClick={() => setOpen(false)}
                        className="
                            bg-[#F06A55]
                            text-white
                            px-5
                            py-2.5
                            rounded-full
                            text-center
                            mt-2
                        "
                    >
                        Login
                    </Link>

                </div>

            </div>

        </div>
    );
}