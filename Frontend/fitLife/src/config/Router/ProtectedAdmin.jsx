import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout.jsx";

const ProtectedAdmin = ({ component: Component, ...rest }) => {
  // Authentication logic
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Replace with your authentication logic
  useEffect(() => {
    const token = localStorage.getItem("AdminToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [Navigate]);
  return isAuthenticated !== false ? (
    <AdminLayout>
      <Component {...rest} />
    </AdminLayout>
  ) : (
    <Navigate to="/admin" />
  );
};

export default ProtectedAdmin;
