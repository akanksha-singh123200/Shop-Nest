'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import AdminNavbar from "@/components/AdminNavbar";

type Category = {
    id: number;
    name: string;
};

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    category: number | string;
    categoryName?: string;
    image: string;
    stock: number;
};

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [editId, setEditId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [stock, setStock] = useState("");

    // =========================
    // Fetch Categories
    // =========================

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

    // =========================
    // Fetch Products
    // =========================

    const fetchProducts = async () => {
        try {
            const response = await fetch("/api/admin/products");
            const data = await response.json();

            if (data.products) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log("Fetch products error:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // =========================
    // Clear Form
    // =========================

    const clearForm = () => {
        setEditId(null);
        setTitle("");
        setDesc("");
        setPrice("");
        setCategory("");
        setImage(null);
        setStock("");
    };

    // =========================
    // Open Add Product Modal
    // =========================

    const openAddModal = () => {
        clearForm();
        setShowModal(true);
    };

    // =========================
    // Close Modal
    // =========================

    const closeModal = () => {
        setShowModal(false);
        clearForm();
    };

    // =========================
    // Add Product
    // =========================

    const handleProducts = async () => {
        try {
            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", desc);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("stock", stock);

            if (image) {
                formData.append("image", image);
            }

            const response = await fetch("/api/admin/products", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            alert(data.message);

            if (data.success) {
                await fetchProducts();
                closeModal();
            }
        } catch (error) {
            console.log("Add product error:", error);
        }
    };

    // =========================
    // Edit Product
    // =========================

    const editProduct = (product: Product) => {
        setEditId(product.id);

        setTitle(product.title);
        setDesc(product.description);
        setPrice(String(product.price));

        // Category set
        setCategory(String(product.category));

        setStock(String(product.stock));

        // New image optional
        setImage(null);

        // Open modal
        setShowModal(true);
    };

    // =========================
    // Update Product
    // =========================

    const updateProducts = async () => {
        try {
            const formData = new FormData();

            formData.append("id", String(editId));
            formData.append("title", title);
            formData.append("description", desc);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("stock", stock);

            if (image) {
                formData.append("image", image);
            }

            const response = await fetch("/api/admin/products", {
                method: "PUT",
                body: formData,
            });

            const data = await response.json();

            alert(data.message);

            if (data.success) {
                await fetchProducts();
                closeModal();
            }
        } catch (error) {
            console.log("Update product error:", error);
        }
    };

    // =========================
    // Delete Product
    // =========================

    const deleteProduct = async (id: number) => {
        const confirmDelete = confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch("/api/admin/products", {
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
                fetchProducts();
            }
        } catch (error) {
            console.log("Delete product error:", error);
        }
    };

 



    return (
    <>
        <AdminNavbar />

        <main className="ml-64 min-h-screen bg-white pt-20">

            {/* Page Header */}
            <div className="px-8 pt-8 pb-6">

                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold">
                            Products
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage your products
                        </p>
                    </div>

                    <button
                        onClick={openAddModal}
                        className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
                    >
                        + Add Product
                    </button>

                </div>

            </div>


            {/* Product List */}
            <div className="px-8 pb-8">

              

                <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">

                    {products.length === 0 ? (

                        <div className="p-10 text-center text-gray-500">
                            No products found.
                        </div>

                    ) : (

                        <table className="w-full text-left">

                            <thead className="bg-gray-100 border-b">

                                <tr>

                                    <th className="px-5 py-4 font-semibold">
                                        Image
                                    </th>

                                    <th className="px-5 py-4 font-semibold">
                                        Product
                                    </th>

                                    <th className="px-5 py-4 font-semibold">
                                        Category
                                    </th>

                                    <th className="px-5 py-4 font-semibold">
                                        Price
                                    </th>

                                    <th className="px-5 py-4 font-semibold">
                                        Stock
                                    </th>

                                    <th className="px-5 py-4 font-semibold text-center">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {products.map((product) => (

                                    <tr
                                        key={product.id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >

                                        {/* Image */}
                                        <td className="px-5 py-4">

                                            <div className="relative w-16 h-16">

                                                <Image
                                                    src={product.image}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover rounded-lg"
                                                />

                                            </div>

                                        </td>


                                        {/* Product */}
                                        <td className="px-5 py-4">

                                            <div className="max-w-xs">

                                                <p className="font-semibold">
                                                    {product.title}
                                                </p>

                                                <p className="text-sm text-gray-500 truncate">
                                                    {product.description}
                                                </p>

                                            </div>

                                        </td>


                                        {/* Category */}
                                        <td className="px-5 py-4 text-gray-600">
                                            {product.categoryName || product.category}
                                        </td>


                                        {/* Price */}
                                        <td className="px-5 py-4 font-semibold">
                                            ₹ {product.price}
                                        </td>


                                        {/* Stock */}
                                        <td className="px-5 py-4">

                                            {product.stock > 0 ? (

                                                <span className="text-green-600 font-medium">
                                                    {product.stock}
                                                </span>

                                            ) : (

                                                <span className="text-red-500 font-medium">
                                                    out of stock
                                                </span>

                                            )}

                                        </td>


                                        {/* Actions */}
                                        <td className="px-5 py-4">

                                            <div className="flex justify-center gap-2">

                                                <button
                                                    onClick={() => editProduct(product)}
                                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                                                >
                                                    Update
                                                </button>

                                                <button
                                                    onClick={() => deleteProduct(product.id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    )}

                </div>

            </div>


            {/* Add / Update Modal */}
            {showModal && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b">

                            <h2 className="text-2xl font-bold">
                                {editId
                                    ? "Update Product"
                                    : "Add Product"}
                            </h2>

                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-black text-2xl"
                            >
                                ×
                            </button>

                        </div>


                        {/* Modal Body */}
                        <div className="p-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Title */}
                                <div>

                                    <label className="block font-medium mb-1">
                                        Product Title
                                    </label>

                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        placeholder="Product Title"
                                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />

                                </div>


                                {/* Price */}
                                <div>

                                    <label className="block font-medium mb-1">
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                        placeholder="Price"
                                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />

                                </div>


                                {/* Description */}
                                <div className="md:col-span-2">

                                    <label className="block font-medium mb-1">
                                        Description
                                    </label>

                                    <textarea
                                        value={desc}
                                        onChange={(e) =>
                                            setDesc(e.target.value)
                                        }
                                        placeholder="Product Description"
                                        rows={4}
                                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />

                                </div>


                                {/* Category */}
                                <div>

                                    <label className="block font-medium mb-1">
                                        Category
                                    </label>

                                    <select
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    >

                                        <option value="">
                                            Select Category
                                        </option>

                                        {categories.map((cat) => (

                                            <option
                                                key={cat.id}
                                                value={cat.id}
                                            >
                                                {cat.name}
                                            </option>

                                        ))}

                                    </select>

                                </div>


                                {/* Stock */}
                                <div>

                                    <label className="block font-medium mb-1">
                                        Stock
                                    </label>

                                    <input
                                        type="number"
                                        value={stock}
                                        onChange={(e) =>
                                            setStock(e.target.value)
                                        }
                                        placeholder="Stock"
                                        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    />

                                </div>


                                {/* Image */}
                                <div className="md:col-span-2">

                                    <label className="block font-medium mb-1">
                                        Product Image
                                    </label>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {

                                            const file =
                                                e.target.files?.[0];

                                            if (file) {
                                                setImage(file);
                                            }

                                        }}
                                        className="w-full border p-3 rounded-lg"
                                    />

                                    {editId && (

                                        <p className="text-sm text-gray-500 mt-2">
                                            Leave empty if you don't want to
                                            change the existing image.
                                        </p>

                                    )}

                                </div>

                            </div>


                            {/* Modal Buttons */}
                            <div className="flex justify-end gap-3 mt-6">

                                <button
                                    onClick={closeModal}
                                    className="border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={
                                        editId
                                            ? updateProducts
                                            : handleProducts
                                    }
                                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                                >
                                    {editId
                                        ? "Update Product"
                                        : "Add Product"}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </main>
    </>
);




}