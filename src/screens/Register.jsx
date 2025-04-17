import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
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
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      if (res.status === 200 || res.status === 201) {
        alert("Thank you for joining! You can now report and track issues in your community.");
        setFormData({
          fullName: "",
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-10 border-t-[6px] border-[#0056b3]">
        <h2 className="text-3xl font-bold text-[#003366] text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Join the community and help improve your city by reporting local issues.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name *"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#0072ce] outline-none"
          />

          <input
            type="text"
            name="username"
            placeholder="Choose a Username *"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#0072ce] outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-[#0072ce] outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password (min. 6 characters) *"
            required
            minLength={6}
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
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#0072ce] hover:underline">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;

