import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2C2C2C] text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Branding */}
        <div>
          <h4 className="text-2xl font-bold text-[#FF7F32] mb-4">IssueSolver</h4>
          <p className="text-sm text-gray-300">
            Empowering citizens to build better communities through technology and participation.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h5 className="text-lg font-semibold mb-3">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[#FF7F32]">Home</Link></li>
            <li><Link to="/login" className="hover:text-[#FF7F32]">Login</Link></li>
            <li><Link to="/register" className="hover:text-[#FF7F32]">Register</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h5 className="text-lg font-semibold mb-3">Contact</h5>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Email: support@issuesolver.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>City, Country</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h5 className="text-lg font-semibold mb-3">Connect With Us</h5>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#FF7F32]">Facebook</a>
            <a href="#" className="hover:text-[#FF7F32]">Twitter</a>
            <a href="#" className="hover:text-[#FF7F32]">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} IssueSolver. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
