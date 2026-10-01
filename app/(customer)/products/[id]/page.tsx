
import { notFound } from "next/navigation";
import ReviewForm from "./reviewform/page";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ProductDetails({ params }: Props) {
    // Next.js 16
    const { id } = await params;

    // =========================
    // GET PRODUCT
    // =========================
    const response = await fetch(
        `http://localhost:3000/api/admin/products/${id}`,
        {
            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!data.product) {
        notFound();
    }

    const product = data.product;

    // =========================
    // GET PRODUCT RATING
    // =========================
    const ratingResponse = await fetch(
        `http://localhost:3000/api/admin/reviews/ratings?product_id=${product.id}`,
        {
            cache: "no-store",
        }
    );

    let averageRating = 0;
    let totalReviews = 0;

    if (ratingResponse.ok) {
        const ratingData = await ratingResponse.json();

        averageRating = ratingData.average_rating || 0;
        totalReviews = ratingData.total_reviews || 0;
    } else {
        console.error(
            "Rating API Error:",
            ratingResponse.status,
            ratingResponse.statusText
        );
    }

    return (
        <div className="min-h-screen bg-[#fff8f3] px-5 md:px-10 py-25">

            {/* =========================
                PRODUCT SECTION
            ========================== */}
            <div className="max-w-6xl mx-auto">

                <div className="bg-white rounded-3xl shadow-sm border border-[#f5e5dc] p-6 md:p-10">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

                        {/* =========================
                            PRODUCT IMAGE
                        ========================== */}
                        <div className="flex items-center justify-center">

                            <div className="w-full h-105 md:h-125 bg-[#fff8f3] rounded-2xl flex items-center justify-center p-8">

                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-contain hover:scale-105 transition duration-300"
                                />

                            </div>

                        </div>


                        {/* =========================
                            PRODUCT INFORMATION
                        ========================== */}
                        <div className="flex flex-col justify-center">

                            {/* Category */}
                            <span className="w-fit px-4 py-1.5 rounded-full bg-[#fff0eb] text-[#F06A55] text-sm font-medium mb-4">
                                {product.category}
                            </span>


                            {/* Product Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                                {product.title}
                            </h1>


                            {/* Rating */}
                            <div className="flex items-center gap-3 mt-5">

                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={
                                                star <= Math.round(averageRating)
                                                    ? "text-yellow-400 text-xl"
                                                    : "text-gray-300 text-xl"
                                            }
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>

                                <span className="font-semibold text-gray-700">
                                    {averageRating}
                                </span>

                                <span className="text-gray-500 text-sm">
                                    ({totalReviews} reviews)
                                </span>

                            </div>


                            {/* Price */}
                            <div className="mt-6">
                                <p className="text-3xl font-bold text-[#F06A55]">
                                    ₹ {product.price}
                                </p>
                            </div>


                            {/* Divider */}
                            <div className="border-t border-gray-100 my-6"></div>


                            {/* Description */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                    Description
                                </h2>

                                <p className="text-gray-600 leading-7">
                                    {product.description}
                                </p>
                            </div>


                            {/* Stock */}
                            <div className="mt-5">

                                <span className="font-semibold text-gray-900">
                                    Availability:
                                </span>

                                {product.stock > 0 ? (
                                    <span className="ml-2 text-green-600 font-medium">
                                        In Stock ({product.stock} available)
                                    </span>
                                ) : (
                                    <span className="ml-2 text-red-500 font-medium">
                                        Out of Stock
                                    </span>
                                )}

                            </div>


                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-7">

                                <button
                                    disabled={product.stock <= 0}
                                    className="flex-1 bg-[#F06A55] text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-[#d95c4a] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Buy Now
                                </button>

                                <button
                                    disabled={product.stock <= 0}
                                    className="flex-1 border-2 border-[#F06A55] text-[#F06A55] px-6 py-3.5 rounded-xl font-semibold hover:bg-[#fff0eb] transition disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                                >
                                    Add to Cart
                                </button>

                            </div>

                        </div>
                    </div>

                </div>


                {/* =========================
                    CUSTOMER REVIEWS
                ========================== */}
                <div className="mt-12 bg-white rounded-3xl shadow-sm border border-[#f5e5dc] p-6 md:p-10">

                    <div className="mb-6">

                        <h2 className="text-2xl font-bold text-gray-900">
                            Customer Reviews
                        </h2>

                        <p className="text-gray-500 mt-1">
                            See what customers are saying about this product.
                        </p>

                    </div>

                    <ReviewForm productId={product.id} />

                </div>

            </div>
        </div>
    );
}
