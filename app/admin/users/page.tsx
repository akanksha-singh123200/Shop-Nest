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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="ml-64 min-h-screen  px-10 pt-28">
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

          {/* Table */}
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
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      Loading users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-200 last:border-b-0 hover:bg-[#FFF8F3]"
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