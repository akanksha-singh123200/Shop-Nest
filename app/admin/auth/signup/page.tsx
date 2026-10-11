
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
    const [admin_name, setName] = useState("");
    const [admin_email, setEmail] = useState("");
    const [admin_phone, setPhone] = useState("");
    const [admin_role, setRole] = useState("");
    const [admin_password, setPassword] = useState("");
    const [admin_confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSignup = async () => {
        setError("");

        // Empty fields
        if (
            !admin_name ||
            !admin_email ||
            !admin_phone ||
            !admin_role ||
            !admin_password ||
            !admin_confirmPassword
        ) {
            setError("Please fill all the fields.");
            return;
        }

        // Password length
        if (admin_password.length < 6) {
            setError("Password must have at least 6 characters.");
            return;
        }

        // Compare password
        if (admin_password !== admin_confirmPassword) {
            setError("Password and confirm password do not match.");
            return;
        }

        // Email validation
        const emailPattern =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailPattern.test(admin_email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Phone validation
        if (admin_phone.length !== 10) {
            setError("Phone number must contain 10 digits.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/admin/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: admin_name,
                    email: admin_email,
                    phone: admin_phone,
                    role: admin_role,
                    password: admin_password,
                    confirmPassword: admin_confirmPassword,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message);
                router.push("/admin/auth/login");
            } else {
                setError(data.message || "Signup failed.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 py-8">

            <div className="bg-white w-full max-w-xl p-8 md:p-10 rounded-xl shadow-lg">

                {/* Icon */}
                <div className="flex justify-center mb-5">
                    <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">

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
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 text-sm mb-8">
                    Please fill in the information below
                </p>

                {/* Error */}
                {error && (
                    <div className="mb-5 p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                        {error}
                    </div>
                )}

                {/* Name */}
                <div className="mb-4">

                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Name
                    </label>

                    <input
                        type="text"
                        value={admin_name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 p-3 rounded-md outline-none text-sm focus:border-black focus:ring-1 focus:ring-black"
                    />

                </div>

                {/* Email */}
                <div className="mb-4">

                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email
                    </label>

                    <input
                        type="email"
                        value={admin_email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 p-3 rounded-md outline-none text-sm focus:border-black focus:ring-1 focus:ring-black"
                    />

                </div>

                {/* Phone */}
                <div className="mb-4">

                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number
                    </label>

                    <input
                        type="tel"
                        value={admin_phone}
                        maxLength={10}
                        onChange={(e) =>
                            setPhone(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="Enter phone number"
                        className="w-full border border-gray-300 p-3 rounded-md outline-none text-sm focus:border-black focus:ring-1 focus:ring-black"
                    />

                </div>

                {/* Role */}
                <div className="mb-4">

                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Role
                    </label>

                    <input
                        type="text"
                        value={admin_role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Enter your role"
                        className="w-full border border-gray-300 p-3 rounded-md outline-none text-sm focus:border-black focus:ring-1 focus:ring-black"
                    />

                </div>

                {/* Password */}
                <div className="mb-4">

                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Password
                    </label>

                    <input
                        type="password"
                        value={admin_password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full border border-gray-300 p-3 rounded-md outline-none text-sm focus:border-black focus:ring-1 focus:ring-black"
                    />

                </div>

                {/* Confirm Password */}
                <div className="mb-6">

                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        value={admin_confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        placeholder="Confirm your password"
                        className="w-full border border-gray-300 p-3 rounded-md outline-none text-sm focus:border-black focus:ring-1 focus:ring-black"
                    />

                </div>

                {/* Signup Button */}
                <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-md font-medium text-sm hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-500 mt-6">

                    Already have an account?{" "}

                    <Link
                        href="/admin/auth/login"
                        className="font-semibold text-gray-900 hover:underline"
                    >
                        Sign In
                    </Link>

                </p>

            </div>

        </div>
    );
}