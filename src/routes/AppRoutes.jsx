import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Header from '../screens/Header'
import Footer from '../screens/Footer'
import Complaint from '../screens/Complaint'
import Complaints from '../screens/Complaints'
import ProfilePage from '../screens/ProfilePage'
import DepartmentDashboard from '../screens/DepartmentDashboard'


const AppRoutes = () => {
    return (
        <BrowserRouter>
             {/* Conditional Header/Footer rendering */}
             {window.location.pathname !== "/login" && window.location.pathname !== "/register" && (
                <>
                    <Header />
                </>
            )}
            {/* Routes definition */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/complaint" element={<Complaint />} />
                <Route path="/all-complaints" element={<Complaints />} />
                <Route path="/profile" element={<ProfilePage />} />
                
                {/* Dynamic Department Dashboard */}
                <Route path="/dashboard/:department" element={<DepartmentDashboard />} />
            </Routes>

            {/* Conditional Footer rendering */}
            {window.location.pathname !== "/login" && window.location.pathname !== "/register" && (
                <>
                    <Footer />
                </>
            )}
        </BrowserRouter>
    )
}

export default AppRoutes