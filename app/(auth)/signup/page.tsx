'use client';
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignup = async () => {
        // setError("");
        // setLoading(true);
        // // Empty fields
        // if(!name || !email || !password || !confirmPassword){
        //     alert("Please fill all the fields");
        //     return;
        // }
        // //Password Lenght Check
        // if(password.length < 6 ){
        //     alert("Password Length may have 6 Charaters");
        //     return;
        // }
        // //compare Password and confirm password
        // if(password !== confirmPassword){
        //     alert("Doesn't have the same value. Please write the same password as confirm password");
        //     return;
        // }
        // //invalid email check using includes
        // if(!email.includes("@")){
        //     alert("Invalid email");
        //     return
        // }



        const response = await fetch("/api/auth/signup", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
                confirmPassword,

            }),
        });
        const data = await response.json();
        // console.log(name);
        // console.log(email);
        // console.log(password);
        // console.log(confirmPassword);
        // alert(data.message);
        // alert(data.message);
        if (data.success) {
            router.push("/login");

        }
        else {
            // alert(data.message);
            setError(data.message);
        }
        setLoading(false);
        alert(data.message);

    }
    return (
        <div id="signup" className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
            <div className="bg-white  w-full max-w-xl p-8 rounded-lg shadow-2xl">


                <div className="flex justify-center mb-6">
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
                <h1 className="text-3xl font-bold text-center mb-5">
                    Create Account
                </h1>
                <p className="mb-5 text-center">Please fill in the information below</p>


                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your Name"
                    className="w-full mb-4 border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
                />



                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full mb-4 border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
                />




                <input
                    type="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Enter your password"
                    className="w-full mb-4 border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
                />





                <input
                    type="Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    placeholder="Enter your confirm  password"
                    className="w-full border mb-4 p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
                />



                {/* disabled={loading} */}
                <button onClick={handleSignup} className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
                    signup
                </button>

                {/* Login Link */}
                <p className="text-center mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold hover:underline"
                    >
                        Sign In
                    </Link>
                </p>




            </div>


            {/* <div>
                {error && (
                    <p className="text-red-700">{error}</p>
                )}
            </div> */}


        </div>
    );
}
