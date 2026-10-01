"use client";

import { useEffect, useState } from "react";

import AdminNavbar from "@/components/AdminNavbar";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // FILTERS
  // =====================================================
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [search, setSearch] = useState("");

  // =====================================================
  // STATUS DROPDOWN OPTIONS
  // =====================================================
  const [orderStatuses, setOrderStatuses] = useState<any[]>([]);
  const [paymentStatuses, setPaymentStatuses] = useState<any[]>([]);

  // =====================================================
  // VIEW MODAL
  // =====================================================
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // =====================================================
  // EDIT MODAL
  // =====================================================
  const [editOrder, setEditOrder] = useState<any>(null);

  // =====================================================
  // UPDATE LOADING
  // =====================================================
  const [updating, setUpdating] = useState(false);

  // =====================================================
  // FETCH ORDERS
  // =====================================================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        // Order status filter
        if (statusFilter) {
          params.append("status", statusFilter);
        }

        // Payment status filter
        if (paymentFilter) {
          params.append("payment_status", paymentFilter);
        }

        // Search filter
        if (search.trim()) {
          params.append("search", search.trim());
        }

        const queryString = params.toString();

        const url = queryString
          ? `/api/admin/orders?${queryString}`
          : "/api/admin/orders";

        const response = await fetch(url, {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (data.success) {
          setOrders(data.data || []);
          setOrderStatuses(data.order_status || []);
          setPaymentStatuses(data.payment_status || []);
        } else {
          console.error("Failed to fetch orders");
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [statusFilter, paymentFilter, search]);

  // =====================================================
  // UPDATE ORDER
  // =====================================================
  const updateOrder = async () => {
    if (!editOrder) return;

    if (
      editOrder.order_status_id == null ||
      editOrder.payment_status_id == null
    ) {
      alert("Please select order status and payment status");
      return;
    }

    try {
      setUpdating(true);

      const response = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: editOrder.order_id,

          // Backend receives status IDs
          status: Number(editOrder.order_status_id),
          payment_status: Number(editOrder.payment_status_id),
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update the order immediately in frontend
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === editOrder.order_id
              ? {
                  ...order,
                  order_status_id: editOrder.order_status_id,
                  order_status: editOrder.order_status,
                  payment_status_id: editOrder.payment_status_id,
                  payment_status: editOrder.payment_status,
                }
              : order
          )
        );

        setEditOrder(null);

        alert("Order updated successfully");
      } else {
        alert(data.message || "Failed to update order");
      }
    } catch (error) {
      console.error("Update order error:", error);

      alert("Something went wrong while updating order");
    } finally {
      setUpdating(false);
    }
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================
  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPaymentFilter("");
  };

  return (
    <>
      <AdminNavbar />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div className="ml-64 min-h-screen bg-[#FFF8F3] px-6 py-22 pt-20 md:px-8 md:py-27">
        <div className="mx-auto max-w-7xl">

          {/* =====================================================
              HEADER
          ===================================================== */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Orders
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Manage Orders.
            </p>
          </div>

          {/* =====================================================
              FILTERS
          ===================================================== */}
          <div className="mb-6 flex flex-wrap items-center gap-4">

            {/* Search */}
            <input
              type="text"
              placeholder="Search Order ID or Customer"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 outline-none focus:border-[#F06A55] md:w-64"
            />

            {/* Order Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 outline-none focus:border-[#F06A55]"
            >
              <option value="">All Order Status</option>

              {orderStatuses.map((status) => (
                <option
                  key={status.order_status_id}
                  value={status.order_status_id}
                >
                  {status.status_name}
                </option>
              ))}
            </select>

            {/* Payment Status */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 outline-none focus:border-[#F06A55]"
            >
              <option value="">All Payment Status</option>

              {paymentStatuses.map((status) => (
                <option
                  key={status.payment_status_id}
                  value={status.payment_status_id}
                >
                  {status.payment_status_name}
                </option>
              ))}
            </select>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-300"
            >
              Clear
            </button>
          </div>

          {/* =====================================================
              ORDERS TABLE
          ===================================================== */}
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-275 border-collapse">

                {/* Table Header */}
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Order ID
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Quantity
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Total Amount
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Payment Status
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Order Status
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Order Date
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-100">

                  {/* Loading */}
                  {loading ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-6 py-10 text-center text-sm text-gray-500"
                      >
                        Loading orders...
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (

                    /* No Orders */
                    <tr>
                      <td
                        colSpan={9}
                        className="px-6 py-10 text-center text-sm text-gray-500"
                      >
                        No orders found.
                      </td>
                    </tr>
                  ) : (

                    /* Orders */
                    orders.map((item) => (
                      <tr
                        key={`${item.order_id}-${item.order_items_id}`}
                        className="transition hover:bg-gray-50"
                      >

                        {/* Order ID */}
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900">
                            #{item.order_id}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {item.user_name}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              User ID: #{item.user_id}
                            </p>
                          </div>
                        </td>

                        {/* Product */}
                        <td className="px-6 py-4">
                          <div>
                            <p className="max-w-xs truncate text-sm font-semibold text-gray-900">
                              {item.product_title}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              Product ID: #{item.product_id}
                            </p>
                          </div>
                        </td>

                        {/* Quantity */}
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-700">
                            {item.order_quantity}
                          </span>
                        </td>

                        {/* Total Amount */}
                        <td className="px-6 py-4">
                          <span className="text-base font-bold text-gray-900">
                            ₹{item.total_amount}
                          </span>
                        </td>

                        {/* Payment Status */}
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                            {item.payment_status}
                          </span>
                        </td>

                        {/* Order Status */}
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-600">
                            {item.order_status}
                          </span>
                        </td>

                        {/* Order Date */}
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm text-gray-600">
                            {new Date(
                              item.created_at
                            ).toLocaleDateString()}
                          </span>

                          <p className="mt-1 text-xs text-gray-400">
                            {new Date(
                              item.created_at
                            ).toLocaleTimeString()}
                          </p>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">

                            {/* View */}
                            <button
                              onClick={() =>
                                setSelectedOrder(item)
                              }
                              className="rounded-lg bg-[#F06A55] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#d95745] active:scale-95"
                            >
                              View
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() =>
                                setEditOrder({
                                  ...item,
                                  order_status_id: Number(
                                    item.order_status_id
                                  ),
                                  payment_status_id: Number(
                                    item.payment_status_id
                                  ),
                                })
                              }
                              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 active:scale-95"
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          VIEW ORDER MODAL
      ========================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Order #{selectedOrder.order_id}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Order Details
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="text-2xl font-semibold text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[70vh] overflow-y-auto px-6 py-6">

              {/* Customer Information */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                  Customer Information
                </h4>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedOrder.user_name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    User ID: #{selectedOrder.user_id}
                  </p>
                </div>
              </div>

              {/* Product Information */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                  Product Information
                </h4>

                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="grid grid-cols-2 gap-4">

                    <div>
                      <p className="text-xs text-gray-400">
                        Product
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {selectedOrder.product_title}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Product ID
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        #{selectedOrder.product_id}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Quantity
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {selectedOrder.order_quantity}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Price
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        ₹{selectedOrder.order_price}
                      </p>
                    </div>

                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                  Order Information
                </h4>

                <div className="grid grid-cols-2 gap-4">

                  {/* Payment Status */}
                  <div className="rounded-xl bg-blue-50 p-4">
                    <p className="text-xs text-gray-500">
                      Payment Status
                    </p>

                    <p className="mt-1 text-sm font-bold text-blue-600">
                      {selectedOrder.payment_status}
                    </p>
                  </div>

                  {/* Order Status */}
                  <div className="rounded-xl bg-yellow-50 p-4">
                    <p className="text-xs text-gray-500">
                      Order Status
                    </p>

                    <p className="mt-1 text-sm font-bold text-yellow-600">
                      {selectedOrder.order_status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Amount */}
              <div className="mb-6 rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Total Amount
                  </span>

                  <span className="text-xl font-bold text-gray-900">
                    ₹{selectedOrder.total_amount}
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                  Shipping Address
                </h4>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm leading-6 text-gray-700">
                    {selectedOrder.shipping_address}
                  </p>
                </div>
              </div>

              {/* Order Date */}
              <div>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                  Order Date
                </h4>

                <p className="text-sm text-gray-600">
                  {new Date(
                    selectedOrder.created_at
                  ).toLocaleDateString()}{" "}
                  {new Date(
                    selectedOrder.created_at
                  ).toLocaleTimeString()}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          EDIT ORDER MODAL
      ========================================================= */}
      {editOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Update Order Details #{editOrder.order_id}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Update order and payment status
                </p>
              </div>

              <button
                onClick={() => setEditOrder(null)}
                disabled={updating}
                className="text-2xl font-semibold text-gray-400 hover:text-gray-700 disabled:opacity-50"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[70vh] overflow-y-auto px-6 py-6">

              {/* Customer Information */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                  Customer Information
                </h4>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {editOrder.user_name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    User ID: #{editOrder.user_id}
                  </p>
                </div>
              </div>

              {/* Product Information */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                  Product Information
                </h4>

                <div className="rounded-xl bg-gray-50 p-4">
                  <div className="grid grid-cols-2 gap-4">

                    <div>
                      <p className="text-xs text-gray-400">
                        Product
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {editOrder.product_title}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Product ID
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        #{editOrder.product_id}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Quantity
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {editOrder.order_quantity}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Price
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        ₹{editOrder.order_price}
                      </p>
                    </div>

                  </div>
                </div>
              </div>

              {/* Editable Status Fields */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                  Order Information
                </h4>

                <div className="grid grid-cols-2 gap-4">

                  {/* Payment Status */}
                  <div className="rounded-xl bg-blue-50 p-4">
                    <p className="mb-2 text-xs text-gray-500">
                      Payment Status
                    </p>

                    <select
                      value={editOrder.payment_status_id}
                      onChange={(e) => {
                        const selectedId = Number(
                          e.target.value
                        );

                        const selectedStatus =
                          paymentStatuses.find(
                            (status) =>
                              Number(
                                status.payment_status_id
                              ) === selectedId
                          );

                        setEditOrder({
                          ...editOrder,
                          payment_status_id: selectedId,
                          payment_status:
                            selectedStatus?.payment_status_name ||
                            "",
                        });
                      }}
                      disabled={updating}
                      className="w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-semibold text-blue-600 outline-none focus:border-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {paymentStatuses.map((status) => (
                        <option
                          key={status.payment_status_id}
                          value={status.payment_status_id}
                        >
                          {status.payment_status_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Order Status */}
                  <div className="rounded-xl bg-yellow-50 p-4">
                    <p className="mb-2 text-xs text-gray-500">
                      Order Status
                    </p>

                    <select
                      value={editOrder.order_status_id}
                      onChange={(e) => {
                        const selectedId = Number(
                          e.target.value
                        );

                        const selectedStatus =
                          orderStatuses.find(
                            (status) =>
                              Number(
                                status.order_status_id
                              ) === selectedId
                          );

                        setEditOrder({
                          ...editOrder,
                          order_status_id: selectedId,
                          order_status:
                            selectedStatus?.status_name || "",
                        });
                      }}
                      disabled={updating}
                      className="w-full rounded-lg border border-yellow-200 bg-white px-3 py-2 text-sm font-semibold text-yellow-600 outline-none focus:border-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {orderStatuses.map((status) => (
                        <option
                          key={status.order_status_id}
                          value={status.order_status_id}
                        >
                          {status.status_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Total Amount */}
              <div className="mb-6 rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Total Amount
                  </span>

                  <span className="text-xl font-bold text-gray-900">
                    ₹{editOrder.total_amount}
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                  Shipping Address
                </h4>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm leading-6 text-gray-700">
                    {editOrder.shipping_address}
                  </p>
                </div>
              </div>

              {/* Order Date */}
              <div>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                  Order Date
                </h4>

                <p className="text-sm text-gray-600">
                  {new Date(
                    editOrder.created_at
                  ).toLocaleDateString()}{" "}
                  {new Date(
                    editOrder.created_at
                  ).toLocaleTimeString()}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setEditOrder(null)}
                disabled={updating}
                className="rounded-lg border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={updateOrder}
                disabled={updating}
                className="rounded-lg bg-[#F06A55] px-5 py-2 text-sm font-semibold text-white hover:bg-[#d95745] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updating ? "Updating..." : "Update Order"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}