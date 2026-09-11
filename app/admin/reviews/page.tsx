
"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "@/components/AdminNavbar";

export default function Reviews() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<number | null>(null);

    // =================================
    // Fetch Reviews
    // =================================

    const fetchReviews = async () => {
        try {
            setLoading(true);

            const response = await fetch("/api/admin/reviews/AdminReview");
            const data = await response.json();

            if (data.success) {
                setReviews(data.reviews);
            } else {
                setReviews([]);
            }
        } catch (error) {
            console.error("FETCH REVIEWS ERROR:", error);
            setReviews([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // =================================
    // Delete Review
    // =================================

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this review?"
        );

        if (!confirmDelete) return;

        try {
            setDeleting(id);

            const response = await fetch("/api/admin/reviews/AdminReview", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            const data = await response.json();

            if (data.success) {
                setReviews((prev) =>
                    prev.filter((review) => review.id !== id)
                );
            } else {
                alert(data.message || "Review delete nahi ho paaya");
            }
        } catch (error) {
            console.error("DELETE REVIEW ERROR:", error);
            alert("Something went wrong");
        } finally {
            setDeleting(null);
        }
    };

    // =================================
    // Loading State
    // =================================

    if (loading) {
        return (
            <>
                <AdminNavbar />

                <div className="ml-64 min-h-screen bg-[#FFF8F3] pt-20">
                    <div className="flex min-h-87.5 items-center justify-center">
                        <p className="text-sm font-medium text-gray-500">
                            Loading reviews...
                        </p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <AdminNavbar />

            <div className="ml-64 min-h-screen  pt-20">
                <div className="px-8 py-6">

                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Reviews
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage customer reviews and ratings.
                        </p>
                    </div>

                    {/* Reviews Table */}
                    {reviews.length > 0 ? (
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-250 border-collapse">

                                    {/* Table Header */}
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50">

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Sr No.
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Username
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Product Name
                                            </th>

                                            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Rating
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Comment
                                            </th>

                                            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Date
                                            </th>

                                            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Actions
                                            </th>

                                        </tr>
                                    </thead>

                                    {/* Table Body */}
                                    <tbody className="divide-y divide-gray-100">

                                        {reviews.map((review, index) => (
                                            <tr
                                                key={review.id}
                                                className="transition hover:bg-gray-50"
                                            >

                                                {/* Sr No. */}
                                                <td className="px-6 py-5">
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {index + 1}
                                                    </span>
                                                </td>

                                                {/* Username */}
                                                <td className="px-6 py-5">
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {review.user_name || "Unknown User"}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-400">
                                                            User ID: #{review.user_id}
                                                        </p>
                                                    </div>
                                                </td>

                                                {/* Product Name */}
                                                <td className="px-6 py-5">
                                                    <div>
                                                        <p className="max-w-xs truncate text-sm font-semibold text-gray-900">
                                                            {review.product_name || "Unknown Product"}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-400">
                                                            Product ID: #{review.product_id}
                                                        </p>
                                                    </div>
                                                </td>

                                                {/* Rating */}
                                                <td className="px-6 py-5 text-center">
                                                    <div className="inline-flex items-center gap-1 rounded-full bg-[#E39F7F]/10 px-3 py-1.5">
                                                        <span className="text-sm">
                                                            ⭐
                                                        </span>

                                                        <span className="text-sm font-bold text-[#d98968]">
                                                            {review.rating}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Comment */}
                                                <td className="px-6 py-5">
                                                    <p className="max-w-sm text-sm text-gray-600">
                                                        {review.comment || "No comment"}
                                                    </p>
                                                </td>

                                                {/* Date */}
                                                <td className="px-6 py-5 text-center">
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(
                                                            review.created_at
                                                        ).toLocaleDateString("en-IN", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-center">

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(review.id)
                                                            }
                                                            disabled={
                                                                deleting === review.id
                                                            }
                                                            className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-500 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >
                                                            {deleting === review.id
                                                                ? "Deleting..."
                                                                : "Delete"}
                                                        </button>

                                                    </div>
                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>

                                </table>
                            </div>
                        </div>
                    ) : (

                        /* Empty State */
                        <div className="flex min-h-87.5 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 text-center">

                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E39F7F]/10 text-3xl">
                                ⭐
                            </div>

                            <h3 className="text-xl font-bold text-gray-800">
                                No Reviews Found
                            </h3>

                            <p className="mt-2 max-w-md text-sm text-gray-500">
                                There are currently no customer reviews.
                            </p>

                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
