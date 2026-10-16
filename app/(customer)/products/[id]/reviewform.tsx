
"use client";

import { useEffect, useState } from "react";

type Props = {
    productId: number;
};

type Review = {
    id: number;
    name: string;
    rating: number;
    comment: string;
    created_at: string;
};

export default function ReviewForm({ productId }: Props) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);

    // =========================
    // POPUP
    // =========================

    const [isOpen, setIsOpen] = useState(true);

    // =========================
    // GET REVIEWS
    // =========================

    const fetchReviews = async () => {
        try {
            setReviewsLoading(true);

            const response = await fetch(
                `/api/admin/reviews/CustomerReview?product_id=${productId}`,
                {
                    cache: "no-store",
                }
            );

            const data = await response.json();

            if (data.success) {
                setReviews(data.reviews);
            } else {
                setReviews([]);
            }
        } catch (error) {
            console.error("Fetch reviews error:", error);
            setReviews([]);
        } finally {
            setReviewsLoading(false);
        }
    };

    // Product change hone par reviews fetch honge
    useEffect(() => {
        fetchReviews();
    }, [productId]);

    // =========================
    // SUBMIT REVIEW
    // =========================

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            setMessage("Please select a rating");
            return;
        }

        if (!comment.trim()) {
            setMessage("Please write a review");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            const response = await fetch("/api/admin/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_id: productId,
                    rating: rating,
                    comment: comment,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage("Review added successfully!");
                setRating(0);
                setComment("");

                // New review ke baad reviews refresh
                fetchReviews();
            } else {
                setMessage(
                    data.message || "Review not added"
                );
            }
        } catch (error) {
            console.error(error);
            setMessage("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* =========================
                REVIEW BUTTON
            ========================== */}

            {!isOpen && (
                <div className="">
                    {/* =========================
                        CUSTOMER REVIEWS
                    ========================== */}

                    {reviewsLoading ? (
                        <p className="text-gray-500">
                            Loading reviews...
                        </p>
                    ) : reviews.length === 0 ? (
                        <p className="text-gray-500">
                            No reviews yet. Be the first to review this product!
                        </p>
                    ) : (
                        <div className="space-y-4">
                            <h3 className="font-semibold">
                                Customer Reviews

                            </h3>

                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="border rounded-xl p-4"
                                >
                                    {/* Customer Name */}


                                    <h3 className="font-semibold">
                                        {review.name}
                                    </h3>

                                    {/* Rating */}

                                    <div className="flex mt-1">
                                        {[1, 2, 3, 4, 5].map(
                                            (star) => (
                                                <span
                                                    key={star}
                                                    className={
                                                        star <= review.rating
                                                            ? "text-yellow-400 text-xl"
                                                            : "text-gray-300 text-xl"
                                                    }
                                                >
                                                    ★
                                                </span>
                                            )
                                        )}
                                    </div>

                                    {/* Comment */}

                                    <p className="mt-2 text-gray-700">
                                        {review.comment}
                                    </p>

                                    {/* Date */}

                                    <p className="text-sm text-gray-400 mt-2">
                                        {new Date(
                                            review.created_at
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* =========================
                REVIEW POPUP
            ========================== */}

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

                    {/* Popup Box */}

                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">

                        {/* =========================
                            CLOSE BUTTON
                        ========================== */}

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-600 hover:bg-gray-200"
                        >
                            ×
                        </button>

                        {/* =========================
                            TITLE
                        ========================== */}

                        <h2 className="text-3xl font-bold mb-6 pr-10">
                            Customer Reviews & Ratings
                        </h2>

                        {/* =========================
                            WRITE REVIEW
                        ========================== */}

                        <div className="border-t pt-6">

                            <h2 className="text-xl font-bold mb-5">
                                Write a Review
                            </h2>

                            <form
                                onSubmit={handleSubmit}
                                className="max-w-xl"
                            >

                                {/* Rating */}

                                <div className="mb-5">

                                    <label className="block font-medium mb-2">
                                        Rating
                                    </label>

                                    <div className="flex gap-2">

                                        {[1, 2, 3, 4, 5].map(
                                            (star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() =>
                                                        setRating(star)
                                                    }
                                                    className={`text-3xl ${star <= rating
                                                            ? "text-yellow-400"
                                                            : "text-gray-300"
                                                        }`}
                                                >
                                                    ★
                                                </button>
                                            )
                                        )}

                                    </div>
                                </div>

                                {/* Comment */}

                                <div className="mb-5">

                                    <label className="block font-medium mb-2">
                                        Your Review
                                    </label>

                                    <textarea
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                        placeholder="Write your review..."
                                        rows={4}
                                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#E39F7F]"
                                    />

                                </div>

                                {/* Submit */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-black text-white px-6 py-3 rounded-lg disabled:opacity-50"
                                >
                                    {loading
                                        ? "Submitting..."
                                        : "Submit Review"}
                                </button>

                                {/* Message */}

                                {message && (
                                    <p className="mt-4">
                                        {message}
                                    </p>
                                )}

                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
