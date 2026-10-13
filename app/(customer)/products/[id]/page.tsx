import { notFound } from "next/navigation";
import ReviewForm from "./reviewform";
import ProductActions from "./ProductActions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetails({ params }: Props) {
  const { id } = await params;

  // Get Product Details
  const response = await fetch(
    `http://localhost:3000/api/admin/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();

  if (!data.product) {
    notFound();
  }

  const product = data.product;

  // Get Product Rating
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

    averageRating = Number(ratingData.average_rating) || 0;
    totalReviews = Number(ratingData.total_reviews) || 0;
  } else {
    console.error(
      "Rating API Error:",
      ratingResponse.status,
      ratingResponse.statusText
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8f3] px-5 py-25 md:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Product Section */}
        <div className="rounded-3xl border border-[#f5e5dc] bg-white p-6 shadow-sm md:p-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <div className="flex h-105 w-full items-center justify-center rounded-2xl bg-[#fff8f3] p-8 md:h-125">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain transition duration-300 hover:scale-105"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center">
              <span className="mb-4 w-fit rounded-full bg-[#fff0eb] px-4 py-1.5 text-sm font-medium text-[#F06A55]">
                {product.category}
              </span>

              <h1 className="text-3xl leading-tight font-bold text-gray-900 md:text-4xl">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= Math.round(averageRating)
                          ? "text-xl text-yellow-400"
                          : "text-xl text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                <span className="font-semibold text-gray-700">
                  {averageRating.toFixed(1)}
                </span>

                <span className="text-sm text-gray-500">
                  ({totalReviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-6">
                <p className="text-3xl font-bold text-[#F06A55]">
                  ₹ {product.price}
                </p>
              </div>

              <div className="my-6 border-t border-gray-100" />

              {/* Description */}
              <div>
                <h2 className="mb-2 text-lg font-semibold text-gray-900">
                  Description
                </h2>

                <p className="leading-7 text-gray-600">
                  {product.description}
                </p>
              </div>

              {/* Stock */}
              <div className="mt-5">
                <span className="font-semibold text-gray-900">
                  Availability:
                </span>

                {product.stock > 0 ? (
                  <span className="ml-2 font-medium text-green-600">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="ml-2 font-medium text-red-500">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Buttons */}
              <ProductActions
                productId={Number(product.id)}
                stock={Number(product.stock)}
              />
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-12 rounded-3xl border border-[#f5e5dc] bg-white p-6 shadow-sm md:p-10">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Customer Reviews
            </h2>

            <p className="mt-1 text-gray-500">
              See what customers are saying about this product.
            </p>
          </div>

          <ReviewForm productId={product.id} />
        </div>
      </div>
    </div>
  );
}