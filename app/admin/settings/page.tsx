"use client";

import { useState } from "react";
import AdminNavbar from "@/components/AdminNavbar";

export default function Settings() {
  const [storeName, setStoreName] = useState("ShopNest");
  const [storeEmail, setStoreEmail] = useState("");
  const [storePhone, setStorePhone] = useState("");
  const [storeDescription, setStoreDescription] = useState(
    "Your one-stop online shopping destination."
  );

  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGeneralSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("General Settings UI is ready. Database integration is pending.");
  };

  const handleSecuritySave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    alert("Security Settings UI is ready. Backend integration is pending.");
  };

  return (
    <>
      <AdminNavbar />

      <div className="ml-64 mt-22 min-h-screen px-8 py-8">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Settings
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your ShopNest store preferences and admin account.
          </p>
        </div>

        {/* Settings Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex items-center gap-4 rounded-xl border border-orange-100 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#F06A55]">
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
                <path d="M3 9l9-6 9 6" />
                <path d="M4 10v10h16V10" />
                <path d="M9 20v-6h6v6" />
              </svg>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                General Settings
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage your store information.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-orange-100 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#F06A55]">
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
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                <rect x="16" y="13" width="6" height="8" rx="1" />
              </svg>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Admin Profile &amp; Security
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage your profile and password.
              </p>
            </div>
          </div>
        </div>

        {/* General Settings */}
        <section className="mb-8 rounded-xl border border-orange-100 bg-white p-6 shadow-sm">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-800">
              General Settings
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your ShopNest store details.
            </p>
          </div>

          <form onSubmit={handleGeneralSave}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Store Name
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#F06A55] focus:ring-2 focus:ring-orange-100"
                  placeholder="Enter store name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Store Email
                </label>
                <input
                  type="email"
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#F06A55] focus:ring-2 focus:ring-orange-100"
                  placeholder="Enter store email"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={storePhone}
                  onChange={(e) => setStorePhone(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#F06A55] focus:ring-2 focus:ring-orange-100"
                  placeholder="Enter contact number"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Website Name
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#F06A55] focus:ring-2 focus:ring-orange-100"
                  placeholder="ShopNest"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Store Description
                </label>
                <textarea
                  value={storeDescription}
                  onChange={(e) => setStoreDescription(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#F06A55] focus:ring-2 focus:ring-orange-100"
                  placeholder="Enter store description"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-[#F06A55] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#df5945]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </section>

        {/* Admin Profile & Security */}
        <section className="rounded-xl border border-orange-100 bg-white p-6 shadow-sm">
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Admin Profile &amp; Security
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your admin profile and change your password.
            </p>
          </div>

          <form onSubmit={handleSecuritySave}>
            <div className="mb-6 flex items-center gap-4 rounded-lg bg-orange-50/70 p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F06A55] text-xl font-bold text-white">
                A
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  Administrator
                </h3>
                <p className="text-sm text-gray-500">
                  ShopNest Admin Account
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Admin Name
                </label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#F06A55] focus:ring-2 focus:ring-orange-100"
                  placeholder="Enter admin name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#F06A55] focus:ring-2 focus:ring-orange-100"
                  placeholder="Enter admin email"
                />
              </div>
            </div>

            <div className="my-7 border-t border-gray-100" />

            <h3 className="mb-4 text-base font-semibold text-gray-800">
              Change Password
            </h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#F06A55] focus:ring-2 focus:ring-orange-100"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#F06A55] focus:ring-2 focus:ring-orange-100"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#F06A55] focus:ring-2 focus:ring-orange-100"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-[#F06A55] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#df5945]"
              >
                Update Security
              </button>
            </div>
          </form>
        </section>

        <p className="mt-6 text-center text-xs text-gray-400">
          ShopNest Admin Panel
        </p>
      </div>
    </>
  );
}