
"use client";

import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ProductsContent() {
    const [products, setProducts] = useState<any[]>([]);
    // const [categories, setCategories] = useState<any[]>([]);
    // const [search, setSearch] = useState("");
    // const [categoryFilter, setCategoryFilter] = useState("");
    // const [sort, setSort] = useState("");

    const [wishlist, setWishlist] = useState<number[]>([]);
    const searchParams = useSearchParams();

    // =========================
    // RATINGS
    // =========================

    const [ratings, setRatings] = useState<{
        [key: number]: {
            average_rating: number;
            total_reviews: number;
        };
    }>({});

    const router = useRouter();

    // =========================
    // GET PRODUCT RATINGS
    // =========================

    const getRatings = async (productList: any[]) => {
        try {
            const ratingData: {
                [key: number]: {
                    average_rating: number;
                    total_reviews: number;
                };
            } = {};

            await Promise.all(
                productList.map(async (product) => {
                    try {
                        const response = await fetch(
                            `/api/admin/reviews/ratings?product_id=${product.id}`
                        );

                        if (!response.ok) {
                            console.error(
                                `Rating API Error for product ${product.id}:`,
                                response.status
                            );
                            return;
                        }

                        const data = await response.json();

                        if (data.success) {
                            ratingData[product.id] = {
                                average_rating:
                                    data.average_rating || 0,
                                total_reviews:
                                    data.total_reviews || 0,
                            };
                        }
                    } catch (error) {
                        console.log(
                            `Rating Error for product ${product.id}:`,
                            error
                        );
                    }
                })
            );

            setRatings(ratingData);
        } catch (error) {
            console.log("Ratings Error:", error);
        }
    };

    // =========================
    // GET WISHLIST
    // =========================

    const getWishlist = async () => {
        try {
            const response = await fetch("/api/wishlist");

            if (!response.ok) {
                throw new Error("Wishlist fetch failed");
            }

            const data = await response.json();

            if (data.success && data.wishlist) {
                const ids = data.wishlist.map(
                    (item: any) => Number(item.product_id)
                );

                setWishlist(ids);
            }
        } catch (error) {
            console.log("Wishlist Error:", error);
        }
    };

    // =========================
    // GET CATEGORIES
    // =========================

    // const fetchCategories = async () => {
    //     try {
    //         const response = await fetch("/api/categories");

    //         if (!response.ok) {
    //             throw new Error("Categories fetch failed");
    //         }

    //         const data = await response.json();

    //         setCategories(data.categories || []);
    //     } catch (error) {
    //         console.log("Category Error:", error);
    //     }
    // };

    // =========================
    // GET PRODUCTS
    // =========================

    const getProducts = async () => {
        try {
            const params = new URLSearchParams();

            const search = searchParams.get("search") || "";

            const categoryFilter =
                searchParams.get("categorySearch") || "";

            const sort = searchParams.get("sort") || "";

            if (search.trim()) {
                params.append("search", search.trim());
            }

            if (categoryFilter) {
                params.append("categorySearch", categoryFilter);
            }

            if (sort) {
                params.append("sort", sort);
            }

            const query = params.toString();

            const response = await fetch(
                `/api/admin/products${query ? `?${query}` : ""}`
            );

            if (!response.ok) {
                throw new Error("Products fetch failed");
            }

            const data = await response.json();

            const productList = data.products || [];

            setProducts(productList);

            getRatings(productList);
        } catch (error) {
            console.log("Products Error:", error);
        }
    };

    // =========================
    // INITIAL LOAD
    // =========================

    useEffect(() => {
        getProducts();
        getWishlist();

        // fetchCategories();
    }, [searchParams]);

    // =========================
    // WISHLIST
    // =========================

    const addToWishlist = async (productID: number) => {
        try {
            // Product already in wishlist
            if (wishlist.includes(productID)) {
                const response = await fetch("/api/wishlist", {
                    method: "DELETE",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        userID: 1,
                        productID,
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    setWishlist((prev) =>
                        prev.filter((id) => id !== productID)
                    );

                    alert("Removed from Wishlist");
                } else {
                    alert(
                        data.message ||
                            "Unable to remove from wishlist"
                    );
                }
            }

            // Product not in wishlist
            else {
                const response = await fetch("/api/wishlist", {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        userID: 1,
                        productID,
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    setWishlist((prev) => [
                        ...prev,
                        productID,
                    ]);

                    alert("Added to Wishlist");
                } else {
                    alert(
                        data.message ||
                            "Unable to add to wishlist"
                    );
                }
            }
        } catch (error) {
            console.log("Wishlist Error:", error);
        }
    };

    // =========================
    // ADD TO CART
    // =========================

    const setAddToCart = async (productID: number) => {
        try {
            const response = await fetch("/api/AddtoCart", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    userID: 1,
                    productID,
                    quantity: 1,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message);

                router.push("/AddtoCart");
            } else {
                alert(
                    data.message ||
                        "Unable to add product to cart"
                );
            }
        } catch (error) {
            console.log("Cart Error:", error);
        }
    };

    // =========================
    // SEARCH / FILTER
    // =========================

    // const handleSearch = () => {
    //     getProducts();
    // };

    return (
        <div className="min-h-screen bg-[#fff8f3]">

            {/* =========================
                FILTER SECTION
            ========================== */}

            {/*
            <div className="max-w-7xl mx-auto px-4 pt-32 pb-8">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    Sort

                    <select
                        value={sort}
                        onChange={(e) =>
                            setSort(e.target.value)
                        }
                        className="border border-gray-300 bg-white p-3 rounded-lg outline-none"
                    >
                        <option value="">
                            Sort By
                        </option>

                        <option value="price_asc">
                            Price Low to High
                        </option>

                        <option value="price_desc">
                            Price High to Low
                        </option>
                    </select>

                    Search

                    <input
                        type="text"
                        placeholder="Search Product"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        className="border border-gray-300 bg-white p-3 rounded-lg outline-none"
                    />

                    Category

                    <select
                        value={categoryFilter}
                        onChange={(e) =>
                            setCategoryFilter(e.target.value)
                        }
                        className="border border-gray-300 bg-white p-3 rounded-lg outline-none"
                    >
                        <option value="">
                            Select Category
                        </option>

                        {categories.map((cat: any) => (
                            <option
                                key={cat.id}
                                value={cat.id}
                            >
                                {cat.name}
                            </option>
                        ))}
                    </select>

                </div>

                Search Button

                <button
                    onClick={handleSearch}
                    className="mt-4 bg-black text-white px-6 py-3 rounded-lg hover:bg-[#F06A55] transition"
                >
                    Search
                </button>

            </div>
            */}

            {/* =========================
                PRODUCT LIST
            ========================== */}

            <section className="max-w-7xl mx-auto px-4 pb-20">

                <h1 className="font-playfair text-5xl text-center font-bold">
                    Featured Products
                </h1>

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">
                            No products found.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 mt-9 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {products.map((product: any) => {

                            const averageRating =
                                ratings[product.id]
                                    ?.average_rating || 0;

                            const totalReviews =
                                ratings[product.id]
                                    ?.total_reviews || 0;

                            return (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1"
                                >

                                    {/* =========================
                                        IMAGE
                                    ========================== */}

                                    <div className="relative bg-gray-50 rounded-xl h-64 p-4">

                                        {/* Wishlist */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                addToWishlist(
                                                    product.id
                                                )
                                            }
                                            className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-[#E39F7F] transition"
                                            title="Add to Wishlist"
                                        >
                                            {wishlist.includes(
                                                product.id
                                            )
                                                ? "❤️"
                                                : "🤍"}
                                        </button>

                                        <Link
                                            href={`/products/${product.id}`}
                                            className="flex items-center justify-center h-full"
                                        >
                                            <Image
                                                src={product.image}
                                                width={220}
                                                height={220}
                                                alt={
                                                    product.name ||
                                                    product.title ||
                                                    "Product"
                                                }
                                                className="object-contain h-48 w-full"
                                            />
                                        </Link>

                                    </div>

                                    {/* =========================
                                        PRODUCT DETAILS
                                    ========================== */}

                                    <div className="pt-4">

                                        {/* Product Name */}

                                        <Link
                                            href={`/products/${product.id}`}
                                        >
                                            <h2 className="text-xl font-bold hover:text-[#F06A55] transition">
                                                {product.name ||
                                                    product.title}
                                            </h2>
                                        </Link>

                                        {/* Description */}

                                        <p className="text-sm text-gray-600 mt-2 leading-5 line-clamp-2">
                                            {product.description}
                                        </p>

                                        {/* Price */}

                                        <p className="text-xl font-bold text-gray-800 mt-3">
                                            ₹{product.price}
                                        </p>

                                        {/* Category */}

                                        <p className="text-sm text-gray-500 mt-1">
                                            Category:{" "}
                                            {product.category}
                                        </p>

                                        {/* Stock */}

                                        <p className="text-sm text-gray-500 mt-1">
                                            Stock:{" "}
                                            {product.stock}
                                        </p>

                                        {/* =========================
                                            RATING
                                        ========================== */}

                                        <div className="flex items-center gap-2 mt-3">

                                            <div className="flex">

                                                {[1, 2, 3, 4, 5].map(
                                                    (star) => (
                                                        <span
                                                            key={star}
                                                            className={
                                                                star <=
                                                                Math.round(
                                                                    averageRating
                                                                )
                                                                    ? "text-yellow-400 text-xl"
                                                                    : "text-gray-300 text-xl"
                                                            }
                                                        >
                                                            ★
                                                        </span>
                                                    )
                                                )}

                                            </div>

                                            <span className="font-medium">
                                                {averageRating}
                                            </span>

                                            <span className="text-gray-500 text-sm">
                                                ({totalReviews})
                                            </span>

                                        </div>

                                        {/* Add To Cart */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setAddToCart(
                                                    product.id
                                                )
                                            }
                                            className="w-full mt-4 py-3 rounded-full bg-[#E39F7F] text-white font-bold hover:bg-[#d98968] transition"
                                        >
                                            Add to Cart
                                        </button>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

            </section>
        </div>
    );
}

// ==================================================
// SUSPENSE WRAPPER
// ==================================================

export default function Products() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-[#fff8f3]">
                    <p className="text-gray-500 text-lg">
                        Loading products...
                    </p>
                </div>
            }
        >
            <ProductsContent />
        </Suspense>
    );
}
