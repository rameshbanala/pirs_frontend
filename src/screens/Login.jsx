import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

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
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        localStorage.setItem("username", res.data.username);
        if (res.data.department) {
          localStorage.setItem("department", res.data.department);
          toast.success(`Welcome back, ${res.data.fullName}!`);
          setTimeout(() => {
            navigate(`/dashboard/${res.data.department}`);
          }, 3000); // Delay navigation to allow toast display
        } else {
          toast.success("Welcome back!");
          setTimeout(() => {
            navigate("/");
          }, 3000); // Delay navigation to allow toast display
        }
      }
    } catch (err) {
      const message =
        err.response?.data?.error || "Login failed. Please try again.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-tr from-orange-100 to-orange-200 animate-fade-in">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border-t-8 border-[#FF7F32] animate-fade-in">
          <h2 className="text-4xl font-extrabold text-[#2C2C2C] text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Sign in to continue reporting and solving local issues.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input with Icon */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                ✉️
              </span>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-full pl-12 pr-4 py-3 focus:ring-2 focus:ring-[#FF7F32] focus:border-[#FF7F32] outline-none text-sm transition"
              />
            </div>

            {/* Password Input with Icon */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                🔒
              </span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-full pl-12 pr-4 py-3 focus:ring-2 focus:ring-[#FF7F32] focus:border-[#FF7F32] outline-none text-sm transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-100 px-4 py-2 rounded-md text-center animate-fade-in">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#FF7F32] hover:bg-[#FF5F20] text-white font-semibold py-3 rounded-full shadow-md hover:shadow-lg transition duration-300 text-sm"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            New here?{" "}
            <a
              href="/register"
              className="text-[#FF7F32] hover:text-[#FF5F20] font-semibold transition"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
