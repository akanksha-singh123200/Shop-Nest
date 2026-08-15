'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {

    const [open, setOpen] = useState(false);

    return (
        <div className=" bg-white/15 shadow-md ">

            <div className="flex items-center justify-between lg:p-5 p-3 mx-auto max-w-7xl">

                {/* Logo */}
                <div>
                    <Image
                        src="/logo4.png"
                        height={130}
                        width={160}
                        alt="ShopNest Logo"
                        className=""
                    />
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex gap-16 text-[18px]">

                    <a href="#home" className="hover:text-amber-600">
                        Home
                    </a>

                    <a href="#about" className="hover:text-amber-600">
                        About Us
                    </a>

                    <a href="#products" className="hover:text-amber-600">
                        Products
                    </a>

                </div>



                <div className="relative w-60 sm:w-80 lg:w-96">

                    <input
                        type="text"
                        placeholder="Search products..."
                        className="bg-white p-3 pl-5 pr-12 w-full rounded-3xl 
                   outline-none border border-gray-300"
                    />

                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
                        🔍
                    </span>

                </div>


                

                {/* Desktop Login */}
                <div className="hidden lg:block">

                    <Link href="/login"
                        className="bg-amber-500 text-white px-5 py-2 rounded-lg hover:bg-amber-600"
                    >
                        Login
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden text-3xl"
                >
                    ☰
                </button>

            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 left-0 h-screen  bg-gray-300 p-5
    transform transition-transform duration-500 ease-in-out
    ${open ? "translate-x-0" : "-translate-x-full"}
    lg:hidden`}
            >

                {/* Close Button */}
                <button
                    onClick={() => setOpen(false)}
                    className="text-3xl mb-10"
                >
                    ✕
                </button>

                <div className="flex flex-col gap-6 text-[18px]">

                    <a href="#home" className="hover:text-amber-600">
                        Home
                    </a>

                    <a href="#about" className="hover:text-amber-600">
                        About Us
                    </a>

                    <a href="#products" className="hover:text-amber-600">
                        Products
                    </a>

                    <a href="#cart" className="hover:text-amber-600">
                        Cart
                    </a>

                    <a href="#contact" className="hover:text-amber-600">
                        Contact Us
                    </a>

                    <a
                        href="#login"
                        className="bg-amber-500 text-white px-5 py-2 rounded-lg text-center"
                    >
                        Login
                    </a>

                </div>
            </div>

        </div>
    );
}