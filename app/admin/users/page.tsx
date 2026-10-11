
"use client";

import AdminNavbar from "@/components/AdminNavbar";
import { useEffect, useState } from "react";

interface UserData {
  id: number;
  name: string;
  email: string;
}

export default function User() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit user state
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [updating, setUpdating] = useState(false);

  // ===============================
  // Fetch Users
  // ===============================
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/user");
      const data = await response.json();

      if (data.success) {
        setUsers(data.user);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Open Edit Form
  // ===============================
  const handleEdit = (user: UserData) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  // ===============================
  // Update User Profile
  // ===============================
  const updateProfile = async () => {
    if (!editingUser) return;

    if (!name.trim() || !email.trim()) {
      alert("Name and email are required");
      return;
    }

    try {
      setUpdating(true);

      const response = await fetch("/api/admin/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingUser.id,
          name: name,
          email: email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("User profile updated successfully!");

        // Update user directly in UI
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editingUser.id
              ? {
                ...user,
                name: name,
                email: email,
              }
              : user
          )
        );

        // Close edit form
        setEditingUser(null);
        setName("");
        setEmail("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Something went wrong while updating the user");
    } finally {
      setUpdating(false);
    }
  };

  // ===============================
  // Delete User Profile
  // ===============================
  // ===============================
  // Delete User Profile
  // ===============================
  const deleteUser = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/admin/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("User deleted successfully!");

        // Remove deleted user from UI
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== id)
        );
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Something went wrong while deleting the user");
    }
  };




  // ===============================
  // Fetch users on page load
  // ===============================
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="ml-64 min-h-screen px-10 pt-28">
        <div>
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              User Details
            </h1>

            <p className="mt-1 text-gray-500">
              Manage your ShopNest users
            </p>
          </div>

          {/* ===============================
    Edit User Modal
=============================== */}
          {editingUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
              <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

                {/* Modal Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Edit User
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Update user information
                    </p>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => {
                      setEditingUser(null);
                      setName("");
                      setEmail("");
                    }}
                    className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                  >
                    ✕
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-5">

                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Name
                    </label>

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      placeholder="Enter name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      placeholder="Enter email"
                    />
                  </div>

                </div>

                {/* Buttons */}
                <div className="mt-7 flex justify-end gap-3">

                  {/* Cancel */}
                  <button
                    onClick={() => {
                      setEditingUser(null);
                      setName("");
                      setEmail("");
                    }}
                    className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 transition hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  {/* Update */}
                  <button
                    onClick={updateProfile}
                    disabled={updating}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Update Profile"}
                  </button>

                </div>
              </div>
            </div>
          )}
          {/* ===============================
            Users Table
================================ */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            {/* Table Heading */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  User List
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  View and manage registered users.
                </p>
              </div>

              <span className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600">
                Total: {users.length}
              </span>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] border-collapse text-left">

                {/* Table Header */}
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="w-[12%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      User ID
                    </th>

                    <th className="w-[25%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Name
                    </th>

                    <th className="w-[38%] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Email Address
                    </th>

                    <th className="w-[25%] px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                        Loading users...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="transition-colors hover:bg-gray-50"
                      >
                        {/* User ID */}
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-md bg-gray-100 px-2.5 py-1.5 text-sm font-medium text-gray-600">
                            #{user.id}
                          </span>
                        </td>

                        {/* User Name */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff0eb] font-semibold text-[#F06A55]">
                              {user.name?.charAt(0).toUpperCase() || "U"}
                            </div>

                            <span className="font-medium text-gray-800">
                              {user.name}
                            </span>
                          </div>
                        </td>

                        {/* User Email */}
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {user.email}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">

                            {/* Edit Button */}
                            <button
                              onClick={() => handleEdit(user)}
                              className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                              title="Edit user"
                            >
                              Edit
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                              title="Delete user"
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
            {!loading && users.length > 0 && (
              <div className="border-t border-gray-200 bg-gray-50/70 px-6 py-4">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-700">
                    {users.length}
                  </span>{" "}
                  registered users
                </p>
              </div>
            )}
          </div>
      
        </div>
      </div>
    </>
  );
}
