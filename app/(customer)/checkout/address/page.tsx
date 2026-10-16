
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CheckoutAddressForm() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("user_id");

    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        alternatePhone: "",
        address1: "",
        address2: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        addressType: "",
    });

    // =========================================================
    // FETCH COUNTRIES + STATES
    // =========================================================
    const fetchCountriesAndStates = async () => {
        try {
            const response = await fetch(
                "/api/checkout/address/countries&states",
                {
                    method: "GET",
                    cache: "no-store",
                }
            );

            const data = await response.json();

            console.log(
                "Countries & States API Response:",
                data
            );

            if (!response.ok || !data.success) {
                console.error(
                    data.message ||
                        "Failed to fetch countries and states"
                );
                return;
            }

            setCountries(data.countries || []);
            setStates(data.states || []);
        } catch (error) {
            console.error(
                "Countries & States Fetch Error:",
                error
            );
        }
    };

    // =========================================================
    // FETCH USER INFORMATION
    // =========================================================
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!userId) {
                    alert("User ID is missing");
                    return;
                }

                const response = await fetch(
                    `/api/checkout/address?user_id=${userId}`,
                    {
                        method: "GET",
                        credentials: "include",
                        cache: "no-store",
                    }
                );

                const data = await response.json();

                console.log(
                    "Address API Response:",
                    data
                );

                // Login check
                if (
                    response.status === 401 ||
                    data.loggedIn === false
                ) {
                    alert("Please login first");
                    window.location.href = "/login";
                    return;
                }

                if (!response.ok || !data.success) {
                    alert(
                        data.message ||
                            "Failed to fetch user details"
                    );
                    return;
                }

                // Database se aayi user information
                setFormData((prev) => ({
                    ...prev,
                    name: data.user.name || "",
                    email: data.user.email || "",
                }));
            } catch (error) {
                console.error(
                    "Fetch User Error:",
                    error
                );

                alert(
                    "Failed to load user information"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    // =========================================================
    // FETCH COUNTRIES + STATES
    // =========================================================
    useEffect(() => {
        fetchCountriesAndStates();
    }, []);

    // =========================================================
    // HANDLE INPUT + SELECT CHANGE
    // =========================================================
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================================================
    // SUBMIT FORM
    // =========================================================
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "/api/checkout/address",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        phone: formData.phone,

                        alternate_phone:
                            formData.alternatePhone || null,

                        address1: formData.address1,

                        address2:
                            formData.address2 || null,

                        landmark:
                            formData.landmark || null,

                        city: formData.city,

                        state_name: formData.state,

                        pincode: formData.pincode,

                        country_name: formData.country,

                        address_type:
                            formData.addressType,
                    }),
                }
            );

            const data = await response.json();

            console.log(
                "POST Address Response:",
                data
            );

            // Login check
            if (
                response.status === 401 ||
                (data.success === false &&
                    data.message ===
                        "User is not logged in")
            ) {
                alert("Please login first");
                window.location.href = "/login";
                return;
            }

            // Other error
            if (!response.ok || !data.success) {
                alert(
                    data.message ||
                        "Failed to save shipping address"
                );
                return;
            }

            // Success
            alert(
                "Shipping address saved successfully"
            );

            console.log(
                "Inserted Address ID:",
                data.addressId
            );

            // Checkout page par wapas jana
            router.push(
                `/checkout?product_id=${searchParams.get(
                    "product_id"
                ) || ""}`
            );
        } catch (error) {
            console.error(
                "Save Address Error:",
                error
            );

            alert(
                "Something went wrong while saving address"
            );
        }
    };

    // =========================================================
    // LOADING
    // =========================================================
    if (loading) {
        return (
            <div className="min-h-screen bg-[#fff8f3] flex items-center justify-center">
                <p className="text-gray-600">
                    Loading address...
                </p>
            </div>
        );
    }

    // =========================================================
    // UI
    // =========================================================
    return (
        <div className="min-h-screen bg-[#fff8f3] py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">

                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    Add Shipping Address
                </h1>

                <p className="text-sm text-gray-500 mb-8">
                    Enter your delivery details
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* =================================================
                        NAME & EMAIL
                    ================================================= */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                readOnly
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                readOnly
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none bg-gray-100 text-gray-600 cursor-not-allowed"
                            />
                        </div>

                    </div>

                    {/* =================================================
                        PHONE
                    ================================================= */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter your phone"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#F06A55]"
                                required
                            />
                        </div>

                        {/* Alternate Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Alternate Phone
                            </label>

                            <input
                                type="tel"
                                name="alternatePhone"
                                value={
                                    formData.alternatePhone
                                }
                                onChange={handleChange}
                                placeholder="Enter alternate phone"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#F06A55]"
                            />
                        </div>

                    </div>

                    {/* =================================================
                        ADDRESS LINE 1
                    ================================================= */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address Line 1
                        </label>

                        <input
                            type="text"
                            name="address1"
                            value={formData.address1}
                            onChange={handleChange}
                            placeholder="House No., Building, Street"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#F06A55]"
                            required
                        />
                    </div>

                    {/* =================================================
                        ADDRESS LINE 2
                    ================================================= */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address Line 2
                        </label>

                        <input
                            type="text"
                            name="address2"
                            value={formData.address2}
                            onChange={handleChange}
                            placeholder="Area, Colony, Apartment (Optional)"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#F06A55]"
                        />
                    </div>

                    {/* =================================================
                        LANDMARK
                    ================================================= */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Landmark
                        </label>

                        <input
                            type="text"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                            placeholder="Enter nearby landmark"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#F06A55]"
                        />
                    </div>

                    {/* =================================================
                        CITY & STATE
                    ================================================= */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* City */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                City
                            </label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Enter your city"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#F06A55]"
                                required
                            />
                        </div>

                        {/* State */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                State
                            </label>

                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#F06A55] bg-white cursor-pointer"
                            >
                                <option value="">
                                    Select State
                                </option>

                                {states.map(
                                    (
                                        state: any,
                                        index: number
                                    ) => (
                                        <option
                                            key={`${state.id}-${index}`}
                                            value={
                                                state.state_name
                                            }
                                        >
                                            {
                                                state.state_name
                                            }
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                    </div>

                    {/* =================================================
                        PINCODE & COUNTRY
                    ================================================= */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Pincode */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pincode
                            </label>

                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="Enter pincode"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#F06A55]"
                                required
                            />
                        </div>

                        {/* Country */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Country
                            </label>

                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#F06A55] bg-white cursor-pointer"
                            >
                                <option value="">
                                    Select Country
                                </option>

                                {countries.map(
                                    (
                                        country: any,
                                        index: number
                                    ) => (
                                        <option
                                            key={`${country.id}-${index}`}
                                            value={String(
                                                country.id
                                            )}
                                        >
                                            {
                                                country.country_name
                                            }
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                    </div>

                    {/* =================================================
                        ADDRESS TYPE
                    ================================================= */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address Type
                        </label>

                        <div className="flex gap-6">

                            {/* Home */}
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="addressType"
                                    value="Home"
                                    checked={
                                        formData.addressType ===
                                        "Home"
                                    }
                                    onChange={handleChange}
                                />
                                Home
                            </label>

                            {/* Work */}
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="addressType"
                                    value="Work"
                                    checked={
                                        formData.addressType ===
                                        "Work"
                                    }
                                    onChange={handleChange}
                                />
                                Work
                            </label>

                            {/* Other */}
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="addressType"
                                    value="Other"
                                    checked={
                                        formData.addressType ===
                                        "Other"
                                    }
                                    onChange={handleChange}
                                />
                                Other
                            </label>

                        </div>
                    </div>

                    {/* =================================================
                        SUBMIT
                    ================================================= */}

                    <div className="flex justify-end pt-4">

                        <button
                            type="submit"
                            className="bg-[#F06A55] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition"
                        >
                            Save Address
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

// =========================================================
// PAGE COMPONENT
// Suspense must wrap the component that uses useSearchParams()
// =========================================================

export default function CheckoutAddressPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[#fff8f3] flex items-center justify-center">
                    <p className="text-gray-600">
                        Loading address...
                    </p>
                </div>
            }
        >
            <CheckoutAddressForm />
        </Suspense>
    );
}
