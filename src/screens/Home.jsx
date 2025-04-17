import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="font-sans bg-white text-[#2C2C2C] min-h-screen">
      

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-[#fff] to-[#F4F4F4] px-6 md:px-20">
  <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
    
    {/* Left - Text */}
    <div className="flex-1 text-center lg:text-left">
      <h1 className="text-4xl md:text-6xl font-extrabold text-[#2C2C2C] leading-tight mb-6">
        Help Improve <br /> Your Community.
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl">
        Report civic problems, track progress, and make a real difference with{" "}
        <span className="text-[#FF7F32] font-semibold">IssueSolver</span> — your voice in action.
      </p>
      <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
        <Link
          to="/register"
          className="bg-[#FF7F32] hover:bg-[#FF5F20] text-white px-8 py-3 rounded-full text-lg font-medium shadow transition duration-300"
        >
          Become a Solver
        </Link>
        <Link
          to="/login"
          className="border border-[#FF7F32] text-[#FF7F32] hover:text-white hover:bg-[#FF7F32] px-8 py-3 rounded-full text-lg font-medium transition duration-300"
        >
          Already Registered?
        </Link>
      </div>
    </div>

    {/* Right - Image */}
    <div className="flex-1 flex justify-center">
      <img
        src="https://www.shutterstock.com/shutterstock/photos/2228942517/display_1500/stock-photo-cinematic-image-of-a-conference-meeting-business-people-sitting-in-a-room-listening-to-the-2228942517.jpg"
        alt="Community Hero"
        className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-lg shadow-lg"
      />
    </div>

  </div>
</section>


      {/* Features Section */}
      <section className="py-20 bg-[#F9FAFB] px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-[#2C2C2C] mb-12">
          What You Can Do
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
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
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1 text-center"
            >
              <h3 className="text-xl font-semibold text-[#FF7F32] mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Illustration Section */}
      <section className="py-20 bg-white text-center">
        <img
          src="https://www.shutterstock.com/shutterstock/photos/2228942517/display_1500/stock-photo-cinematic-image-of-a-conference-meeting-business-people-sitting-in-a-room-listening-to-the-2228942517.jpg"
          alt="Community Empowerment"
          className="w-full max-w-5xl mx-auto rounded-md shadow-xl transition-transform duration-500 hover:scale-105"
        />
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-[#F4F4F4] text-center px-6 md:px-20">
        <h3 className="text-3xl font-semibold text-[#43A8FF] mb-6">Our Mission</h3>
        <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
          We aim to empower citizens by providing a simple and efficient way to communicate issues to the authorities. By bridging this gap, we make communities cleaner, safer, and more responsive.
        </p>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#fff] text-center">
        <h3 className="text-2xl font-bold text-[#2C2C2C] mb-6">
          Ready to take action?
        </h3>
        <Link
          to="/register"
          className="bg-[#FF7F32] hover:bg-[#FF5F20] text-white px-8 py-3 rounded-full text-lg font-medium transition duration-300"
        >
          Join the Movement
        </Link>
      </section>
    </div>
  );
};

export default Home;
