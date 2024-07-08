import React from "react";
import { Navigate } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout.jsx";

const ProtectedAdmin = ({ component: Component, ...rest }) => {
  // Authentication logic
  const isAuthenticated = true; // Replace with your authentication logic

  return isAuthenticated ? (
    <AdminLayout>
      <Component {...rest} />
    </AdminLayout>
  ) : (
    <Navigate to="/admin" />
  );
};

export default ProtectedAdmin;
