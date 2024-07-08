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

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingLayouts component={Home} />} />
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
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
