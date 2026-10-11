
"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "@/components/AdminNavbar";

interface FeedbackData {
    contact_us_id: number;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    contact_message: string;
}

export default function Feedback() {
    const [feedback, setFeedback] = useState<FeedbackData[]>([]);
    const [loading, setLoading] = useState(true);

    // ==============================
    // GET FEEDBACK
    // ==============================
    const fetchFeedback = async () => {
        try {
            const response = await fetch("/api/admin/contactus", {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            });

            const data = await response.json();

            if (data.success) {
                setFeedback(data.feedback);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Feedback fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch Feedback on Page Load
    useEffect(() => {
        fetchFeedback();
    }, []);

    // ==============================
    // DELETE FEEDBACK
    // ==============================
    const handleDelete = async (contact_us_id: number) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this feedback?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch("/api/admin/contactus", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    contact_us_id,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Feedback deleted successfully");

                setFeedback((prev) =>
                    prev.filter(
                        (item) => item.contact_us_id !== contact_us_id
                    )
                );
            } else {
                alert(data.message || "Feedback could not be deleted");
            }
        } catch (error) {
            console.error("Delete feedback error:", error);
            alert("Feedback could not be deleted");
        }
    };

    return (
        <>
            <AdminNavbar />

            <div className="ml-64 min-h-screen bg-[#fff8f3] px-6 pt-28 pb-8">
                <div className="max-w-7xl mx-auto">

                    {/* Page Heading */}
                    <div className="mb-8">
                        <p className="text-sm font-medium text-[#F06A55] mb-2">
                            SHOPNEST ADMIN
                        </p>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Customer Feedback
                        </h1>

                        <p className="text-gray-500 mt-2">
                            View and manage messages submitted by customers.
                        </p>
                    </div>

                    {/* Feedback Summary */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#fff0eb] text-[#F06A55] flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                            </svg>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Total Feedback
                            </p>

                            <h2 className="text-2xl font-bold text-gray-800">
                                {feedback.length}
                            </h2>
                        </div>
                    </div>

                    {/* Feedback Table */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                        {/* Table Heading */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5 border-b border-gray-200">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Feedback List
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Review messages submitted by your customers.
                                </p>
                            </div>

                            <span className="inline-flex w-fit items-center rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600">
                                Total: {feedback.length}
                            </span>
                        </div>

                        {/* Loading State */}
                        {loading ? (
                            <div className="text-center py-12 text-gray-500">
                                Loading feedback...
                            </div>
                        ) : feedback.length === 0 ? (

                            /* Empty State */
                            <div className="px-6 py-14 text-center">
                                <div className="text-gray-400 mb-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="40"
                                        height="40"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mx-auto"
                                    >
                                        <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                                    </svg>
                                </div>

                                <p className="font-medium text-gray-700">
                                    No feedback found
                                </p>

                                <p className="text-sm text-gray-400 mt-1">
                                    Customer messages will appear here.
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Responsive Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-275 border-collapse text-left">

                                        {/* Table Header */}
                                        <thead className="bg-gray-50">
                                            <tr className="border-b border-gray-200">
                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Feedback ID
                                                </th>

                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Customer
                                                </th>

                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Email Address
                                                </th>

                                                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Phone
                                                </th>

                                                <th className="min-w-70 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Message
                                                </th>

                                                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>

                                        {/* Table Body */}
                                        <tbody className="divide-y divide-gray-100">
                                            {feedback.map((item) => (
                                                <tr
                                                    key={item.contact_us_id}
                                                    className="hover:bg-[#fffaf7] transition-colors"
                                                >
                                                    {/* Feedback ID */}
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex rounded-md bg-gray-100 px-2.5 py-1.5 text-sm font-medium text-gray-600">
                                                            #{item.contact_us_id}
                                                        </span>
                                                    </td>

                                                    {/* Customer Name */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 shrink-0 rounded-full bg-[#fff0eb] text-[#F06A55] flex items-center justify-center font-semibold">
                                                                {item.contact_name
                                                                    ?.charAt(0)
                                                                    .toUpperCase() || "C"}
                                                            </div>

                                                            <span className="font-medium text-gray-800">
                                                                {item.contact_name}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    {/* Email */}
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {item.contact_email}
                                                    </td>

                                                    {/* Phone */}
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {item.contact_phone || "—"}
                                                    </td>

                                                    {/* Message */}
                                                    <td className="px-6 py-4">
                                                        <p className="max-w-sm whitespace-normal wrap-break-words text-sm leading-6 text-gray-600">
                                                            {item.contact_message}
                                                        </p>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-6 py-4 text-center">
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(                                                                   item.contact_us_id
                                                                )
                                                            }
                                                            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                                                            title="Delete feedback"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Table Footer */}
                                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/70">
                                    <p className="text-sm text-gray-500">
                                        Showing{" "}
                                        <span className="font-semibold text-gray-700">
                                            {feedback.length}
                                        </span>{" "}
                                        customer feedback messages
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
