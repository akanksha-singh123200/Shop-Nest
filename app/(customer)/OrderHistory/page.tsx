"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);



    const cancelOrder = async (orderId: number) => {
        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmCancel) return;

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
                alert(data.message || "Failed to cancel order");
                return;
            }

            alert("Order cancelled successfully");

            // Orders dobara fetch karne ke liye
            window.location.reload();

        } catch (error) {
            console.error("Cancel Order Error:", error);
            alert("Something went wrong");
        }
    };





    // =====================================================
    // FETCH ORDERS
    // =====================================================

    useEffect(() => {
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
                    setOrders(data.orders || []);
                }
            } catch (error) {
                console.error("Fetch Orders Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // =====================================================
    // GROUP ORDERS
    // =====================================================

    const groupedOrders = orders.reduce((acc: any, item: any) => {
        if (!acc[item.order_id]) {
            acc[item.order_id] = {
                order_id: item.order_id,
                user_id: item.user_id,
                total_amount: item.total_amount,
                order_status_id: item.order_status_id,
                order_status: item.order_status,
                payment_status_id: item.payment_status_id,
                payment_status: item.payment_status,
                shipping_address: item.shipping_address,
                created_at: item.created_at,
                items: [],
            };
        }

        acc[item.order_id].items.push({
            order_items_id: item.order_items_id,
            product_id: item.product_id,
            product_title: item.product_title,
            product_image: item.product_image,
            order_quantity: item.order_quantity,
            order_price: item.order_price,
        });

        return acc;
    }, {});

    const orderList = Object.values(groupedOrders);

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading orders...</p>
            </div>
        );
    }

    // =====================================================
    // PAGE
    // =====================================================

    return (
        <div className="min-h-screen bg-[#fff8f3] px-6 py-10">

            {/* PAGE HEADING */}

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800">
                    My Orders
                </h1>

                <p className="mt-2 text-gray-500">
                    View your order history and order details.
                </p>

                {/* NO ORDERS */}

                {orderList.length === 0 ? (
                    <div className="mt-10 bg-white rounded-2xl p-10 text-center shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-700">
                            No Orders Found
                        </h2>

                        <p className="mt-2 text-gray-500">
                            You have not placed any orders yet.
                        </p>

                        <button
                            onClick={() => {
                                window.location.href = "/customer";
                            }}
                            className="mt-6 px-6 py-3 rounded-lg bg-[#F06A55] text-white"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (

                    /* =================================================
                       ORDER LIST
                    ================================================= */

                    <div className="mt-8 space-y-6">

                        {orderList.map((order: any) => (

                            <div
                                key={order.order_id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                            >

                                {/* ORDER HEADER */}

                                <div className="px-6 py-5 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Order ID
                                        </p>

                                        <h2 className="text-lg font-semibold text-gray-800">
                                            #{order.order_id}
                                        </h2>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Order Date
                                        </p>

                                        <p className="font-medium text-gray-700">
                                            {new Date(
                                                order.created_at
                                            ).toLocaleDateString("en-IN")}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Order Status
                                        </p>

                                        <span className="inline-block mt-1 px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-700">
                                            {order.order_status}
                                        </span>
                                    </div>



                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Cancel Order
                                        </p>

                                        <button
                                            onClick={() => cancelOrder(order.order_id)}
                                            className="inline-block mt-1 px-3 py-1 rounded-full text-sm bg-red-100 text-red-700 hover:bg-red-200"
                                        >
                                            Cancel Order
                                        </button>
                                    </div>



                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Payment
                                        </p>

                                        <span className="inline-block mt-1 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                                            {order.payment_status}
                                        </span>
                                    </div>

                                </div>


                                {/* PRODUCTS */}

                                <div className="px-6 py-5">

                                    <h3 className="font-semibold text-gray-800 mb-4">
                                        Products
                                    </h3>

                                    <div className="space-y-4">

                                        {order.items.map((item: any) => (

                                            <div
                                                key={item.order_items_id}
                                                className="flex items-center gap-4 border-b pb-4 last:border-b-0"
                                            >

                                                {/* IMAGE */}

                                                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">

                                                    {item.product_image ? (
                                                        <img
                                                            src={item.product_image}
                                                            alt={item.product_title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                                            No Image
                                                        </div>
                                                    )}

                                                </div>


                                                {/* PRODUCT DETAILS */}

                                                <div className="flex-1">

                                                    <h4 className="font-medium text-gray-800">
                                                        {item.product_title}
                                                    </h4>

                                                    <p className="text-sm text-gray-500 mt-1">
                                                        Quantity: {item.order_quantity}
                                                    </p>

                                                </div>


                                                {/* PRICE */}

                                                <div className="text-right">

                                                    <p className="font-semibold text-gray-800">
                                                        ₹{item.order_price}
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        Qty: {item.order_quantity}
                                                    </p>

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                </div>


                                {/* ORDER FOOTER */}

                                <div className="px-6 py-5 bg-gray-50 border-t">

                                    <div className="flex flex-col md:flex-row gap-5 md:justify-between">

                                        {/* SHIPPING */}

                                        <div className="flex-1">

                                            <p className="text-sm font-semibold text-gray-700">
                                                Shipping Address
                                            </p>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {order.shipping_address}
                                            </p>

                                        </div>


                                        {/* TOTAL */}

                                        <div className="text-right">

                                            <p className="text-sm text-gray-500">
                                                Total Amount
                                            </p>

                                            <p className="text-2xl font-bold text-[#F06A55]">
                                                ₹{order.total_amount}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}