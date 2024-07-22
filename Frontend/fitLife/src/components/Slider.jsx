import React, { useEffect, useState } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // Ensure this line is included
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import axios from "axios";
import { EcommerceCard } from "./Card";

// Install modules
SwiperCore.use([Navigation, Pagination]);

const Slider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products");
        if (res.data) {
          const featuredProducts = res.data.filter(
            (product) => product.featured === 1
          );
          setProducts(featuredProducts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="mt-10 my-20">
      <h1 className="text-[60px] font-bold text-center my-10">
        Featured Products
      </h1>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1.5, // Show a partial preview of the next slide on smaller screens
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2, // Adjust slidesPerView for tablet-sized screens
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3, // Default slidesPerView for larger screens
            spaceBetween: 10,
          },
        }}
        navigation={true} // Use Swiper's built-in navigation
        pagination={false} // Disable pagination dots
        modules={[Navigation, Pagination]}
        className="mySwiper relative w-[90%]"
      >
        {products.map((item, i) => (
          <SwiperSlide key={i}>
            <EcommerceCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
