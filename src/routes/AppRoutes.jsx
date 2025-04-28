import React, { useState, useEffect } from "react";
import { Route, BrowserRouter, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Header from "../screens/Header";
import Footer from "../screens/Footer";
import Complaint from "../screens/Complaint";
import Complaints from "../screens/Complaints";
import ProfilePage from "../screens/ProfilePage";
import DepartmentDashboard from "../screens/DepartmentDashboard";
import axios from "axios";

const AppRoutes = () => {
    const [user, setUser] = useState(null);  // Store JWT
    const [loading, setLoading] = useState(true); // Prevent premature rendering
   

    const fetchToken = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/auth/token", {
                withCredentials: true,
            });

            console.log("JWT Token:", response.data.token); // Debugging
            if (response.data.token) {
                setUser(response.data.token); // Store token
            }
        } catch (error) {
            console.error("Error fetching token:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Fetch token only once when component mounts
    useEffect(() => {
        fetchToken();
    }, []);

    // Prevent navigation while loading
    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner
    }

    return (
        <BrowserRouter>
            {/* Conditional Header/Footer rendering */}
            {/* {window.location.pathname !== "/login" && window.location.pathname !== "/register" && } */}
            <Header />
            {/* Routes definition */}
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/login" element={!user?<Login />: <Navigate to="/" />} />
                <Route path="/register" element={!user?<Register />: <Navigate to="/" />} />
                <Route path="/complaint" element={<Complaint />} />
                <Route path="/all-complaints" element={<Complaints />} />
                <Route path="/profile" element={<ProfilePage />} />
                
                {/* Dynamic Department Dashboard */}
                <Route path="/dashboard/:department" element={<DepartmentDashboard />} />
            </Routes>

            {/* Conditional Footer rendering */}
            {location.pathname !== "/login" && location.pathname !== "/register" && <Footer />}
        </BrowserRouter>
    );
};

export default AppRoutes;