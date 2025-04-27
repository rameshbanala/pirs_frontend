import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DepartmentPosts from "./DepartmentPosts";
import MapWithPosts from "./MapWithPosts";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const cookies = document.cookie.split(";");
    const jwtCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("jwt=")
    );
    console.log(jwtCookie);
    if (jwtCookie) {
      navigate("/complaint");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="font-sans bg-gradient-to-b from-[#fff] to-[#f9fafb] text-[#2C2C2C] min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 animate-fadeInUp">
          {/* Left - Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-[#FF7F32] to-[#FF5F20] bg-clip-text text-transparent">
              Help Improve <br /> Your Community.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl">
              Report civic problems, track progress, and make a real difference
              with{" "}
              <span className="text-[#FF7F32] font-semibold">IssueSolver</span>{" "}
              — your voice in action.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
              <Link
                to="/register"
                className="bg-[#FF7F32] hover:bg-[#FF5F20] text-white px-10 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Become a Solver
              </Link>
              <button
                onClick={handleClick}
                className="border-2 border-[#FF7F32] text-[#FF7F32] hover:bg-[#FF7F32] hover:text-white px-10 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow hover:shadow-md transform hover:-translate-y-1"
              >
                Already Registered?
              </button>
            </div>
          </div>

          {/* Right - Image */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://www.shutterstock.com/shutterstock/photos/2228942517/display_1500/stock-photo-cinematic-image-of-a-conference-meeting-business-people-sitting-in-a-room-listening-to-the-2228942517.jpg"
              alt="Community Hero"
              className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#f9fafb] px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-[#2C2C2C] mb-16">
          What You Can Do
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Instant Reporting",
              desc: "Quickly log problems like potholes, broken lights, or waste management issues in your area.",
            },
            {
              title: "Real-time Tracking",
              desc: "Get notified as your issue moves through the resolution pipeline with full transparency.",
            },
            {
              title: "Stronger Communities",
              desc: "Encourage community participation and collaborative efforts to improve civic life.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 text-center border-t-4 border-orange-400"
            >
              <h3 className="text-2xl font-bold text-[#FF7F32] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Illustration Section */}
      <section className="py-24 bg-white text-center">
        <img
          src="https://www.shutterstock.com/shutterstock/photos/2228942517/display_1500/stock-photo-cinematic-image-of-a-conference-meeting-business-people-sitting-in-a-room-listening-to-the-2228942517.jpg"
          alt="Community Empowerment"
          className="w-full max-w-5xl mx-auto rounded-xl shadow-2xl transition-transform duration-500 hover:scale-105 hover:rotate-1"
        />
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-r from-[#f4f4f4] to-[#ffffff] text-center px-6 md:px-20">
        <h3 className="text-4xl font-bold text-[#43A8FF] mb-10">
          Our Mission
        </h3>
        <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
          We aim to empower citizens by providing a simple and efficient way to
          communicate issues to the authorities. By bridging this gap, we make
          communities cleaner, safer, and more responsive.
        </p>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white text-center">
        <h3 className="text-3xl font-bold text-[#2C2C2C] mb-8">
          Ready to take action?
        </h3>
        <Link
          to="/register"
          className="bg-[#FF7F32] hover:bg-[#FF5F20] text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          Join the Movement
        </Link>
      </section>

      {/* Map Section */}
      <div className="w-full mt-20">
        <MapWithPosts containerHeight="400px" zoomLevel={13} />
      </div>
    </div>
  );
};

export default Home;
