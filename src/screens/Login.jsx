import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        alert(`Welcome back, ${res.data.fullName}!`);
        console.log("User Data:", res.data);
        // Redirect or store user info
      }
    } catch (err) {
      const message = err.response?.data?.error || "Login failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10 border-t-[6px] border-[#FF7F32]">
        <h2 className="text-3xl font-extrabold text-[#2C2C2C] text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Sign in to continue reporting and solving local issues.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-full px-5 py-3 focus:ring-2 focus:ring-[#FF7F32] outline-none text-sm"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-full px-5 py-3 focus:ring-2 focus:ring-[#FF7F32] outline-none text-sm"
          />

          {error && (
            <p className="text-sm text-red-600 bg-red-100 px-4 py-2 rounded-md text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#FF7F32] hover:bg-[#FF5F20] text-white font-medium py-3 rounded-full transition duration-300 text-sm"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          New here?{" "}
          <a href="/register" className="text-[#FF7F32] hover:underline font-medium">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
