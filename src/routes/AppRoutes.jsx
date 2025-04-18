import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Header from '../screens/Header'
import Footer from '../screens/Footer'
import Complaint from '../screens/Complaint'
import Complaints from '../screens/Complaints'


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register" element={<Register />} />
                <Route path="/complaint" element={<Complaint />} />
                <Route path="/all-complaints" element={<Complaints />} />

            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default AppRoutes