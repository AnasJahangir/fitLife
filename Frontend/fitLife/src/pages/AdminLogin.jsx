import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
const AdminLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Admin Login";
    const adminToken = localStorage.getItem("AdminToken");
    if (adminToken) {
      navigate("/admin/dashboard");
    }
  });
  const [formData, setFormData] = useState({
    text: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    text: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    let errors = {};
    if (!formData.text) {
      errors.username = "Username is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Clear form errors
    setFormErrors({});

    try {
      // Make API request to your backend
      const response = await axios.post(
        "http://localhost:3000/api/admin/login",
        {
          username: formData.text,
          password: formData.password,
        }
      );

      console.log("API Response:", response.data);
      localStorage.setItem("AdminToken", response.data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      // Handle error responses (e.g., display error message)
      console.error("API Error:", error);
    }
  };

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-[100vh] lg:py-10">
        <Link
          to={"/admin"}
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <img className="w-36 h-36 mr-2" src={Logo} alt="logo" />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Login as a admin
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Username
                </label>
                <input
                  type="username"
                  name="text"
                  id="username"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  outline-none dark:placeholder-gray-400 ${
                    formErrors.text && "border-red-500"
                  }`}
                  placeholder="name@company.com"
                  value={formData.text}
                  onChange={handleChange}
                  required
                />
                {formErrors.username && (
                  <p className="text-sm text-red-500">{formErrors.text}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  outline-none dark:placeholder-gray-400 ${
                    formErrors.password && "border-red-500"
                  }`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {formErrors.password && (
                  <p className="text-sm text-red-500">{formErrors.password}</p>
                )}
              </div>
              <div className="flex items-center justify-between"></div>
              <button
                type="submit"
                className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
