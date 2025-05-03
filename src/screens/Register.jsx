import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaRegUserCircle } from "react-icons/fa";

const RESEND_OTP_COOLDOWN = 60; // seconds

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSubmitting, setOtpSubmitting] = useState(false);

  // Resend OTP state
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Registration submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      if (res.data.message?.toLowerCase().includes("otp")) {
        toast.success("Check your email for the OTP.");
        setOtpStep(true);
        setResendCooldown(RESEND_OTP_COOLDOWN);
      } else {
        toast.success("Registration successful!");
        setFormData({
          fullName: "",
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // OTP verify submit
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpSubmitting(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email: formData.email,
          otp,
        }
      );
      if (res.data.message?.toLowerCase().includes("verified")) {
        toast.success("Email verified! Registration complete.");
        setFormData({
          fullName: "",
          username: "",
          email: "",
          password: "",
        });
        setOtp("");
        setOtpStep(false);
        navigate("/login", { replace: true });
      } else {
        toast.error(res.data.error || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          "OTP verification failed. Please try again."
      );
    } finally {
      setOtpSubmitting(false);
    }
  };

  // Resend OTP handler
  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/resend-otp",
        { email: formData.email }
      );
      toast.success(res.data.message || "OTP resent!");
      setResendCooldown(RESEND_OTP_COOLDOWN);
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Failed to resend OTP. Please try again."
      );
    }
  };

  const isLoggedIn = localStorage.getItem("username");
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 to-orange-200 animate-fade-in flex items-center justify-center px-4 py-8 mt-10">
      <Toaster position="top-center" />
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10 border-t-[6px] border-[#FF7F32]">
        <h2 className="text-3xl font-extrabold text-[#2C2C2C] text-center mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Join the community and help improve your city by reporting local
          issues.
        </p>

        {!otpStep ? (
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
              className={`w-full ${
                isSubmitting
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#FF7F32] hover:bg-[#FF5F20]"
              } text-white font-medium py-3 rounded-full transition duration-300 text-sm`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="text-center text-[#FF7F32] font-semibold mb-2">
              An OTP has been sent to{" "}
              <span className="font-mono">{formData.email}</span>.
              <br />
              Please enter the OTP below to verify your email.
            </div>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-5 py-3 focus:ring-2 focus:ring-[#FF7F32] outline-none text-sm text-center tracking-widest"
              maxLength={6}
            />
            <button
              type="submit"
              className={`w-full ${
                otpSubmitting
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#FF7F32] hover:bg-[#FF5F20]"
              } text-white font-medium py-3 rounded-full transition duration-300 text-sm`}
              disabled={otpSubmitting}
            >
              {otpSubmitting ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={handleResendOTP}
              className={`w-full mt-2 ${
                resendCooldown > 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-transparent text-[#FF7F32] hover:underline"
              } font-medium py-2 rounded-full transition duration-300 text-sm`}
              disabled={resendCooldown > 0}
            >
              {resendCooldown > 0
                ? `Resend OTP in ${resendCooldown}s`
                : "Resend OTP"}
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#FF7F32] hover:underline font-medium"
          >
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
