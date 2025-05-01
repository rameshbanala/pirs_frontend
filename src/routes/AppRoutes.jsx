// src/components/AppRoutesWithRouter.js
import React from "react";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Header from "../screens/Header";
import Footer from "../screens/Footer";
import Complaint from "../screens/Complaint";
import Complaints from "../screens/Complaints";
import ProfilePage from "../screens/ProfilePage";
import DepartmentDashboard from "../screens/DepartmentDashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/complaint"
          element={
            <ProtectedRoute>
              <Complaint />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-complaints"
          element={
            <ProtectedRoute>
              <Complaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:department"
          element={
            <ProtectedRoute>
              <DepartmentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Footer />
      )}
    </>
  );
};

const AppRoutesWithRouter = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default AppRoutesWithRouter;
