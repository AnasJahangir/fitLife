import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

function LandingLayouts({ component: Component }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <div>
      <Component />
    </div>
  );
}

export default LandingLayouts;
