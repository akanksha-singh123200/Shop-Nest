
"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "@/components/AdminNavbar";

type Category = {
    id: number;
    name: string;
    created_at: string;
};

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);

    const [showModal, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryId, setCategoryId] = useState<number | null>(null);

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);

    // Fetch Categories
    const fetchCategories = async () => {
        try {
            setFetchLoading(true);

            const response = await fetch("/api/admin/categories");
            const data = await response.json();

            if (data.categories) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.log("Fetch category error:", error);
        } finally {
            setFetchLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Open Add Category Modal
    const openAddModal = () => {
        setCategoryId(null);
        setCategoryName("");
        setShowModal(true);
    };

    // Close Modal
    const closeModal = () => {
        if (loading) return;

        setShowModal(false);
        setCategoryId(null);
        setCategoryName("");
    };

    // Add Category
    const addCategory = async () => {
        if (!categoryName.trim()) {
            alert("Please enter category name");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("/api/admin/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    categoryName: categoryName.trim(),
                }),
            });

            const data = await response.json();

            alert(data.message);

            if (data.success) {
                await fetchCategories();
                setShowModal(false);
                setCategoryName("");
                setCategoryId(null);
            }
        } catch (error) {
            console.log("Add category error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Edit Category
    const editCategory = (category: Category) => {
        setCategoryId(category.id);
        setCategoryName(category.name);
        setShowModal(true);
    };

    // Update Category
    const updateCategory = async () => {
        if (!categoryName.trim()) {
            alert("Please enter category name");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("/api/admin/categories", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: categoryId,
                    categoryName: categoryName.trim(),
                }),
            });

            const data = await response.json();

            alert(data.message);

            if (data.success) {
                await fetchCategories();
                setShowModal(false);
                setCategoryName("");
                setCategoryId(null);
            }
        } catch (error) {
            console.log("Update category error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Delete Category
    const deleteCategory = async (id: number) => {
        const confirmDelete = confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch("/api/admin/categories", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            const data = await response.json();

            alert(data.message);

            if (data.success) {
                await fetchCategories();
            }
        } catch (error) {
            console.log("Delete category error:", error);
        }
    };

    return (
        <>
            <AdminNavbar />

            <div className="min-h-screen ml-64 mt-22 pt-22  p-4 sm:p-6">
                <div className="max-w-7xl mx-auto">

                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <p className="text-sm font-medium text-[#F06A55] mb-2">
                                SHOPNEST ADMIN
                            </p>

                            <h1 className="text-3xl font-bold text-gray-800">
                                Categories
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Organize and manage your product categories.
                            </p>
                        </div>

                        <button
                            onClick={openAddModal}
                            className="bg-[#F06A55] text-white px-5 py-3 rounded-xl font-medium hover:bg-[#df5845] transition shadow-sm"
                        >
                            + Add Category
                        </button>
                    </div>

                    {/* Category Summary */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#fff0eb] text-[#F06A55] flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3" y="3" width="8" height="8" rx="1.5" />
                                <rect x="13" y="3" width="8" height="5" rx="1.5" />
                                <rect x="13" y="10" width="8" height="11" rx="1.5" />
                                <rect x="3" y="13" width="8" height="8" rx="1.5" />
                            </svg>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Total Categories
                            </p>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {categories.length}
                            </h2>
                        </div>
                    </div>

                    {/* Category Table */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                        {/* Table Heading */}
                        <div className="p-5 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Category List
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                View, update, or remove your categories.
                            </p>
                        </div>

                        {/* Responsive Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-275 text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Category
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Category ID
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Creadted At
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {fetchLoading ? (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-6 py-12 text-center text-gray-500"
                                            >
                                                Loading categories...
                                            </td>
                                        </tr>
                                    ) : categories.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-6 py-14 text-center"
                                            >
                                                <div className="text-gray-400 mb-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="38"
                                                        height="38"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="mx-auto"
                                                    >
                                                        <rect x="3" y="3" width="7" height="7" rx="1" />
                                                        <rect x="14" y="3" width="7" height="7" rx="1" />
                                                        <rect x="3" y="14" width="7" height="7" rx="1" />
                                                        <rect x="14" y="14" width="7" height="7" rx="1" />
                                                    </svg>
                                                </div>

                                                <p className="font-medium text-gray-700">
                                                    No categories found
                                                </p>

                                                <p className="text-sm text-gray-400 mt-1">
                                                    Add a category to get started.
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        categories.map((category) => (
                                            <tr
                                                key={category.id}
                                                className="hover:bg-[#fffaf7] transition-colors"
                                            >
                                                {/* Category Name */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-11 h-11 shrink-0 rounded-xl bg-[#fff0eb] text-[#F06A55] flex items-center justify-center text-lg font-bold">
                                                            {category.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>

                                                        <div>
                                                            <p className="font-semibold text-gray-800">
                                                                {category.name}
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-1">
                                                                Product Category
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Category ID */}
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium">
                                                        #{category.id}
                                                    </span>
                                                </td>

                                                {/* Created At */}
                                                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                                                    {category.created_at
                                                        ? new Date(category.created_at).toLocaleDateString("en-IN", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })
                                                        : "N/A"}
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-2 rounded-full bg-green-50 text-green-700 px-3 py-1.5 text-xs font-medium">
                                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                        Active
                                                    </span>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end items-center gap-2">
                                                        <button
                                                            onClick={() =>
                                                                editCategory(category)
                                                            }
                                                            className="px-4 py-2 rounded-lg border border-[#F06A55] text-[#F06A55] text-sm font-medium hover:bg-[#fff0eb] transition"
                                                        >
                                                            Update
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                deleteCategory(category.id)
                                                            }
                                                            className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer */}
                        {!fetchLoading && categories.length > 0 && (
                            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/70">
                                <p className="text-sm text-gray-500">
                                    Showing{" "}
                                    <span className="font-semibold text-gray-700">
                                        {categories.length}
                                    </span>{" "}
                                    categories
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add / Update Modal */}
                {showModal && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-50 p-4"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {categoryId
                                            ? "Update Category"
                                            : "Add Category"}
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {categoryId
                                            ? "Edit your category details."
                                            : "Create a new product category."}
                                    </p>
                                </div>

                                <button
                                    onClick={closeModal}
                                    disabled={loading}
                                    className="w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition disabled:opacity-50"
                                    aria-label="Close modal"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter category name"
                                    value={categoryName}
                                    onChange={(e) =>
                                        setCategoryName(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !loading) {
                                            if (categoryId) {
                                                updateCategory();
                                            } else {
                                                addCategory();
                                            }
                                        }
                                    }}
                                    autoFocus
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#F06A55] focus:ring-2 focus:ring-[#F06A55]/15 transition"
                                />

                                {/* Modal Buttons */}
                                <div className="flex justify-end gap-3 mt-7">
                                    <button
                                        onClick={closeModal}
                                        disabled={loading}
                                        className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={
                                            categoryId
                                                ? updateCategory
                                                : addCategory
                                        }
                                        disabled={loading}
                                        className="px-5 py-2.5 rounded-xl bg-[#F06A55] text-white font-medium hover:bg-[#df5845] transition disabled:opacity-50"
                                    >
                                        {loading
                                            ? "Saving..."
                                            : categoryId
                                                ? "Update Category"
                                                : "Add Category"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
