import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

// Fixing leaflet's default icon issue in Create React App
import L from "leaflet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const ContactUs = () => {
  const position = [51.505, -0.09]; // Default coordinates for the map

  return (
    <>
      <Navbar />
      <div className="bg-white text-black min-h-screen flex flex-col items-center py-10">
        <h1 className="text-5xl font-bold mb-10">Contact Us</h1>
        <div className="flex flex-col md:flex-row md:space-x-10 w-[80%]">
          <div className="flex-1 space-y-6">
            <div className="flex items-center space-x-4">
              <FaPhone className="text-2xl" />
              <span className="text-xl">+1 234 567 890</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-2xl" />
              <span className="text-xl">contact@company.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-2xl" />
              <span className="text-xl">123 Street, City, Country</span>
            </div>
          </div>
          <div className="flex-1 h-96 mt-10 md:mt-0">
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              className="h-full rounded-lg"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ContactUs;
