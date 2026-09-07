"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "@/components/AdminNavbar";

type Category = {
    id: number;
    name: string;
};

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);

    const [showModal, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryId, setCategoryId] = useState<number | null>(null);

    const [loading, setLoading] = useState(false);

    // Fetch Categories
    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/admin/categories");
            const data = await response.json();

            if (data.categories) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.log("Fetch category error:", error);
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
                    categoryName,
                }),
            });

            const data = await response.json();

            alert(data.message);

            if (data.success) {
                setCategoryName("");
                await fetchCategories();
                closeModal();
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
                    categoryName,
                }),
            });

            const data = await response.json();

            alert(data.message);

            if (data.success) {
                await fetchCategories();
                closeModal();
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
                body: JSON.stringify({
                    id,
                }),
            });

            const data = await response.json();

            alert(data.message);

            if (data.success) {
                fetchCategories();
            }
        } catch (error) {
            console.log("Delete category error:", error);
        }
    };

    return (
        <>
        <AdminNavbar />
            <div className="min-h-screen ml-64 pt-22 bg-gray-50 p-6">

                {/* Header */}
                <div className="max-w-7xl mx-auto">

                    <div className="flex items-center justify-between mb-8">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                Categories
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Manage your product categories
                            </p>
                        </div>

                        {/* Add Category Button */}
                        <button
                            onClick={openAddModal}
                            className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
                        >
                            + Add Category
                        </button>

                    </div>

                    {/* Category List */}
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

                        <div className="p-5 border-b">
                            <h2 className="text-xl font-semibold">
                                Category List
                            </h2>
                        </div>

                        {categories.length === 0 ? (
                            <div className="p-10 text-center text-gray-500">
                                No categories found.
                            </div>
                        ) : (
                            <div className="divide-y">

                                {categories.map((category) => (

                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between p-5 hover:bg-gray-50 transition"
                                    >

                                        <div className="flex items-center gap-4">

                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                                                {category.name.charAt(0).toUpperCase()}
                                            </div>

                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    {category.name}
                                                </p>

                                                <p className="text-sm text-gray-400">
                                                    Category ID: {category.id}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="flex gap-3">

                                            <button
                                                onClick={() =>
                                                    editCategory(category)
                                                }
                                                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                                            >
                                                Update
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteCategory(category.id)
                                                }
                                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>
                        )}

                    </div>

                </div>

                {/* Modal */}
                {showModal && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
                        onClick={closeModal}
                    >

                        {/* Modal Box */}
                        <div
                            className="bg-white w-full max-w-md rounded-xl shadow-xl p-6"
                            onClick={(e) => e.stopPropagation()}
                        >

                            {/* Modal Header */}
                            <div className="flex items-center justify-between mb-5">

                                <h2 className="text-2xl font-bold text-gray-800">
                                    {categoryId
                                        ? "Update Category"
                                        : "Add Category"}
                                </h2>

                                <button
                                    onClick={closeModal}
                                    className="text-gray-500 hover:text-black text-xl"
                                >
                                    ✕
                                </button>

                            </div>

                            {/* Input */}
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
                                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-gray-300"
                            />

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-6">

                                <button
                                    onClick={closeModal}
                                    className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100"
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
                                    className="px-5 py-2.5 rounded-lg bg-black text-white hover:bg-gray-800 disabled:opacity-50"
                                >
                                    {loading
                                        ? "Saving..."
                                        : categoryId
                                            ? "Update"
                                            : "Add Category"}
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>
        </>





    );
}