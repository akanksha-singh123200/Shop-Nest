
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
          =============================== */}
          <div className="overflow-hidden rounded-xl border border-gray-300 bg-white">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr className="border-b border-gray-300">
                  <th className="px-6 py-4 text-left font-semibold">
                    ID
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      Loading users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <td className="px-6 py-5">
                        {user.id}
                      </td>

                      <td className="px-6 py-5 font-medium">
                        {user.name}
                      </td>

                      <td className="px-6 py-5 text-gray-600">
                        {user.email}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          {/* Edit Button */}
                          <button
                            onClick={() => handleEdit(user)}
                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                            title="Edit user"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>

                          {/* Delete Button */}
                          <button
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                            title="Delete user"
                            onClick={() => deleteUser(user.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.164.91-2.201 2.09v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
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
    </>
  );
}
