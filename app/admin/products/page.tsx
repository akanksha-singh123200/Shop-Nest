
"use client";

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

  // Fetch Products
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

  // Clear Form
  const clearForm = () => {
    setEditId(null);
    setTitle("");
    setDesc("");
    setPrice("");
    setCategory("");
    setImage(null);
    setStock("");
  };

  // Open Add Product Modal
  const openAddModal = () => {
    clearForm();
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    clearForm();
  };

  // Add Product
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

  // Edit Product
  const editProduct = (product: Product) => {
    setEditId(product.id);
    setTitle(product.title);
    setDesc(product.description);
    setPrice(String(product.price));
    setCategory(String(product.category));
    setStock(String(product.stock));
    setImage(null);
    setShowModal(true);
  };

  // Update Product
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

  // Delete Product
  const deleteProduct = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/admin/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
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

      <main className="ml-64 min-h-screen bg-white px-8 pb-12 pt-28">
        <div className="w-full">
          {/* Page Header */}
          <div className="mb-7 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-black">
                Products
              </h1>

              <p className="mt-2 text-base text-gray-500">
                Manage your products
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="whitespace-nowrap rounded-xl bg-[#E39F7F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d98968] active:scale-95"
            >
              + Add Product
            </button>
          </div>

          {/* Products Table */}
          {products.length > 0 ? (
            <div className="overflow-hidden rounded-[22px] border border-gray-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-275 border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="w-[28%] px-7 py-5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Product
                      </th>

                      <th className="w-[18%] px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Category
                      </th>

                      <th className="w-[15%] px-6 py-5 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Price
                      </th>

                      <th className="w-[14%] px-6 py-5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Stock
                      </th>

                      <th className="w-[25%] px-6 py-5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="transition-colors duration-200 hover:bg-gray-50/70"
                      >
                        {/* Product Image and Details */}
                        <td className="px-7 py-5">
                          <div className="flex items-center gap-5">
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#f8f8f8] p-2">
                              <Image
                                src={product.image}
                                width={80}
                                height={80}
                                alt={product.title}
                                className="h-full w-full object-contain"
                              />
                            </div>

                            <div className="min-w-0">
                              <h3 className="max-w-[260px] truncate text-base font-semibold text-gray-950">
                                {product.title}
                              </h3>

                              <p className="mt-1.5 text-sm text-gray-400">
                                Product ID: #{product.id}
                              </p>

                              <p className="mt-1 max-w-[260px] truncate text-xs text-gray-500">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-5">
                          <span className="inline-flex rounded-full bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600">
                            {product.categoryName || product.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="whitespace-nowrap px-6 py-5">
                          <span className="text-xl font-bold text-gray-950">
                            ₹{product.price}
                          </span>
                        </td>

                        {/* Stock */}
                        <td className="px-6 py-5 text-center">
                          {product.stock > 0 ? (
                            <span className="inline-flex min-w-10 items-center justify-center rounded-full bg-green-50 px-3.5 py-2 text-sm font-semibold text-green-600">
                              {product.stock}
                            </span>
                          ) : (
                            <span className="inline-flex whitespace-nowrap rounded-full bg-red-50 px-3.5 py-2 text-sm font-semibold text-red-500">
                              Out of Stock
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-2.5">
                            <button
                              onClick={() => editProduct(product)}
                              className="whitespace-nowrap rounded-xl bg-[#E39F7F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d98968] active:scale-95"
                            >
                              Update
                            </button>

                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="whitespace-nowrap rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-500 hover:text-white active:scale-95"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-[22px] border border-dashed border-gray-300 bg-white px-6 text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#E39F7F]/10 text-4xl">
                🛍️
              </div>

              <h3 className="text-xl font-bold text-gray-800">
                No Products Found
              </h3>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                There are currently no products in your product collection.
              </p>

              <button
                onClick={openAddModal}
                className="mt-5 rounded-xl bg-[#E39F7F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#d98968]"
              >
                + Add Product
              </button>
            </div>
          )}

          {/* Add / Update Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[22px] bg-white shadow-xl">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editId ? "Update Product" : "Add Product"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {editId
                        ? "Update the details of your product."
                        : "Enter the details of your new product."}
                    </p>
                  </div>

                  <button
                    onClick={closeModal}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-800"
                  >
                    ×
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* Title */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Product Title
                      </label>

                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Product Title"
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none transition focus:border-[#E39F7F] focus:ring-2 focus:ring-[#E39F7F]/20"
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Price
                      </label>

                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none transition focus:border-[#E39F7F] focus:ring-2 focus:ring-[#E39F7F]/20"
                      />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Description
                      </label>

                      <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Product Description"
                        rows={4}
                        className="w-full resize-y rounded-xl border border-gray-200 p-3 text-sm outline-none transition focus:border-[#E39F7F] focus:ring-2 focus:ring-[#E39F7F]/20"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Category
                      </label>

                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none transition focus:border-[#E39F7F] focus:ring-2 focus:ring-[#E39F7F]/20"
                      >
                        <option value="">Select Category</option>

                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Stock */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Stock
                      </label>

                      <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="Stock"
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none transition focus:border-[#E39F7F] focus:ring-2 focus:ring-[#E39F7F]/20"
                      />
                    </div>

                    {/* Image */}
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Product Image
                      </label>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (file) {
                            setImage(file);
                          }
                        }}
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-[#E39F7F]/10 file:px-4 file:py-2 file:font-semibold file:text-[#c47d5c]"
                      />

                      {editId && (
                        <p className="mt-2 text-xs text-gray-500">
                          Leave empty if you don't want to change the existing image.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Modal Buttons */}
                  <div className="mt-7 flex justify-end gap-3 border-t border-gray-100 pt-5">
                    <button
                      onClick={closeModal}
                      className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={editId ? updateProducts : handleProducts}
                      className="rounded-xl bg-[#E39F7F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d98968] active:scale-95"
                    >
                      {editId ? "Update Product" : "Add Product"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
