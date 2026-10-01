
"use client";

import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
};

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
};

type ShippingDetails = {
    full_name: string;
    address_line1: string;
    address_line2?: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    phone: string;
    alternate_phone?: string;
    address_type?: string;
};

type PaymentType = {
    id: number;
    name: string;
    code: string;
};

export default function CheckoutSummary() {
    const [user, setUser] = useState<User | null>(null);
    const [product, setProduct] = useState<Product | null>(null);
    const [shippingDetails, setShippingDetails] =
        useState<ShippingDetails | null>(null);

    const [paymentTypes, setPaymentTypes] =
        useState<PaymentType[]>([]);

    // COD default
    const [paymentMethod, setPaymentMethod] =
        useState("COD");

    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] =
        useState(true);

    const [placingOrder, setPlacingOrder] =
        useState(false);

    // =====================================================
    // FETCH PAYMENT TYPES
    // =====================================================

    const fetchPaymentTypes = async () => {
        try {
            setPaymentLoading(true);

            const response = await fetch(
                "/api/checkout/payment/types",
                {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                }
            );

            const data = await response.json();

            console.log(
                "Payment Types API Response:",
                data
            );

            if (!response.ok || !data.success) {
                console.error(
                    data.message ||
                        "Failed to fetch payment types"
                );

                setPaymentTypes([]);
                return;
            }

            const types: PaymentType[] =
                data.paymentTypes || [];

            setPaymentTypes(types);

            // =================================================
            // COD KO DEFAULT SELECT KARO
            // =================================================

            const codPayment = types.find(
                (type) =>
                    type.code.toUpperCase() === "COD"
            );

            if (codPayment) {
                setPaymentMethod(codPayment.code);
            } else if (types.length > 0) {
                setPaymentMethod(types[0].code);
            }
        } catch (error) {
            console.error(
                "Payment Types Fetch Error:",
                error
            );

            setPaymentTypes([]);
        } finally {
            setPaymentLoading(false);
        }
    };

    // =====================================================
    // OPEN SHIPPING ADDRESS PAGE
    // =====================================================

    const shippingAddress = (userId: number) => {
        if (!userId) {
            alert(
                "User information is not available"
            );
            return;
        }

        window.location.href =
            `/checkout/address?user_id=${userId}`;
    };

    // =====================================================
    // FETCH SHIPPING ADDRESS
    // =====================================================

    const fetchShippingAddress = async (
        userId: number
    ) => {
        try {
            if (!userId) {
                console.log("User ID missing");
                return;
            }

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

            if (response.status === 401) {
                setShippingDetails(null);
                return;
            }

            if (!response.ok || !data.success) {
                setShippingDetails(null);
                return;
            }

            if (
                data.hasAddress === true &&
                data.userDetails
            ) {
                setShippingDetails(
                    data.userDetails
                );
            } else {
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
    // FETCH CHECKOUT DATA
    // =====================================================

    useEffect(() => {
        const fetchCheckoutData = async () => {
            try {
                const params = new URLSearchParams(
                    window.location.search
                );

                const productId =
                    params.get("product_id");

                const quantityParam =
                    params.get("quantity");

                // =================================================
                // PRODUCT ID CHECK
                // =================================================

                if (!productId) {
                    alert("Product ID is missing");
                    return;
                }

                // =================================================
                // QUANTITY
                // =================================================

                const currentQuantity =
                    Number(quantityParam || 1);

                if (
                    !Number.isInteger(
                        currentQuantity
                    ) ||
                    currentQuantity <= 0
                ) {
                    alert("Invalid quantity");
                    return;
                }

                setQuantity(currentQuantity);

                // =================================================
                // FETCH CHECKOUT DATA
                // =================================================

                const response = await fetch(
                    `/api/checkout?product_id=${productId}`,
                    {
                        method: "GET",
                        credentials: "include",
                        cache: "no-store",
                    }
                );

                const data = await response.json();

                console.log(
                    "Checkout API Response:",
                    data
                );

                // =================================================
                // LOGIN CHECK
                // =================================================

                if (
                    response.status === 401 ||
                    data.loggedIn === false
                ) {
                    alert("Please login first");

                    window.location.href =
                        "/login";

                    return;
                }

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
                // USER
                // =================================================

                if (!data.user) {
                    alert(
                        "User information not found"
                    );

                    return;
                }

                setUser(data.user);

                // =================================================
                // PRODUCT
                // =================================================

                if (data.product) {
                    setProduct(data.product);
                }

                // =================================================
                // SHIPPING ADDRESS
                // =================================================

                const currentUserId =
                    Number(data.user.id);

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
        fetchPaymentTypes();
    }, []);

    // =====================================================
    // PLACE ORDER
    // =====================================================

    const handlePlaceOrder = async () => {
        if (!user) {
            alert(
                "User information is not available"
            );
            return;
        }

        if (!product) {
            alert(
                "Product information is not available"
            );
            return;
        }

        if (!shippingDetails) {
            alert(
                "Please add your shipping address before placing the order."
            );
            return;
        }

        if (!paymentMethod) {
            alert(
                "Please select a payment method."
            );
            return;
        }

        // =================================================
        // ONLY COD FOR NOW
        // =================================================

        if (
            paymentMethod.toUpperCase() !== "COD"
        ) {
            alert(
                "Online payment will be available later."
            );

            return;
        }

        try {
            setPlacingOrder(true);

            // =================================================
            // GET PRODUCT ID FROM URL
            // =================================================

            const params = new URLSearchParams(
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

            // =================================================
            // CALL PLACE ORDER API
            // =================================================

            const response = await fetch(
                `/api/orders?product_id=${productId}&quantity=${quantity}`,
                {
                    method: "POST",
                    credentials: "include",
                    cache: "no-store",
                }
            );

            const data = await response.json();

            console.log(
                "Place Order API Response:",
                data
            );

            // =================================================
            // LOGIN CHECK
            // =================================================

            if (
                response.status === 401 ||
                data.loggedIn === false
            ) {
                alert("Please login first");

                window.location.href =
                    "/login";

                return;
            }

            // =================================================
            // API ERROR
            // =================================================

            if (
                !response.ok ||
                !data.success
            ) {
                alert(
                    data.message ||
                        "Failed to place order"
                );

                return;
            }

            // =================================================
            // SUCCESS
            // =================================================

            alert(
                `Order placed successfully!\nOrder ID: ${data.order_id}`
            );

            console.log(
                "Created Order ID:",
                data.order_id
            );

            // =================================================
            // TEMPORARY REDIRECT
            // =================================================
            // Abhi order success ke baad products page.
            // Baad mein Order Success page bana sakte hain.

            window.location.href =
                "/products";
        } catch (error) {
            console.error(
                "Place Order Error:",
                error
            );

            alert(
                "Something went wrong while placing the order."
            );
        } finally {
            setPlacingOrder(false);
        }
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="min-h-screen bg-[#fff8f3] flex items-center justify-center">
                <h1 className="font-playfair text-2xl font-semibold text-gray-700">
                    Loading order summary...
                </h1>
            </div>
        );
    }

    // =====================================================
    // CALCULATE TOTAL
    // =====================================================

    const totalAmount = product
        ? Number(product.price) * quantity
        : 0;

    // =====================================================
    // PAGE
    // =====================================================

    return (
        <div className="min-h-screen bg-[#fff8f3] py-10 px-5">
            <div className="max-w-6xl mx-auto">

                {/* =====================================================
                    HEADER
                ===================================================== */}

                <div className="mt-12 mb-8">
                    <h1 className="font-playfair text-4xl font-bold text-gray-800">
                        Order Summary
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Review your order details before placing your order.
                    </p>

                    <div className="w-16 h-1 bg-[#F06A55] mt-3 rounded-full" />
                </div>

                {/* =====================================================
                    CHECKOUT STEPS
                ===================================================== */}

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-7">
                    <div className="flex items-center justify-between max-w-2xl mx-auto">

                        {/* ADDRESS */}

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#F06A55] text-white flex items-center justify-center font-semibold">
                                ✓
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    Address
                                </p>

                                <p className="text-xs text-gray-400">
                                    Completed
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 h-px bg-gray-200 mx-5" />

                        {/* ORDER SUMMARY */}

                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#F06A55] text-white flex items-center justify-center font-semibold">
                                2
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    Order Summary
                                </p>

                                <p className="text-xs text-gray-400">
                                    Current step
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 h-px bg-gray-200 mx-5" />

                        {/* PAYMENT */}

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

                {/* =====================================================
                    MAIN GRID
                ===================================================== */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

                    {/* =================================================
                        LEFT
                    ================================================= */}

                    <div className="lg:col-span-2 space-y-6">

                        {/* =================================================
                            CUSTOMER INFORMATION
                        ================================================= */}

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

                            <div className="flex items-center justify-between mb-5">

                                <div>
                                    <h2 className="font-playfair text-2xl font-semibold text-gray-800">
                                        Customer Information
                                    </h2>

                                    <p className="text-sm text-gray-400 mt-1">
                                        Your account details
                                    </p>
                                </div>

                                <span className="text-xs bg-[#fff0eb] text-[#F06A55] px-3 py-1.5 rounded-full font-medium">
                                    Verified
                                </span>

                            </div>

                            {user && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className="bg-[#fff8f3] rounded-xl p-4">
                                        <p className="text-xs text-gray-400 mb-1">
                                            Full Name
                                        </p>

                                        <p className="font-medium text-gray-800">
                                            {user.name}
                                        </p>
                                    </div>

                                    <div className="bg-[#fff8f3] rounded-xl p-4">
                                        <p className="text-xs text-gray-400 mb-1">
                                            Email Address
                                        </p>

                                        <p className="font-medium text-gray-800 break-all">
                                            {user.email}
                                        </p>
                                    </div>

                                </div>
                            )}

                        </div>

                        {/* =================================================
                            SHIPPING ADDRESS
                        ================================================= */}

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

                            <div className="flex items-center justify-between mb-5">

                                <div>
                                    <h2 className="font-playfair text-2xl font-semibold text-gray-800">
                                        Shipping Address
                                    </h2>

                                    <p className="text-sm text-gray-400 mt-1">
                                        Your order will be delivered here
                                    </p>
                                </div>

                                {shippingDetails && (
                                    <span className="text-xs bg-green-50 text-green-600 px-3 py-1.5 rounded-full font-medium">
                                        ✓ Saved
                                    </span>
                                )}

                            </div>

                            {shippingDetails ? (
                                <div className="bg-[#fff8f3] rounded-xl p-5">

                                    <div className="flex items-start justify-between">

                                        <div>

                                            <div className="flex items-center gap-3 mb-3">

                                                <h3 className="font-semibold text-lg text-gray-800">
                                                    {shippingDetails.full_name}
                                                </h3>

                                                {shippingDetails.address_type && (
                                                    <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                                                        {shippingDetails.address_type}
                                                    </span>
                                                )}

                                            </div>

                                            <p className="text-gray-600 leading-6">

                                                {shippingDetails.address_line1}

                                                {shippingDetails.address_line2 && (
                                                    <>
                                                        ,{" "}
                                                        {shippingDetails.address_line2}
                                                    </>
                                                )}

                                                {shippingDetails.landmark && (
                                                    <>
                                                        ,{" "}
                                                        {shippingDetails.landmark}
                                                    </>
                                                )}

                                            </p>

                                            <p className="text-gray-600 mt-1">

                                                {shippingDetails.city},{" "}

                                                {shippingDetails.state} -{" "}

                                                <span className="font-medium">
                                                    {shippingDetails.pincode}
                                                </span>

                                            </p>

                                            <p className="text-gray-600 mt-1">
                                                {shippingDetails.country}
                                            </p>

                                            <p className="text-gray-600 mt-3">

                                                <span className="font-medium">
                                                    Phone:
                                                </span>{" "}

                                                {shippingDetails.phone}

                                            </p>

                                            {shippingDetails.alternate_phone && (
                                                <p className="text-gray-600 mt-1">

                                                    <span className="font-medium">
                                                        Alternate Phone:
                                                    </span>{" "}

                                                    {shippingDetails.alternate_phone}

                                                </p>
                                            )}

                                        </div>

                                    </div>

                                    {/* EDIT ADDRESS */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            shippingAddress(
                                                Number(user?.id)
                                            )
                                        }
                                        className="mt-5 text-sm font-medium text-[#F06A55] hover:underline"
                                    >
                                        Edit Shipping Address
                                    </button>

                                </div>
                            ) : (

                                <div className="bg-[#fff8f3] border border-dashed border-gray-300 rounded-xl p-6 text-center">

                                    <div className="text-4xl mb-3">
                                        📍
                                    </div>

                                    <p className="text-gray-500">
                                        No shipping address found.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            shippingAddress(
                                                Number(user?.id)
                                            )
                                        }
                                        className="mt-4 bg-[#F06A55] hover:bg-[#e45b47] text-white font-medium py-2.5 px-5 rounded-lg transition"
                                    >
                                        Add Shipping Address
                                    </button>

                                </div>
                            )}

                        </div>

                        {/* =================================================
                            PRODUCT DETAILS
                        ================================================= */}

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

                            <div className="flex items-center justify-between mb-5">

                                <div>
                                    <h2 className="font-playfair text-2xl font-semibold text-gray-800">
                                        Product Details
                                    </h2>

                                    <p className="text-sm text-gray-400 mt-1">
                                        Item included in your order
                                    </p>
                                </div>

                                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
                                    {quantity}{" "}
                                    {quantity === 1
                                        ? "Item"
                                        : "Items"}
                                </span>

                            </div>

                            {product && (

                                <div className="flex flex-col sm:flex-row gap-5 bg-[#fff8f3] rounded-xl p-5">

                                    <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-white shrink-0">

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

                                    <div className="flex-1">

                                        <h3 className="font-playfair text-xl font-semibold text-gray-800">
                                            {product.title}
                                        </h3>

                                        <span className="inline-block mt-2 bg-[#fff0eb] text-[#F06A55] px-3 py-1 rounded-full text-xs font-medium">
                                            {product.category}
                                        </span>

                                        <p className="text-sm text-gray-500 mt-3 leading-5 line-clamp-2">
                                            {product.description}
                                        </p>

                                        <div className="flex items-center justify-between mt-4">

                                            <div>
                                                <span className="text-sm text-gray-400 block">
                                                    Price
                                                </span>

                                                <span className="text-sm text-gray-500">
                                                    ₹{product.price} × {quantity}
                                                </span>
                                            </div>

                                            <span className="text-xl font-bold text-gray-800">
                                                ₹
                                                {totalAmount}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            )}

                        </div>

                    </div>

                    {/* =================================================
                        RIGHT - PAYMENT
                    ================================================= */}

                    <div className="lg:col-span-1">

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-8">

                            <h2 className="font-playfair text-2xl font-semibold text-gray-800">
                                Payment
                            </h2>

                            <p className="text-sm text-gray-400 mt-1 mb-6">
                                Choose your preferred payment method
                            </p>

                            {/* =================================================
                                PAYMENT METHODS
                            ================================================= */}

                            {paymentLoading ? (

                                <div className="text-sm text-gray-400">
                                    Loading payment methods...
                                </div>

                            ) : paymentTypes.length === 0 ? (

                                <div className="text-sm text-red-500">
                                    No payment methods available.
                                </div>

                            ) : (

                                <div className="space-y-3">

                                    {paymentTypes.map(
                                        (type) => {

                                            const isSelected =
                                                paymentMethod.toUpperCase() ===
                                                type.code.toUpperCase();

                                            const isCOD =
                                                type.code.toUpperCase() ===
                                                "COD";

                                            return (

                                                <button
                                                    key={type.id}
                                                    type="button"
                                                    onClick={() =>
                                                        setPaymentMethod(
                                                            type.code
                                                        )
                                                    }
                                                    className={`w-full text-left p-4 rounded-xl border transition ${
                                                        isSelected
                                                            ? "border-[#F06A55] bg-[#fff8f3]"
                                                            : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                                >

                                                    <div className="flex items-center gap-3">

                                                        <div
                                                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                                                                isCOD
                                                                    ? "bg-gray-100"
                                                                    : "bg-[#fff0eb]"
                                                            }`}
                                                        >
                                                            {isCOD
                                                                ? "💵"
                                                                : "💳"}
                                                        </div>

                                                        <div className="flex-1">

                                                            <p className="font-semibold text-gray-800">
                                                                {type.name}
                                                            </p>

                                                            <p className="text-xs text-gray-400 mt-1">
                                                                {isCOD
                                                                    ? "Pay when your order arrives"
                                                                    : "UPI, Card, Net Banking"}
                                                            </p>

                                                        </div>

                                                        <div
                                                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                                                isSelected
                                                                    ? "border-[#F06A55]"
                                                                    : "border-gray-300"
                                                            }`}
                                                        >

                                                            {isSelected && (
                                                                <div className="w-2.5 h-2.5 rounded-full bg-[#F06A55]" />
                                                            )}

                                                        </div>

                                                    </div>

                                                </button>

                                            );
                                        }
                                    )}

                                </div>

                            )}

                            {/* =================================================
                                PRICE DETAILS
                            ================================================= */}

                            <div className="border-t border-gray-200 mt-6 pt-5">

                                <h3 className="font-semibold text-gray-800 mb-4">
                                    Price Details
                                </h3>

                                {product && (

                                    <div className="space-y-3">

                                        <div className="flex justify-between text-sm text-gray-600">

                                            <span>
                                                Product Price
                                            </span>

                                            <span>
                                                ₹{product.price}
                                            </span>

                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600">

                                            <span>
                                                Quantity
                                            </span>

                                            <span>
                                                {quantity}
                                            </span>

                                        </div>

                                        <div className="flex justify-between text-sm text-gray-600">

                                            <span>
                                                Shipping
                                            </span>

                                            <span className="text-green-600 font-medium">
                                                Free
                                            </span>

                                        </div>

                                        <div className="border-t border-gray-100 pt-4 mt-4 flex justify-between items-center">

                                            <span className="font-semibold text-gray-800">
                                                Total Amount
                                            </span>

                                            <span className="text-2xl font-bold text-gray-800">
                                                ₹{totalAmount}
                                            </span>

                                        </div>

                                    </div>

                                )}

                            </div>

                            {/* =================================================
                                SECURITY
                            ================================================= */}

                            <div className="bg-[#f0faf7] rounded-xl p-4 mt-6">

                                <div className="flex gap-3">

                                    <div className="text-lg">
                                        🔒
                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold text-gray-700">
                                            Secure Checkout
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1 leading-5">
                                            Your order information is protected.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* =================================================
                                PLACE ORDER
                            ================================================= */}

                            <button
                                type="button"
                                onClick={handlePlaceOrder}
                                disabled={
                                    !shippingDetails ||
                                    placingOrder ||
                                    paymentLoading ||
                                    paymentTypes.length === 0
                                }
                                className={`w-full mt-6 text-white py-3.5 rounded-xl font-semibold transition shadow-sm ${
                                    shippingDetails &&
                                    !placingOrder &&
                                    !paymentLoading &&
                                    paymentTypes.length > 0
                                        ? "bg-[#F06A55] hover:bg-[#e45b47]"
                                        : "bg-gray-300 cursor-not-allowed"
                                }`}
                            >

                                {placingOrder
                                    ? "Placing Order..."
                                    : paymentMethod.toUpperCase() ===
                                      "COD"
                                    ? "Place Order"
                                    : `Pay ₹${totalAmount}`}

                            </button>

                            {!shippingDetails && (

                                <p className="text-xs text-red-500 text-center mt-2">
                                    Please add a shipping address first.
                                </p>

                            )}

                            {/* =================================================
                                CONTINUE SHOPPING
                            ================================================= */}

                            <button
                                type="button"
                                disabled={placingOrder}
                                onClick={() => {
                                    window.location.href =
                                        "/products";
                                }}
                                className="w-full mt-3 border border-gray-300 hover:border-[#F06A55] hover:text-[#F06A55] text-gray-700 py-3 rounded-xl font-medium transition"
                            >
                                Continue Shopping
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}
