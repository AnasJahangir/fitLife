import React from "react";
import Navbar from "../components/Navbar";
import { CarouselCustom } from "../components/Carousel";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import AllProducts from "../components/AllProducts";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Navbar />
      <CarouselCustom />
      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/athletic-man-practicing-gymnastics-keep-fit_23-2150989961.jpg?t=st=1725221094~exp=1725224694~hmac=eaa56a7d2ce89615ce9e551f9fc00f9afeed66b3dd387fbabe401df087315b39&w=740')",
        }}
      >
        <h2 className="text-5xl font-extrabold mb-4">Get Fit, Stay Strong</h2>
        <p className="text-xl mb-8">
          Join our gym and transform your body and mind
        </p>
        <Link
          to={"/plans"}
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-300"
        >
          Join Now
        </Link>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-8">
        <h3 className="text-4xl font-bold mb-6 text-center">About Us</h3>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed text-center">
          We are a fitness community dedicated to helping you achieve your
          goals. Our gym offers a wide range of equipment, classes, and personal
          training sessions.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-8 bg-gray-900">
        <h3 className="text-4xl font-bold mb-6 text-center">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <img
              src="https://img.freepik.com/premium-photo/muscular-shirtless-athlete-lifting-dumbbells-bench-8k-gym-scene_205485-27162.jpg?w=740"
              alt="Service 1"
              className="mb-4 rounded-md shadow-lg w-60 h-60 object-cover"
            />
            <h4 className="text-2xl font-semibold">Personal Training</h4>
            <p className="text-center">
              One-on-one coaching to help you reach your fitness goals.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://img.freepik.com/free-photo/woman-helping-man-gym_23-2149627070.jpg?t=st=1725221234~exp=1725224834~hmac=b074fb56d8d60b5798f3b8dac9799bc9cf95467c9fa083be023ba04714873d43&w=740"
              alt="Service 2"
              className="mb-4 rounded-md shadow-lg w-60 h-60 object-cover"
            />
            <h4 className="text-2xl font-semibold">Group Classes</h4>
            <p className="text-center">
              Join our group classes and have fun while getting fit.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://img.freepik.com/free-photo/young-adult-doing-indoor-sport-gym_23-2149205576.jpg?t=st=1725221267~exp=1725224867~hmac=112375eb1729ee31506c07416d51fd262e362b3739f2601d48410ff188b6e70c&w=740"
              alt="Service 3"
              className="mb-4 rounded-md shadow-lg w-60 h-60 object-cover"
            />
            <h4 className="text-2xl font-semibold">Nutritional Advice</h4>
            <p className="text-center">
              Get personalized diet plans to complement your workouts.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
