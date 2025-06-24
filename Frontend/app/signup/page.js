"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const togglePasswordVisibility = (field) => {
    if (field === "password") setShowPassword(!showPassword);
    else if (field === "confirmPassword")
      setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!formData.agreeTerms) {
      setError("You must agree to the terms");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          dateOfBirth: formData.dateOfBirth,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setFormData({
          fullName: "",
          phoneNumber: "",
          email: "",
          dateOfBirth: "",
          password: "",
          confirmPassword: "",
          agreeTerms: false,
        });
        toast.success("Registration successful! Welcome!");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="container mx-auto p-12 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl bg-white p-10 shadow-2xl rounded-xl">
          <h1 className="text-3xl font-bold mb-8 text-center">New Register</h1>
          <p className="text-center text-gray-800 mb-8">
            Please enter your details
          </p>
          {message && <p className="text-green-600 text-center">{message}</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="date"
                  name="dateOfBirth"
                  placeholder="Date of Birth"
                  className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.password}
                    onChange={handleChange}
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
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="border p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
                <input
                  type="checkbox"
                  name="agreeTerms"
                  className="mr-2"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />{" "}
                Agree to terms
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-3 rounded-md hover:bg-teal-600 transition duration-200"
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
              <a href="/login" className="text-teal-500 hover:underline">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
