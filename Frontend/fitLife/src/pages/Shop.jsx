import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AllProducts from "../components/AllProducts";

function Shop() {
  return (
    <div>
      <Navbar />
      <div className="min-h-[100vh]">
        <AllProducts />
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
