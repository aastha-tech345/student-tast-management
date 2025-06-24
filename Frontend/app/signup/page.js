"use client"; // Mark this as a Client Component

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Assuming lucide-react for icons; install via npm install lucide-react

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field) => {
    if (field === "password") setShowPassword(!showPassword);
    else if (field === "confirmPassword")
      setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container mx-auto p-12 flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-2xl bg-white p-10 shadow-2xl rounded-xl">
        <h1 className="text-3xl font-bold mb-8 text-center">New Register</h1>
        <p className="text-center text-gray-800 mb-8">
          Please enter your details
        </p>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(10_168_167/var(--tw-bg-opacity,_1))]"
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone Number"
                className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(10_168_167/var(--tw-bg-opacity,_1))]"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(10_168_167/var(--tw-bg-opacity,_1))]"
                required
              />
            </div>
            <div>
              <input
                type="date"
                placeholder="Date of Birth"
                className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(10_168_167/var(--tw-bg-opacity,_1))]"
                required
              />
            </div>
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(10_168_167/var(--tw-bg-opacity,_1))]"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </span>
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(10_168_167/var(--tw-bg-opacity,_1))]"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showConfirmPassword ? (
                    <Eye size={20} />
                  ) : (
                    <EyeOff size={20} />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Agree to terms
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-[rgb(10_168_167/var(--tw-bg-opacity,_1))] text-white p-3 rounded-md hover:bg-[rgb(0_150_150/var(--tw-bg-opacity,_1))] transition duration-200"
          >
            Sign up
          </button>
          <button
            type="button"
            className="w-full bg-white border border-gray-300 p-3 rounded-md flex items-center justify-center hover:bg-gray-100 transition duration-200"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign up with Google
          </button>
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[rgb(10_168_167/var(--tw-bg-opacity,_1))] hover:underline"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
