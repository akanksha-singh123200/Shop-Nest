"use client";

import { useState } from "react";

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !email || !phone || !message) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("/api/admin/contactus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    message,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Feedback submitted successfully");

                // Clear form
                setName("");
                setEmail("");
                setPhone("");
                setMessage("");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Contact form error:", error);
            alert("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            id="contact"
            className="min-h-screen flex items-center justify-center px-4 py-25"
        >
            <div className="bg-white w-full max-w-xl p-8 rounded-lg shadow-2xl">

                {/* Icon */}
                <div className="flex justify-center mb-6">
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
                                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615A2.25 2.25 0 0 1 2.25 6.993V6.75"
                            />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-center mb-3">
                    Contact Me
                </h1>

                <p className="text-center text-gray-600 mb-9">
                    Please enter your information below
                </p>

                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            autoComplete="off"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Email + Phone */}
                    <div className="w-full flex flex-col sm:flex-row gap-3 mb-4">

                        <input
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
                        />

                        <input
                            type="tel"
                            placeholder="Enter your phone"
                            autoComplete="off"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
                        />

                    </div>

                    {/* Message */}
                    <div className="mb-7">
                        <textarea
                            placeholder="Enter your message....."
                            rows={5}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border p-3 rounded-md outline-none resize-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>

                </form>
            </div>
        </div>
    );
}