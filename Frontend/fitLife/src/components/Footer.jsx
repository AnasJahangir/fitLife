// src/components/Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import logo from "../assets/images/logo.png"; // Replace with your logo path

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <div className="mb-6 md:mb-0">
          <img src={logo} alt="Gym Logo" className="h-12 w-auto" />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row mb-6 md:mb-0">
          <Link
            to={"/"}
            className="text-gray-300 hover:text-white mx-2 mb-2 md:mb-0"
          >
            Home
          </Link>
          <Link
            to={"/about-us"}
            className="text-gray-300 hover:text-white mx-2 mb-2 md:mb-0"
          >
            About Us
          </Link>
          <Link
            to={"/plans"}
            className="text-gray-300 hover:text-white mx-2 mb-2 md:mb-0"
          >
            Plans
          </Link>
          <Link
           to={"/contact-us"}
            className="text-gray-300 hover:text-white mx-2 mb-2 md:mb-0"
          >
            Contact
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            <FaLinkedinIn size={24} />
          </a>
        </div>
      </div>

      <div className="text-center mt-6 text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} FitLife. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
