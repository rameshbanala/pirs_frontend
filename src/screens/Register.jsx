import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaRegUserCircle } from "react-icons/fa"; // Importing icons from react-icons

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      if (res.status === 200 || res.status === 201) {
        toast.success("Thank you for joining! You can now report and track issues in your community.");
        setFormData({
          fullName: "",
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 to-orange-200 animate-fade-in flex items-center justify-center px-4 py-8 mt-10">
      <Toaster position="top-center" />

      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10 border-t-[6px] border-[#FF7F32]">
        <h2 className="text-3xl font-extrabold text-[#2C2C2C] text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Join the community and help improve your city by reporting local issues.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaRegUserCircle className="absolute left-3 top-3 text-[#FF7F32] text-xl" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-full px-12 py-3 focus:ring-2 focus:ring-[#FF7F32] outline-none text-sm"
            />
          </div>

          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-[#FF7F32] text-xl" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-full px-12 py-3 focus:ring-2 focus:ring-[#FF7F32] outline-none text-sm"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-[#FF7F32] text-xl" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-full px-12 py-3 focus:ring-2 focus:ring-[#FF7F32] outline-none text-sm"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-[#FF7F32] text-xl" />
            <input
              type="password"
              name="password"
              placeholder="Password (min. 6 characters)"
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-full px-12 py-3 focus:ring-2 focus:ring-[#FF7F32] outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            className={`w-full ${isSubmitting ? "bg-gray-300 cursor-not-allowed" : "bg-[#FF7F32] hover:bg-[#FF5F20]"} text-white font-medium py-3 rounded-full transition duration-300 text-sm`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#FF7F32] hover:underline font-medium">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
