
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
        `http://localhost:3000/api/reviews/ratings?product_id=${product.id}`,
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
        <div className="max-w-6xl mx-auto p-10">

            {/* =========================
                PRODUCT DETAILS
            ========================== */}

            <div className="grid grid-cols-2 gap-10">

                {/* Product Image */}
                <div>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full rounded"
                    />
                </div>

                {/* Product Information */}
                <div>

                    <h1 className="text-4xl font-bold">
                        {product.title}
                    </h1>

                    <p className="text-2xl mt-5">
                        ₹ {product.price}
                    </p>

                    {/* =========================
                        AVERAGE RATING
                    ========================== */}

                    <div className="flex items-center gap-2 mt-4">

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

                        <span className="font-medium">
                            {averageRating}
                        </span>

                        <span className="text-gray-500">
                            ({totalReviews} reviews)
                        </span>

                    </div>

                    <p className="mt-5">
                        {product.description}
                    </p>

                    <p className="mt-3">
                        Category : {product.category}
                    </p>

                    <p className="mt-3">
                        Stock : {product.stock}
                    </p>

                </div>
            </div>

            {/* =========================
                CUSTOMER REVIEWS
            ========================== */}

            <ReviewForm productId={product.id} />

        </div>
    );
}

