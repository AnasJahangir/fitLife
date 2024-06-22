import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ component: Component }) {
  const [isUser, setIsUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // here we need authentication code to access the ProtectedRoutes
    if (!isUser) {
      // navigate("/login");
    }
  }, [isUser]);

  return isUser && <Layout component={Component} />;
}

export default ProtectedRoutes;
