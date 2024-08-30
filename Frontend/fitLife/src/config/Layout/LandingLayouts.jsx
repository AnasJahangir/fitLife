import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import axios from "axios";

function LandingLayouts({ component: Component }) {
  const { logout, login } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));

  }, []);
  return (
    <div>
      <Component />
    </div>
  );
}

export default LandingLayouts;
