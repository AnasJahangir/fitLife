import React from "react";
import Navbar from "../components/Navbar";
import { CarouselCustom } from "../components/Carousel";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import AllProducts from "../components/AllProducts";

function Home() {
  return (
    <div>
      <Navbar />
      <CarouselCustom />
      <Slider />
      <AllProducts />
      <Footer />
    </div>
  );
}

export default Home;
