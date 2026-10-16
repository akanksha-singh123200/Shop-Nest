"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    // ==============================
    // State
    // ==============================

    const [admin_email, setEmail] = useState("");
    const [admin_password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    // ==============================
    // Login Handler
    // ==============================

    const handleLogin = async () => {
        setError("");

        // Empty field validation
        if (!admin_email.trim() || !admin_password) {
            setError("Please enter email and password.");
            return;
        }

        // Email validation
        const emailPattern =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailPattern.test(admin_email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }

        // Password validation
        if (admin_password.length < 6) {
            setError("Password must have at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/admin/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email: admin_email.trim(),
                    password: admin_password,
                }),
            });

            const data = await response.json();

            // ==============================
            // Login Successful
            // ==============================

            if (response.ok && data.success) {
                // Redirect to protected admin dashboard
                router.replace("/admin/");
                // window.location.href = "/admin/";

                return;
            }

            // ==============================
            // Login Failed
            // ==============================

            setError(data.message || "Login failed.");
        } catch (error) {
            console.error("Login Error:", error);

            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ==============================
    // UI
    // ==============================

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
            <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg md:p-10">

                {/* Icon */}
                <div className="mb-5 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-gray-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-8 w-8 text-gray-700"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.5-1.632Z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
                    Admin Login
                </h1>

                <p className="mb-8 text-center text-sm text-gray-500">
                    Sign in to access the admin panel
                </p>

                {/* Error Message */}
                {error && (
                    <div className="mb-5 rounded-md border border-red-200 bg-red-50 p-3 text-center text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Email */}
                <div className="mb-4">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
                        value={admin_email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        autoComplete="email"
                        disabled={loading}
                        className="w-full rounded-md border border-gray-300 p-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
                    />
                </div>

                {/* Password */}
                <div className="mb-5">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Password
                    </label>

                    <input
                        type="password"
                        value={admin_password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        disabled={loading}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleLogin();
                            }
                        }}
                        className="w-full rounded-md border border-gray-300 p-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black disabled:bg-gray-100"
                    />
                </div>

                {/* Login Button */}
                <button
                    type="button"
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full rounded-md bg-black py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>

                {/* Signup Link */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{" "}

                    <Link
                        href="/admin/auth/signup"
                        className="font-semibold text-gray-900 hover:underline"
                    >
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
}