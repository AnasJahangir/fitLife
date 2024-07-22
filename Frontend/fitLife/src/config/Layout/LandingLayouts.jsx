import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import axios from "axios";

function LandingLayouts({ component: Component }) {
  const { logout, login } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    const callme = async () => {
      if (userdata) {
        try {
          // Make API request to your backend
          const response = await axios.get(
            "http://localhost:3000/api/user/getUser",
            { email: userdata.Email },
            {
              headers: {
                Authorization: `Bearer ${userdata.token}`,
              },
            }
          );
          login(response.data);
          // Handle successful sign-in (e.g., redirect user)
        } catch (error) {
          // Handle error responses (e.g., display error message)
          console.error("API Error:", error);
        }
      } else {
        logout();
      }
    };
    callme();
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
}

export default LandingLayouts;
