"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // const [loading,setLoading]=useState(false);
  // const [error,setError]=useState("");


  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  const handleLogin = async () => {
    // if(!email || !password)
    // {
    //   alert("Please fill all the fields");
    //   return;
    // }
    // if(password.length < 6)
    // {
    //   alert("Password is too short may have 6 chararcter");
    //   return;
    // }
    // if(!email.includes("@")){
    //   alert("Invalid email");
    //   return;
    // }
    //   setError("");
    // setLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    setEmail("");
    setPassword("");
    const data = await response.json();
    // setLoading(false);
    console.log(data.message);
    if (data.success) {
      alert(data.message);

      setRememberMe(false);

      router.push("/");
    } else {
      alert(data.message);
    }


  }
  return (
    <div id="login" className="min-h-screen flex items-center justify-center">

      <div className="bg-white w-full max-w-xl p-8 rounded-lg shadow-2xl">

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full  bg-gray-300 flex items-center justify-center">
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
        <h1 className="text-3xl font-bold text-center mb-3">
          Welcome Back!
        </h1>
        <p className="text-center mb-9">Please Enter Your Information Below</p>

        {/* Email Input */}
        <div className="mb-4">

          <input
            type="email"
            placeholder="Enter your email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">

          <input
            type="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-black cursor-pointer"
            />

            <label htmlFor="remember" className="cursor-pointer">
              Remember me
            </label>
          </div>


          <Link
            href="/forgot-password"
            className="hover:underline text-blue-700 "
          >
            Forgot Password?
          </Link>
        </div>

        {/* Button */}
        <button onClick={handleLogin} className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
          {/* {loading ? "Logging in..." : "Login"} */}
          Sign In
        </button>
        {/* disabled={loading} */}
        {/* {
          error && (
            <p className="text-red-600">{error}</p>
          )
        } */}

        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-300"></div>

          <span className="px-4 text-sm text-gray-500 font-medium uppercase">
            OR CONTINUE WITH
          </span>

          <div className="flex-1 border-t border-gray-300"></div>
        </div>


        <button onClick={handleGoogleLogin} className="w-full text-black bg-gray-300 font-bold py-3 rounded-md hover:bg-gray-800 transition">
          {/* {loading ? "Logging in..." : "Login"} */}
          Continue with Google
        </button>

        {/* <p className="flex justify-center text-center mt-5">Don't have an account? <a href="#signup">Create an account</a></p> */}
        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold hover:underline text-blue-700"
          >
            Create an account
          </Link>
        </p>
      </div>

    </div>
  );
}