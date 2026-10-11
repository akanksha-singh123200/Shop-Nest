
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface OrderItem {
    order_items_id: number;
    product_id: number;
    product_title: string;
    product_image: string | null;
    order_quantity: number;
    order_price: number;
}

interface Order {
    order_id: number;
    user_id: number;
    total_amount: number;
    order_status_id: number;
    order_status: string;
    payment_status_id: number;
    payment_status: string;
    shipping_address: string;
    created_at: string;
    items: OrderItem[];
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [cancellingOrder, setCancellingOrder] = useState<number | null>(
        null
    );

    // =========================================
    // FETCH ORDERS
    // =========================================
    const fetchOrders = async () => {
        try {
            const response = await fetch("/api/OrderHistory", {
                method: "GET",
                credentials: "include",
                cache: "no-store",
            });

            const data = await response.json();

            if (response.status === 401 || !data.loggedIn) {
                window.location.href = "/login";
                return;
            }

            if (data.success) {
                // Group products belonging to the same order.
                const grouped: Record<number, Order> = {};

                (data.orders || []).forEach((item: any) => {
                    if (!grouped[item.order_id]) {
                        grouped[item.order_id] = {
                            order_id: item.order_id,
                            user_id: item.user_id,
                            total_amount: Number(item.total_amount),
                            order_status_id: item.order_status_id,
                            order_status: item.order_status,
                            payment_status_id: item.payment_status_id,
                            payment_status: item.payment_status,
                            shipping_address: item.shipping_address,
                            created_at: item.created_at,
                            items: [],
                        };
                    }

                    grouped[item.order_id].items.push({
                        order_items_id: item.order_items_id,
                        product_id: item.product_id,
                        product_title: item.product_title,
                        product_image: item.product_image,
                        order_quantity: Number(item.order_quantity),
                        order_price: Number(item.order_price),
                    });
                });

                setOrders(
                    Object.values(grouped).sort(
                        (a, b) =>
                            new Date(b.created_at).getTime() -
                            new Date(a.created_at).getTime()
                    )
                );
            }
        } catch (error) {
            console.error("Fetch Orders Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // =========================================
    // CANCEL ORDER
    // =========================================
    const cancelOrder = async (orderId: number) => {
        const confirmCancel = window.confirm(
            `Are you sure you want to cancel order #${orderId}?`
        );

        if (!confirmCancel) return;

        setCancellingOrder(orderId);

        try {
            const response = await fetch("/api/orders/cancel_order", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    order_id: orderId,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                alert(data.message || "Failed to cancel order.");
                return;
            }

            alert("Order cancelled successfully!");
            await fetchOrders();
        } catch (error) {
            console.error("Cancel Order Error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setCancellingOrder(null);
        }
    };

    // =========================================
    // STATUS COLORS
    // =========================================
    const getOrderStatusStyle = (status: string) => {
        switch (status?.toLowerCase()) {
            case "delivered":
                return "bg-green-50 text-green-700 ring-green-200";

            case "shipped":
                return "bg-blue-50 text-blue-700 ring-blue-200";

            case "processing":
                return "bg-indigo-50 text-indigo-700 ring-indigo-200";

            case "cancelled":
                return "bg-red-50 text-red-700 ring-red-200";

            case "pending":
                return "bg-amber-50 text-amber-700 ring-amber-200";

            default:
                return "bg-gray-100 text-gray-700 ring-gray-200";
        }
    };

    const getPaymentStatusStyle = (status: string) => {
        switch (status?.toLowerCase()) {
            case "paid":
                return "bg-green-50 text-green-700";

            case "pending":
                return "bg-amber-50 text-amber-700";

            case "failed":
                return "bg-red-50 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // =========================================
    // LOADING
    // =========================================
    if (loading) {
        return (
            <div className="min-h-screen bg-[#fff8f3] px-4 py-16">
                <div className="mx-auto max-w-5xl animate-pulse space-y-6">
                    <div className="h-9 w-52 rounded-lg bg-orange-100" />

                    <div className="h-5 w-80 max-w-full rounded bg-orange-50" />

                    {[1, 2].map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border border-orange-100 bg-white p-6"
                        >
                            <div className="h-5 w-40 rounded bg-gray-100" />
                            <div className="mt-6 flex gap-4">
                                <div className="h-20 w-20 rounded-xl bg-gray-100" />
                                <div className="flex-1 space-y-3">
                                    <div className="h-4 w-48 max-w-full rounded bg-gray-100" />
                                    <div className="h-4 w-28 rounded bg-gray-100" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // =========================================
    // PAGE
    // =========================================
    return (
        <main className="min-h-screen bg-[#fff8f3] px-4 py-8 sm:px-6 sm:py-12">
            <div className="mx-auto max-w-6xl">


                {/* PAGE HEADER */}
                <header className="relative z-10 mb-8 pt-6 sm:pt-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                        {/* HEADING */}
                        <div>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#F06A55]">
                                Your ShopNest Account
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                My Orders
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
                                Track your purchases and keep an eye on your deliveries.
                            </p>
                        </div>

                        {/* CONTINUE SHOPPING */}
                        <Link
                            href="/customer"
                            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition duration-200 hover:border-[#F06A55] hover:text-[#F06A55]"
                        >
                            <span aria-hidden="true">←</span>
                            Continue Shopping
                        </Link>

                    </div>
                </header>

                {/* ORDER SUMMARY */}
                {orders.length > 0 && (
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl">
                                    📦
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Orders
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-gray-900">
                                        {orders.length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                                    🛍️
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Order Value
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-[#F06A55]">
                                        ₹
                                        {orders
                                            .reduce(
                                                (sum, order) =>
                                                    sum +
                                                    Number(order.total_amount || 0),
                                                0
                                            )
                                            .toLocaleString("en-IN", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* EMPTY STATE */}
                {orders.length === 0 ? (
                    <div className="rounded-3xl border border-orange-100 bg-white px-5 py-14 text-center shadow-sm sm:py-20">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl">
                            🛍️
                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-gray-900">
                            No Orders Yet
                        </h2>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
                            Looks like you haven&apos;t placed an order yet.
                            Explore our collection and find something you love!
                        </p>

                        <Link
                            href="/customer"
                            className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#F06A55] px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#df5945]"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    /* ORDER LIST */
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <article
                                key={order.order_id}
                                className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:shadow-md"
                            >
                                {/* ORDER HEADER */}
                                <div className="border-b border-gray-100 bg-white px-5 py-5 sm:px-7">
                                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                                Order Number
                                            </p>

                                            <h2 className="mt-1 text-lg font-bold text-gray-900">
                                                #{order.order_id}
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Placed on{" "}
                                                {new Date(
                                                    order.created_at
                                                ).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <div>
                                                <p className="mb-2 text-xs font-medium text-gray-400">
                                                    ORDER STATUS
                                                </p>

                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${getOrderStatusStyle(
                                                        order.order_status
                                                    )}`}
                                                >
                                                    {order.order_status}
                                                </span>
                                            </div>

                                            <div>
                                                <p className="mb-2 text-xs font-medium text-gray-400">
                                                    PAYMENT
                                                </p>

                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getPaymentStatusStyle(
                                                        order.payment_status
                                                    )}`}
                                                >
                                                    {order.payment_status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* PRODUCTS */}
                                <div className="px-5 py-6 sm:px-7">
                                    <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-700">
                                        Order Items ({order.items.length})
                                    </h3>

                                    <div className="space-y-5">
                                        {order.items.map((item) => (
                                            <div
                                                key={item.order_items_id}
                                                className="flex flex-col gap-4 border-b border-gray-100 pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center"
                                            >
                                                {/* PRODUCT IMAGE */}
                                                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                                                    {item.product_image ? (
                                                        <img
                                                            src={item.product_image}
                                                            alt={item.product_title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                                            No Image
                                                        </div>
                                                    )}
                                                </div>

                                                {/* PRODUCT DETAILS */}
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="font-semibold leading-6 text-gray-900">
                                                        {item.product_title}
                                                    </h4>

                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Quantity:{" "}
                                                        {item.order_quantity}
                                                    </p>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Price per item: ₹
                                                        {Number(
                                                            item.order_price
                                                        ).toLocaleString("en-IN", {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })}
                                                    </p>
                                                </div>

                                                {/* ITEM TOTAL */}
                                                <div className="sm:min-w-28 sm:text-right">
                                                    <p className="text-xs text-gray-400">
                                                        Item Total
                                                    </p>

                                                    <p className="mt-1 text-lg font-bold text-gray-900">
                                                        ₹
                                                        {(
                                                            Number(item.order_price) *
                                                            Number(item.order_quantity)
                                                        ).toLocaleString("en-IN", {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* SHIPPING AND TOTAL */}
                                <div className="border-t border-gray-100 bg-gray-50/80 px-5 py-6 sm:px-7">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto]">

                                        {/* SHIPPING ADDRESS */}
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span aria-hidden="true">
                                                    📍
                                                </span>

                                                <h3 className="text-sm font-bold text-gray-800">
                                                    Delivery Address
                                                </h3>
                                            </div>

                                            <p className="mt-2 max-w-xl whitespace-pre-line wrap-break-words text-sm leading-6 text-gray-500">
                                                {order.shipping_address ||
                                                    "Shipping address unavailable"}
                                            </p>
                                        </div>

                                        {/* TOTAL AMOUNT */}
                                        <div className="border-t border-gray-200 pt-5 md:min-w-48 md:border-l md:border-t-0 md:pl-7 md:pt-0">
                                            <p className="text-sm text-gray-500">
                                                Order Total
                                            </p>

                                            <p className="mt-2 text-3xl font-bold text-[#F06A55]">
                                                ₹
                                                {Number(
                                                    order.total_amount
                                                ).toLocaleString("en-IN", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </p>

                                            <p className="mt-2 text-xs text-gray-400">
                                                {order.items.length} product
                                                {order.items.length !== 1
                                                    ? "s"
                                                    : ""}{" "}
                                                in this order
                                            </p>
                                        </div>
                                    </div>

                                    {/* CANCEL ORDER */}
                                    {["pending", "processing"].includes(
                                        order.order_status?.toLowerCase()
                                    ) && (
                                            <div className="mt-6 flex justify-end border-t border-gray-200 pt-5">
                                                <button
                                                    type="button"
                                                    disabled={
                                                        cancellingOrder ===
                                                        order.order_id
                                                    }
                                                    onClick={() =>
                                                        cancelOrder(order.order_id)
                                                    }
                                                    className="rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {cancellingOrder ===
                                                        order.order_id
                                                        ? "Cancelling..."
                                                        : "Cancel Order"}
                                                </button>
                                            </div>
                                        )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                {/* BOTTOM NOTE */}
                {orders.length > 0 && (
                    <p className="mt-8 text-center text-sm text-gray-500">
                        Need help with your order?{" "}
                        <Link
                            href="/contact"
                            className="font-semibold text-[#F06A55] hover:underline"
                        >
                            Contact us
                        </Link>
                    </p>
                )}
            </div>
        </main>
    );
}
