import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const department = localStorage.getItem("department");

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("username");
      localStorage.removeItem("department");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow-md border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-extrabold text-[#FF7F32] tracking-tight">
              <Link to="/">Issue Solver</Link>
            </div>
            
            <nav className="flex space-x-4 items-center">
              {/* Show these only when logged in */}
              {username && (
                <>
                  <Link
                    to="/all-complaints"
                    className="text-md font-medium text-[#2C2C2C] hover:text-[#FF7F32] transition duration-200"
                  >
                    Complaints
                  </Link>
                  <Link
                    to="/complaint"
                    className="text-md font-medium text-[#2C2C2C] hover:text-[#FF7F32] transition duration-200"
                  >
                    Raise Complaint
                  </Link>
                </>
              )}

              {username ? (
                <>
                  <Link
                    to="/profile"
                    className="text-md font-medium text-[#2C2C2C] hover:text-[#FF7F32] transition duration-200"
                  >
                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      alt="User"
                      className="w-8 h-8 rounded-full ml-2"
                    />
                  </Link>
                  
                  {department && (
                    <Link
                      to={`/dashboard/${department}`}
                      className="text-md font-medium text-[#2C2C2C] hover:text-[#FF7F32] transition duration-200"
                    >
                      Dashboard
                    </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="text-md font-medium text-[#2C2C2C] hover:text-red-500 transition duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-md font-medium text-[#2C2C2C] hover:text-[#FF7F32] transition duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-[#FF7F32] hover:bg-[#FF5F20] text-white text-sm font-medium px-4 py-2 rounded-full transition duration-200 shadow-sm"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
