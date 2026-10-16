
"use client";

import { useEffect, useState } from "react";

export default function Checkout() {
    const [user, setUser] = useState<any>(null);
    const [product, setProduct] = useState<any>(null);
    const [shippingDetails, setShippingDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    








    // =====================================================
    // Order summary page
    // =====================================================



    const ordersummary = async (productId: number) => {
        try {
            const response = await fetch(
                `/api/checkout?product_id=${productId}`,
                {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                }
            );

            const data = await response.json();

            console.log("Checkout API Response:", data);

            // User is not logged in
            if (response.status === 401 || data.loggedIn === false) {
                alert("Please login first");
                return;
            }

            // Any other error
            if (!response.ok || !data.success) {
                alert(data.message || "Something went wrong");
                return;
            }

            // User is logged in
            const checkoutUrl = `/checkout/summary?product_id=${productId}`;

            console.log("Checkout URL:", checkoutUrl);

            window.location.href = checkoutUrl;

        } catch (error) {
            console.error("Buy Now Error:", error);
            alert("Something went wrong. Please try again.");
        }
    };










    // =====================================================
    // OPEN SHIPPING ADDRESS PAGE
    // =====================================================

    const shippingAddress = (userId: number) => {
        if (!userId) {
            alert("User information is not available");
            return;
        }

        window.location.href =
            `/checkout/address?user_id=${userId}`;
    };

    // =====================================================
    // FETCH SHIPPING ADDRESS
    // =====================================================

    const fetchShippingAddress = async (userId: number) => {
        try {
            if (!userId) {
                console.log("User ID missing");
                return;
            }

            console.log(
                "Fetching shipping address for User ID:",
                userId
            );

            const response = await fetch(
                `/api/checkout/userdetails?user_id=${userId}`,
                {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                }
            );

            const data = await response.json();

            console.log(
                "Shipping Address API Response:",
                data
            );

            // =================================================
            // LOGIN ERROR
            // =================================================

            if (response.status === 401) {
                console.log(
                    "Shipping address API returned 401"
                );

                setShippingDetails(null);
                return;
            }

            // =================================================
            // OTHER ERROR
            // =================================================

            if (!response.ok || !data.success) {
                console.error(
                    "Shipping Address Error:",
                    data.message
                );

                setShippingDetails(null);
                return;
            }

            // =================================================
            // ADDRESS FOUND
            // =================================================

            if (
                data.hasAddress === true &&
                data.userDetails
            ) {
                console.log(
                    "Shipping Address Found:",
                    data.userDetails
                );

                setShippingDetails(
                    data.userDetails
                );
            } else {
                console.log(
                    "No shipping address found"
                );

                setShippingDetails(null);
            }
        } catch (error) {
            console.error(
                "Shipping Address Fetch Error:",
                error
            );

            setShippingDetails(null);
        }
    };

    // =====================================================
    // DELETE SHIPPING ADDRESS
    // =====================================================

    const deleteShippingAddress = async (
        addressId: number
    ) => {
        try {
            const confirmDelete =
                window.confirm(
                    "Are you sure you want to delete this address?"
                );

            if (!confirmDelete) {
                return;
            }

            const response = await fetch(
                "/api/checkout/address",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        id: addressId,
                    }),
                }
            );

            const data =
                await response.json();

            console.log(
                "Delete Address Response:",
                data
            );

            if (response.status === 401) {
                alert("Please login first");
                return;
            }

            if (
                !response.ok ||
                !data.success
            ) {
                alert(
                    data.message ||
                    "Address could not be deleted"
                );
                return;
            }

            alert(
                "Address deleted successfully"
            );

            // Delete ke baad latest address fetch karo
            if (user?.id) {
                await fetchShippingAddress(
                    Number(user.id)
                );
            }
        } catch (error) {
            console.error(
                "Delete Address Error:",
                error
            );

            alert(
                "Something went wrong while deleting address"
            );
        }
    };

    // =====================================================
    // FETCH CHECKOUT DATA
    // =====================================================

    useEffect(() => {
        const fetchCheckoutData = async () => {
            try {
                // =================================================
                // GET PRODUCT ID FROM URL
                // =================================================

                const params =
                    new URLSearchParams(
                        window.location.search
                    );

                const productId =
                    params.get("product_id");

                if (!productId) {
                    alert(
                        "Product ID is missing"
                    );
                    return;
                }

                console.log(
                    "Product ID:",
                    productId
                );

                // =================================================
                // CHECKOUT API
                // Current logged-in user + product
                // =================================================

                const response =
                    await fetch(
                        `/api/checkout?product_id=${productId}`,
                        {
                            method: "GET",
                            credentials:
                                "include",
                            cache: "no-store",
                        }
                    );

                const data =
                    await response.json();

                console.log(
                    "Checkout API Response:",
                    data
                );

                // =================================================
                // ACTUAL LOGIN FAILURE
                // =================================================

                if (
                    response.status === 401 ||
                    data.loggedIn === false
                ) {
                    alert(
                        "Please login first"
                    );

                    window.location.href =
                        "/login";

                    return;
                }

                // =================================================
                // OTHER CHECKOUT ERROR
                // =================================================

                if (
                    !response.ok ||
                    !data.success
                ) {
                    alert(
                        data.message ||
                        "Something went wrong"
                    );

                    return;
                }

                // =================================================
                // USER DATA
                // =================================================

                if (!data.user) {
                    alert(
                        "User information not found"
                    );

                    return;
                }

                console.log(
                    "Logged-in User:",
                    data.user
                );

                setUser(data.user);

                // =================================================
                // PRODUCT DATA
                // =================================================

                if (data.product) {
                    setProduct(
                        data.product
                    );
                }

                // =================================================
                // SHIPPING ADDRESS
                // =================================================

                const currentUserId =
                    Number(data.user.id);

                console.log(
                    "Current User ID:",
                    currentUserId
                );

                await fetchShippingAddress(
                    currentUserId
                );
            } catch (error) {
                console.error(
                    "Checkout Error:",
                    error
                );

                alert(
                    "Failed to load checkout data"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCheckoutData();
    }, []);

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fff8f3] flex items-center justify-center">
                <h1 className="font-playfair text-2xl font-semibold text-gray-700">
                    Loading checkout...
                </h1>
            </div>
        );
    }

    // =====================================================
    // CHECKOUT PAGE
    // =====================================================

    return (
        <div className="min-h-screen bg-[#fff8f3] py-10 px-5">

            <div className="max-w-6xl mx-auto">

                {/* =================================================
                    PAGE HEADING
                ================================================= */}

                <div className="mb-8 mt-12 flex">

                    <div>
                        <h1 className="font-playfair text-4xl font-bold text-gray-800">
                            Checkout
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Review your details and product before placing your order.
                        </p>

                        <div className="w-16 h-1 bg-[#F06A55] mt-3 rounded-full"></div>
                    </div>

                    {/* ADD SHIPPING ADDRESS */}

                    <div className="ml-auto">

                        <button
                            type="button"
                            onClick={() =>
                                shippingAddress(
                                    Number(
                                        user?.id
                                    )
                                )
                            }
                            className="mt-4 bg-[#F06A55] hover:bg-[#d9534f] text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                        >
                            Add Shipping Address
                        </button>

                    </div>

                </div>

                 {/* =====================================================
                    CHECKOUT STEPS
                ===================================================== */}

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-7">

                    <div className="flex items-center justify-between max-w-2xl mx-auto">

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#F06A55] text-white flex items-center justify-center font-semibold">
                                1
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    Address
                                </p>

                                <p className="text-xs text-gray-400">
                                    Current Step
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 h-px bg-gray-200 mx-5" />

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#F06A55] text-white flex items-center justify-center font-semibold">
                                2
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    Order Summary
                                </p>

                                <p className="text-xs text-gray-400">
                                    Next step
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 h-px bg-gray-200 mx-5" />

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-semibold">
                                3
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-400">
                                    Payment
                                </p>

                                <p className="text-xs text-gray-300">
                                    Pending
                                </p>
                            </div>
                        </div>

                    </div>
                </div>




                {/* =================================================
                    MAIN CHECKOUT LAYOUT
                ================================================= */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

                    {/* =================================================
                        LEFT SECTION
                    ================================================= */}

                    <div className="lg:col-span-2 space-y-6">

                        {/* =================================================
                            USER INFORMATION
                        ================================================= */}

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

                            <div className="flex items-center justify-between mb-5">

                                <h2 className="font-playfair text-2xl font-semibold text-gray-800">
                                    User Information
                                </h2>

                            </div>

                            {user && (
                                <div className="bg-[#fff8f3] rounded-xl p-5 space-y-4">

                                    <div className="flex items-center justify-between border-b border-gray-200 pb-3">

                                        <span className="text-gray-500">
                                            Name
                                        </span>

                                        <span className="font-medium text-gray-800">
                                            {user.name}
                                        </span>

                                    </div>

                                    <div className="flex items-center justify-between">

                                        <span className="text-gray-500">
                                            Email
                                        </span>

                                        <span className="font-medium text-gray-800">
                                            {user.email}
                                        </span>

                                    </div>

                                </div>
                            )}

                        </div>

                        {/* =================================================
                            SHIPPING ADDRESS
                        ================================================= */}

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

                            <div className="flex items-center justify-between mb-5">

                                <h2 className="font-playfair text-2xl font-semibold text-gray-800">
                                    Shipping Address
                                </h2>

                                {/* DELETE */}

                                {shippingDetails && (
                                    <button
                                        type="button"
                                        onClick={() => {

                                            const addressId =
                                                Number(
                                                    shippingDetails.user_details_id
                                                );

                                            if (
                                                !Number.isNaN(
                                                    addressId
                                                )
                                            ) {
                                                deleteShippingAddress(
                                                    addressId
                                                );
                                            }

                                        }}
                                        className="text-[#F06A55] font-medium hover:underline"
                                    >
                                        Delete
                                    </button>
                                )}

                            </div>

                            {/* =================================================
                                ADDRESS EXISTS
                            ================================================= */}

                            {shippingDetails ? (

                                <div className="bg-[#fff8f3] rounded-xl p-5">

                                    {/* NAME + ADDRESS TYPE */}

                                    <div className="flex items-center gap-3 mb-3">

                                        <h3 className="font-semibold text-lg text-gray-800">
                                            {
                                                shippingDetails.full_name
                                            }
                                        </h3>

                                        {shippingDetails.address_type && (
                                            <span className="text-xs font-medium bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                                                {
                                                    shippingDetails.address_type
                                                }
                                            </span>
                                        )}

                                    </div>

                                    {/* ADDRESS */}

                                    <p className="text-gray-600 leading-6">

                                        {
                                            shippingDetails.address_line1
                                        }

                                        {shippingDetails.address_line2 && (
                                            <>
                                                ,{" "}
                                                {
                                                    shippingDetails.address_line2
                                                }
                                            </>
                                        )}

                                        {shippingDetails.landmark && (
                                            <>
                                                ,{" "}
                                                {
                                                    shippingDetails.landmark
                                                }
                                            </>
                                        )}

                                    </p>

                                    {/* CITY / STATE / PINCODE */}

                                    <p className="text-gray-600 mt-1">

                                        {
                                            shippingDetails.city
                                        }
                                        ,{" "}

                                        {
                                            shippingDetails.state
                                        }{" "}

                                        -{" "}

                                        <span className="font-medium">
                                            {
                                                shippingDetails.pincode
                                            }
                                        </span>

                                    </p>

                                    {/* COUNTRY */}

                                    <p className="text-gray-600 mt-1">

                                        Country:{" "}

                                        {
                                            shippingDetails.country
                                        }

                                    </p>

                                    {/* PHONE */}

                                    <p className="text-gray-600 mt-3">

                                        <span className="font-medium">
                                            Phone:
                                        </span>{" "}

                                        {
                                            shippingDetails.phone
                                        }

                                    </p>

                                    {/* ALTERNATE PHONE */}

                                    {shippingDetails.alternate_phone && (
                                        <p className="text-gray-600 mt-1">

                                            <span className="font-medium">
                                                Alternate Phone:
                                            </span>{" "}

                                            {
                                                shippingDetails.alternate_phone
                                            }

                                        </p>
                                    )}

                                </div>

                            ) : (

                                /* =================================================
                                    NO ADDRESS
                                ================================================= */

                                <div className="bg-[#fff8f3] rounded-xl p-5">

                                    <p className="text-gray-500 mb-4">
                                        You have not added a shipping address yet.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            shippingAddress(
                                                Number(
                                                    user?.id
                                                )
                                            )
                                        }
                                        className="bg-[#F06A55] hover:bg-[#d9534f] text-white font-medium py-2 px-5 rounded-lg transition"
                                    >
                                        Add Shipping Address
                                    </button>

                                </div>
                            )}

                        </div>

                        {/* =================================================
                            PRODUCT INFORMATION
                        ================================================= */}

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

                            <h2 className="font-playfair text-2xl font-semibold text-gray-800 mb-5">
                                Product Information
                            </h2>

                            {product && (
                                <div className="flex flex-col md:flex-row gap-6">

                                    {/* IMAGE */}

                                    <div className="w-full md:w-56 h-56 bg-[#fff8f3] rounded-xl overflow-hidden shrink-0">

                                        {product.image ? (

                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full h-full object-cover"
                                            />

                                        ) : (

                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                No Image
                                            </div>

                                        )}

                                    </div>

                                    {/* DETAILS */}

                                    <div className="flex-1">

                                        <h3 className="font-playfair text-2xl font-semibold text-gray-800 mb-2">
                                            {
                                                product.title
                                            }
                                        </h3>

                                        <span className="inline-block bg-[#fff0eb] text-[#F06A55] px-3 py-1 rounded-full text-sm font-medium mb-4">
                                            {
                                                product.category
                                            }
                                        </span>

                                        <p className="text-gray-500 leading-6 mb-5">
                                            {
                                                product.description
                                            }
                                        </p>

                                        <div className="grid grid-cols-2 gap-4">

                                            <div>

                                                <p className="text-sm text-gray-400">
                                                    Price
                                                </p>

                                                <p className="text-xl font-semibold text-gray-800">
                                                    ₹
                                                    {
                                                        product.price
                                                    }
                                                </p>

                                            </div>

                                            <div>

                                                <p className="text-sm text-gray-400">
                                                    Available Stock
                                                </p>

                                                <p className="text-lg font-medium text-gray-800">
                                                    {
                                                        product.stock
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            )}

                        </div>

                    </div>

                    {/* =================================================
                        RIGHT SECTION
                    ================================================= */}

                    <div className="lg:col-span-1">

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-8">

                            <h2 className="font-playfair text-2xl font-semibold text-gray-800 mb-6">
                                Checkout Summary
                            </h2>

                            {product && (
                                <>

                                    {/* PRODUCT PREVIEW */}

                                    <div className="flex gap-4 pb-5 border-b border-gray-200">

                                        {product.image && (
                                            <img
                                                src={
                                                    product.image
                                                }
                                                alt={
                                                    product.title
                                                }
                                                className="w-20 h-20 rounded-lg object-cover"
                                            />
                                        )}

                                        <div className="flex-1">

                                            <h3 className="font-medium text-gray-800 line-clamp-2">
                                                {
                                                    product.title
                                                }
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {
                                                    product.category
                                                }
                                            </p>

                                        </div>

                                    </div>

                                    {/* PRICE */}

                                    <div className="space-y-4 mt-5">

                                        <div className="flex justify-between text-gray-600">

                                            <span>
                                                Product Price
                                            </span>

                                            <span>
                                                ₹
                                                {
                                                    product.price
                                                }
                                            </span>

                                        </div>

                                        <div className="flex justify-between text-gray-600">

                                            <span>
                                                Shipping
                                            </span>

                                            <span className="text-green-600 font-medium">
                                                Free
                                            </span>

                                        </div>

                                    </div>

                                    {/* TOTAL */}

                                    <div className="border-t border-gray-200 mt-5 pt-5">

                                        <div className="flex justify-between items-center">

                                            <span className="text-lg font-semibold text-gray-800">
                                                Total Amount
                                            </span>

                                            <span className="text-2xl font-bold text-gray-800">
                                                ₹
                                                {
                                                    product.price
                                                }
                                            </span>

                                        </div>

                                    </div>

                                    {/* SECURE */}

                                    <div className="bg-[#f0faf7] rounded-xl p-4 mt-6">

                                        <p className="text-sm font-medium text-gray-700">
                                            🔒 Secure Checkout
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1 leading-5">
                                            Your information is safe and secure.
                                        </p>

                                    </div>

                                    {/* ORDER SUMMARY */}

                                    <button
                                        type="button"
                                        onClick={() => ordersummary(product.id)}
                                        className="w-full mt-6 bg-[#F06A55] hover:bg-[#e45b47] text-white py-3.5 rounded-xl font-semibold transition"
                                    >
                                        Order Summary
                                    </button>

                                    {/* CONTINUE SHOPPING */}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            window.location.href =
                                                "/products";
                                        }}
                                        className="w-full mt-3 border border-gray-300 hover:border-[#F06A55] hover:text-[#F06A55] text-gray-700 py-3 rounded-xl font-medium transition"
                                    >
                                        Continue Shopping
                                    </button>

                                </>
                            )}

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}
