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
        withCredentials: true, // to accept cookies (for JWT)
      });
      console.log(res);

      if (res.status === 200) {
        alert(`Welcome back, ${res.data.fullName}!`);
        console.log("User Data:", res.data);
        // redirect or store user info
      }
    } catch (err) {
      const message = err.response?.data?.error || "Login failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-10 border-t-[6px] border-[#0056b3]">
        <h2 className="text-3xl font-bold text-[#003366] text-center mb-2">
          Login to Your Account
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Report and track public issues in your local community.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#0072ce] outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#0072ce] outline-none"
          />

          {error && (
            <p className="text-sm text-red-500 bg-red-100 px-3 py-2 rounded-md">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#0072ce] hover:bg-[#0056b3] text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          New to the platform?{" "}
          <a href="/register" className="text-[#0072ce] hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
