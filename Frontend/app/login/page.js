"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Token is set in cookie by the API
        router.push("/dashboard"); // Redirect to dashboard
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-8 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome back</h1>
        <p className="text-center text-gray-600 mb-6">Please enter your details</p>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSignIn}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(10_168_167/var(--tw-bg-opacity,_1))]"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(10_168_167/var(--tw-bg-opacity,_1))]"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember for 30 days
            </label>
            <a
              href="#"
              className="text-[rgb(10_168_167/var(--tw-bg-opacity,_1))] hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-[rgb(10_168_167/var(--tw-bg-opacity,_1))] text-white p-2 rounded-md hover:bg-[rgb(0_150_150/var(--tw-bg-opacity,_1))] transition duration-200"
          >
            Sign in
          </button>
          <button
            type="button"
            className="w-full bg-white border border-gray-300 p-2 rounded-md flex items-center justify-center hover:bg-gray-100 transition duration-200"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </button>
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-[rgb(10_168_167/var(--tw-bg-opacity,_1))] hover:underline"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}