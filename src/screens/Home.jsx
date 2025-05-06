import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import home_1 from "../assets/home_1.png";
import home_2 from "../assets/home_2.png";
import MapWithPosts from "./MapWithPosts";

// Primary color: #FF7F32 (Orange)
// Secondary colors: #FF5F20 (Darker Orange), #FFEFE5 (Light Orange)
// Neutrals: #FFFFFF, #F9F9F9, #2C2C2C

const Home = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [animateHero, setAnimateHero] = useState(false);

  useEffect(() => {
    // Trigger hero animation after component mounts
    setAnimateHero(true);

    // Handle scroll events for animations
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const cookies = document.cookie.split(";");
    const jwtCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("jwt=")
    );
    if (jwtCookie) {
      navigate("/complaint");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="font-sans bg-white text-[#2C2C2C] min-h-screen overflow-x-hidden">
      {/* Floating Navigation Indicator - appears on scroll */}
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-xl border border-gray-100">
          <span className="text-[#FF7F32] font-medium">IssueSolver</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-28 pb-24 px-6 md:px-20 overflow-hidden bg-gradient-to-b from-white to-[#f9f9f9]">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-[#FF7F32]/10 to-transparent rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-t from-[#FFEFE5] to-transparent rounded-tr-full"></div>

        {/* Animated dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-2 h-2 rounded-full bg-[#FF7F32]"></div>
          <div className="absolute top-40 left-40 w-3 h-3 rounded-full bg-[#FF5F20]"></div>
          <div className="absolute top-60 right-40 w-2 h-2 rounded-full bg-[#FF7F32]"></div>
          <div className="absolute bottom-20 right-20 w-3 h-3 rounded-full bg-[#FF5F20]"></div>
        </div>

        <div
          className={`relative z-10 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 transition-all duration-1000 ${
            animateHero
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Left - Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-block px-4 py-1 bg-[#FFEFE5] rounded-full text-[#FF7F32] font-medium text-sm mb-6">
              Community-Driven Solutions
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-[#FF7F32] to-[#FF5F20] bg-clip-text text-transparent drop-shadow-sm">
              Help Improve <br /> Your Community.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Report civic problems, track progress, and make a real difference
              with{" "}
              <span className="text-[#FF7F32] font-semibold">IssueSolver</span>{" "}
              - your voice in action.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
              <Link
                to="/register"
                className="group relative bg-gradient-to-r from-[#FF7F32] to-[#FF5F20] hover:from-[#FF5F20] hover:to-[#FF7F32] text-white px-10 py-3.5 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Become a Solver</span>
                <span className="absolute inset-0 w-full h-full bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 opacity-20"></span>
              </Link>
              <button
                onClick={handleClick}
                className="group relative border-2 border-[#FF7F32] text-[#FF7F32] hover:bg-[#FF7F32] hover:text-white px-10 py-3.5 rounded-full text-lg font-semibold transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10">Already Registered?</span>
                <span className="absolute inset-0 w-full h-full bg-[#FF7F32] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 opacity-10"></span>
              </button>
            </div>
          </div>
          {/* Right - Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#FF7F32] to-[#FF5F20] rounded-2xl blur-md opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <img
                src={home_2}
                alt="Community Hero"
                className="relative w-full max-w-md md:max-w-lg rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-700 border-4 border-white object-cover"
                style={{ maxHeight: "400px" }}
              />
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#FF7F32"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V16"
                    stroke="#FF7F32"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12H16"
                    stroke="#FF7F32"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#FF5F20] rounded-full shadow-lg flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-sm text-gray-500 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#f9f9f9] px-6 md:px-20 relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <div className="w-16 h-1.5 bg-gradient-to-r from-[#FF7F32] to-[#FF5F20] rounded-full mb-6"></div>
            <h2 className="text-4xl font-bold text-center text-[#2C2C2C] tracking-tight">
              What You Can Do
            </h2>
            <p className="text-gray-500 mt-4 text-center max-w-2xl">
              Our platform empowers you to make a real difference in your
              community through these key features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <div className="w-16 h-16 rounded-2xl bg-[#FFEFE5] flex items-center justify-center mb-6">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 8V16M12 16L16 12M12 16L8 12"
                        stroke="#FF7F32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#FF7F32"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                ),
                title: "Instant Reporting",
                desc: "Quickly log problems like potholes, broken lights, or waste management issues in your area with just a few taps.",
              },
              {
                icon: (
                  <div className="w-16 h-16 rounded-2xl bg-[#FFEFE5] flex items-center justify-center mb-6">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 8V12L14 14"
                        stroke="#FF7F32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.05078 11.0002C3.27441 7.58016 5.89453 4.76953 9.23047 4.18945C12.5664 3.60938 15.8496 5.53906 17.0723 8.70703C18.2949 11.875 17.2129 15.5273 14.3926 17.5664C11.5723 19.6055 7.69531 19.3457 5.18359 16.9141C3.9375 15.7148 3.19922 14.1113 3.05078 12.4277V11.0002Z"
                        stroke="#FF7F32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#FF7F32"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                ),
                title: "Real-time Tracking",
                desc: "Get notified as your issue moves through the resolution pipeline with full transparency and status updates.",
              },
              {
                icon: (
                  <div className="w-16 h-16 rounded-2xl bg-[#FFEFE5] flex items-center justify-center mb-6">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
                        stroke="#FF7F32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                        stroke="#FF7F32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"
                        stroke="#FF7F32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88"
                        stroke="#FF7F32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ),
                title: "Stronger Communities",
                desc: "Encourage community participation and collaborative efforts to improve civic life through shared responsibility.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border border-gray-100"
              >
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-2xl font-bold text-[#2C2C2C] mb-4 group-hover:text-[#FF7F32] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>

                <div className="mt-auto pt-6 flex justify-center">
                  <div className="w-12 h-1 bg-[#FF7F32]/20 rounded-full group-hover:w-24 transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Illustration Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#FF7F32]/20 to-[#FFEFE5] rounded-3xl blur-md"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <img
                    src={home_1}
                    alt="Community Empowerment"
                    className="w-full h-auto rounded-lg shadow-md object-cover"
                    style={{ maxHeight: "300px" }}
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#f9f9f9] rounded-full flex items-center justify-center shadow-md">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#FF7F32"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 16V16.01"
                        stroke="#FF7F32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 13C11.9816 12.6037 12.1672 12.2226 12.4933 11.9933C12.8194 11.7639 13.2333 11.6846 13.62 11.78C14.0067 11.8754 14.3346 12.1368 14.5212 12.4983C14.7079 12.8598 14.7342 13.2908 14.5933 13.6733C14.4524 14.0558 14.1585 14.3596 13.78 14.5C13.6399 14.5497 13.5066 14.6179 13.3834 14.7033C13.2601 14.7886 13.1481 14.8903 13.0507 15.0053C12.9534 15.1204 12.8718 15.2474 12.8088 15.3827C12.7457 15.518 12.7018 15.6601 12.6785 15.8053C12.6552 15.9506 12.6527 16.0979 12.6712 16.2433"
                        stroke="#FF7F32"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-[#FF7F32] rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5L19 12L12 19"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1 bg-[#FFEFE5] rounded-full text-[#FF7F32] font-medium text-sm mb-6">
                Community Impact
              </div>
              <h2 className="text-4xl font-bold text-[#2C2C2C] mb-6">
                Transform Your Neighborhood
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Every report you submit helps create a better living environment
                for everyone. Our platform connects citizens with local
                authorities to solve problems efficiently.
              </p>

              <div className="space-y-4">
                {[
                  "Transparent issue tracking from report to resolution",
                  "Direct communication with relevant departments",
                  "Community-driven prioritization of issues",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FFEFE5] flex items-center justify-center mr-3 mt-0.5">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="#FF7F32"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-r from-[#f9f9f9] to-[#ffffff] text-center px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-1 bg-white rounded-full shadow-sm mb-8">
            <div className="px-6 py-1.5 bg-gradient-to-r from-[#FF7F32] to-[#FF5F20] rounded-full">
              <span className="text-white font-medium text-sm">
                Our Purpose
              </span>
            </div>
          </div>

          <h3 className="text-4xl font-bold text-[#2C2C2C] mb-8">
            Our <span className="text-[#FF7F32]">Mission</span>
          </h3>

          <p className="text-xl text-gray-600 leading-relaxed mb-10">
            We aim to empower citizens by providing a simple and efficient way
            to communicate issues to the authorities. By bridging this gap, we
            make communities cleaner, safer, and more responsive.
          </p>

          <div className="flex justify-center">
            <div className="w-24 h-1.5 bg-gradient-to-r from-[#FF7F32] to-[#FF5F20] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFEFE5] rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFEFE5] rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#f9f9f9] to-white rounded-3xl shadow-xl p-12 border border-gray-100">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-[#2C2C2C] mb-6">
                Ready to take action?
              </h3>
              <p className="text-gray-600 mb-10 max-w-lg mx-auto">
                Join IssueSolver today and help transform your community.
                Together, we can make a difference one report at a time.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link
                  to="/register"
                  className="group relative bg-gradient-to-r from-[#FF7F32] to-[#FF5F20] hover:from-[#FF5F20] hover:to-[#FF7F32] text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Join the Movement</span>
                  <span className="absolute inset-0 w-full h-full bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 opacity-20"></span>
                </Link>
                <button
                  onClick={handleClick}
                  className="group relative border-2 border-[#FF7F32] text-[#FF7F32] hover:bg-[#FF7F32] hover:text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10">Learn More</span>
                  <span className="absolute inset-0 w-full h-full bg-[#FF7F32] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 opacity-10"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-6 md:px-20 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <div className="w-16 h-1.5 bg-gradient-to-r from-[#FF7F32] to-[#FF5F20] rounded-full mb-6"></div>
            <h2 className="text-3xl font-bold text-[#2C2C2C] mb-2">
              Explore Issues Around You
            </h2>
            <p className="text-gray-500 text-center max-w-2xl">
              See what issues have been reported in your area and track their
              resolution status
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-1">
              <MapWithPosts containerHeight="500px" zoomLevel={13} />
            </div>

            <div className="bg-gradient-to-r from-[#f9f9f9] to-white p-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-gray-600">Resolved</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                  <span className="text-sm text-gray-600">In Progress</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "500+", label: "Issues Resolved", color: "#FF7F32" },
              { number: "50+", label: "Communities Served", color: "#FF5F20" },
              { number: "95%", label: "Satisfaction Rate", color: "#FF7F32" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#f9f9f9] rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <h3
                  className="text-4xl font-bold mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
