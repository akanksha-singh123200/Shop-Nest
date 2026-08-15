import Image from "next/image";
import Link from "next/link";

export default function ForgotPassword() {
    return (
        <div className="min-h-screen justify-center flex items-center bg-gray-100 p-4 ">
            <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-2xl">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-8 w-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            />
                        </svg>
                    </div>
                </div>

                <p className="text-2xl font-bold text-center mb-3 ">Create New Password</p>
                <p className="mb-5 text-center">Please fill in the information below</p>

                <input
                    type="Password"

                    placeholder="Enter your password"
                    className="w-full mb-4 border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
                />





                <input
                    type="Password"

                    placeholder="Enter your confirm  password"
                    className="w-full border mb-4 p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
                />
                {/* disabled={loading} */}
                <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
                    Change Password
                </button>


                {/* Login Link */}
                <p className="text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold hover:underline text-blue-500"
                    >
                        Sign In
                    </Link>
                </p>

            </div>

        </div>
    );
}