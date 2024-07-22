import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingLayouts from "../Layout/LandingLayouts";
import Home from "../../pages/Home";
import RegisterForm from "../../pages/Register";
import Login from "../../pages/Login";
import AdminLogin from "../../pages/AdminLogin";
import Dashboard from "../../pages/AdminDashboard/Dashboard";
import ProtectedAdmin from "./ProtectedAdmin";
import Products from "../../pages/AdminDashboard/Products";
import AddProduct from "../../pages/AdminDashboard/AddProduct";
import AboutUs from "../../pages/AboutUs";
import Users from "../../pages/AdminDashboard/Users";
import ContactUs from "../../pages/Contact";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingLayouts component={Home} />} />
        <Route
          path="/about-us"
          element={<LandingLayouts component={AboutUs} />}
        />
        <Route
          path="/contact-us"
          element={<LandingLayouts component={ContactUs} />}
        />

        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={<ProtectedAdmin component={Dashboard} />}
        />
        <Route
          path="/admin/dashboard/products"
          element={<ProtectedAdmin component={Products} />}
        />
        <Route
          path="/admin/dashboard/add-product"
          element={<ProtectedAdmin component={AddProduct} />}
        />
        <Route
          path="/admin/dashboard/users"
          element={<ProtectedAdmin component={Users} />}
        />
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
