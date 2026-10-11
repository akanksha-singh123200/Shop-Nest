
"use client";

import { useEffect, useState } from "react";

import AdminNavbar from "@/components/AdminNavbar";

import Link from "next/link";

import { useRouter } from "next/navigation";

export default function Admin() {
    const router = useRouter();

    const [dashboardData, setDashboardData] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    // =====================================================
    // FETCH DASHBOARD DATA
    // =====================================================

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await fetch("/api/admin/dashboard", {
                    method: "GET",
                    credentials: "include",
                    cache: "no-store",
                });

                // =====================================================
                // ADMIN NOT AUTHENTICATED
                // =====================================================

                if (response.status === 401) {
                    router.replace("/admin/auth/login");
                    return;
                }

                const result = await response.json();

                if (result.success) {
                    setDashboardData(result.data);
                } else {
                    console.error(
                        "Dashboard Error:",
                        result.message
                    );
                }
            } catch (error) {
                console.error(
                    "Dashboard Fetch Error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [router]);

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <>
                <AdminNavbar />

                <div className="ml-65 mt-20 p-8">
                    <p>Loading dashboard...</p>
                </div>
            </>
        );
    }

    // =====================================================
    // DASHBOARD
    // =====================================================

    return (
        <div>
            <AdminNavbar />

            <div className="ml-65 mt-20 min-h-screen p-8">

                {/* =====================================================
                    SUMMARY CARDS
                ===================================================== */}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

                    {/* Total Users */}

                    <Link href="/admin/users">
                        <div className="rounded-xl bg-gray-100 p-6 shadow-sm">
                            <p className="text-black">
                                Total Users
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {dashboardData?.totalUsers ?? 0}
                            </h2>
                        </div>
                    </Link>

                    {/* Total Products */}

                    <Link href="/admin/products">
                        <div className="rounded-xl bg-gray-100 p-6 shadow-sm">
                            <p className="text-black">
                                Total Products
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {dashboardData?.totalProducts ?? 0}
                            </h2>
                        </div>
                    </Link>

                    {/* Total Orders */}

                    <Link href="/admin/orders">
                        <div className="rounded-xl bg-gray-100 p-6 shadow-sm">
                            <p className="text-black">
                                Total Orders
                            </p>

                            <h2 className="mt-2 text-3xl font-bold">
                                {dashboardData?.totalOrders ?? 0}
                            </h2>
                        </div>
                    </Link>

                    {/* Total Sales */}

                    <div className="rounded-xl bg-gray-100 p-6 shadow-sm">
                        <p className="text-black">
                            Total Sales
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            ₹{dashboardData?.totalSales ?? 0}
                        </h2>
                    </div>
                </div>

                {/* =====================================================
                    SECONDARY CARDS
                ===================================================== */}

                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">

                    {/* Pending Orders */}

                    <div className="rounded-xl bg-gray-100 p-6 shadow-sm">
                        <p className="text-black">
                            Pending Orders
                        </p>

                        <h2 className="mt-2 text-2xl font-bold">
                            {dashboardData?.totalPendingOrders ?? 0}
                        </h2>
                    </div>

                    {/* Pending Sales */}

                    <div className="rounded-xl bg-gray-100 p-6 shadow-sm">
                        <p className="text-black">
                            Pending Sales
                        </p>

                        <h2 className="mt-2 text-2xl font-bold">
                            ₹{dashboardData?.totalPendingSales ?? 0}
                        </h2>
                    </div>

                    {/* Reviews */}

                    <Link href="/admin/reviews">
                        <div className="rounded-xl bg-gray-100 p-6 shadow-sm">
                            <p className="text-black">
                                Total Reviews
                            </p>

                            <h2 className="mt-2 text-2xl font-bold">
                                {dashboardData?.totalReviews ?? 0}
                            </h2>
                        </div>
                    </Link>
                </div>

                {/* =====================================================
                    ORDER STATUS + TOP SELLING
                ===================================================== */}

                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

                    {/* ORDER STATUS SUMMARY */}

                    <div className="rounded-xl bg-gray-100 p-6 shadow-sm">
                        <h2 className="mb-5 text-xl font-semibold">
                            Order Status Summary
                        </h2>

                        <div className="space-y-4">
                            {dashboardData?.orderStatusSummary?.map(
                                (status: any) => (
                                    <div
                                        key={status.status_name}
                                        className="flex items-center justify-between border-b pb-3"
                                    >
                                        <span className="text-gray-600">
                                            {status.status_name}
                                        </span>

                                        <span className="font-semibold">
                                            {status.total_orders}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* TOP SELLING PRODUCTS */}

                    <div className="rounded-xl bg-gray-100 p-6 shadow-sm">
                        <h2 className="mb-5 text-xl font-semibold">
                            Top Selling Products
                        </h2>

                        <div className="space-y-4">
                            {dashboardData?.topSellingProducts?.map(
                                (product: any) => (
                                    <div
                                        key={product.product_id}
                                        className="flex items-center justify-between border-b pb-3"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {product.title}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Product ID:{" "}
                                                {product.product_id}
                                            </p>
                                        </div>

                                        <span className="font-semibold">
                                            {product.total_sold} sold
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    LOW STOCK PRODUCTS
                ===================================================== */}

                <div className="mt-6 rounded-xl bg-gray-100 p-6 shadow-sm">
                    <h2 className="mb-5 text-xl font-semibold">
                        Low Stock Products
                    </h2>

                    <div className="space-y-4">
                        {dashboardData?.lowStockProducts?.length > 0 ? (
                            dashboardData.lowStockProducts.map(
                                (product: any) => (
                                    <div
                                        key={product.product_id}
                                        className="flex items-center justify-between border-b pb-3"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {product.title}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Product ID:{" "}
                                                {product.product_id}
                                            </p>
                                        </div>

                                        <span className="font-semibold text-red-500">
                                            {product.stock} left
                                        </span>
                                    </div>
                                )
                            )
                        ) : (
                            <p className="text-gray-500">
                                No low stock products.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}