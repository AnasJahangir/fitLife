import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingLayouts from "../Layout/LandingLayouts";

function ProtectedRoutes({ component: Component }) {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userdata"));
  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  });

  return <LandingLayouts component={Component} />;
}

export default ProtectedRoutes;
