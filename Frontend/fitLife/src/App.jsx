import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MyRoutes from "./config/Router/Routes";
import { UserContext } from "./config/Context/UserContext";

function App() {
  const { user, login } = useContext(UserContext);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userdata"));
    if (userData) {
      login(userData);
    }
  }, []);
  return <MyRoutes />;
}

export default App;
