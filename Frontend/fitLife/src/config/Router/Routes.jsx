import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingLayouts from "../Layout/LandingLayouts";
import Home from "../../pages/Home";
import RegisterForm from "../../pages/Register";
import Login from "../../pages/Login";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingLayouts component={Home} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
