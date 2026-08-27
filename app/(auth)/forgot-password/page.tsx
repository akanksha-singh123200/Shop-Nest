"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();

    // Send OTP
    const sendOTP = async () => {
        if (!email) {
            setMessage("Please enter your email");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            const data = await response.json();

            console.log(data);

            if (data.success) {
                setMessage("OTP generated successfully");
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error(error);
            setMessage("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Verify OTP
    const verifyOTP = async () => {
    try {
        const response = await fetch("/api/auth/forgot-password/Verify-OTP", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                otp: otp,
            }),
        });

        const data = await response.json();

        if (data.success) {
            // Email ko URL me bhejna
            router.push(
                `/create-password?email=${encodeURIComponent(email)}`
            );
        } else {
            setMessage(data.message);
        }
    } catch (error) {
        console.error(error);
        setMessage("Something went wrong");
    }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-2xl">

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-8 w-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1-1.5 0Z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <p className="text-2xl font-bold text-center mb-3">
                    Create New Password
                </p>

                <p className="mb-5 text-center text-gray-600">
                    Please fill in the information below
                </p>

                {/* Email */}
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
                />

                {/* OTP Buttons */}
                <div className="flex items-center justify-between mt-3 mb-2">
                    <button
                        type="button"
                        onClick={sendOTP}
                        disabled={loading}
                        className="text-sm font-bold text-black hover:underline disabled:opacity-50"
                    >
                        Resend OTP
                    </button>

                    <button
                        type="button"
                        onClick={sendOTP}
                        disabled={loading}
                        className="text-sm font-bold text-black hover:underline disabled:opacity-50"
                    >
                        {loading ? "Sending..." : "Send OTP"}
                    </button>
                </div>

                {/* Message */}
                {message && (
                    <p className="text-center mt-3 text-sm text-green-600">
                        {message}
                    </p>
                )}

                {/* OTP */}
                <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    name="otp"
                    value={otp}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setOtp(value);
                    }}
                    placeholder="Enter OTP"
                    className="w-full mt-4 border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
                />

                {/* Verify OTP */}
                <button
                    type="button"
                    onClick={verifyOTP}
                    disabled={loading}
                    className="w-full mt-2 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                {/* Login */}
                <p className="text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold hover:underline text-blue-500"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}