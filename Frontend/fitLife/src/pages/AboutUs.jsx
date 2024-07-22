// src/components/AboutUs.jsx
import React from "react";
import {
  Button,
  Typography,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import teamPhoto1 from "../assets/images/gym-1.jpeg"; // Replace with your image paths
import teamPhoto2 from "../assets/images/gym-1.jpeg"; // Replace with your image paths
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  const navigate = useNavigate("");
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 bg-white text-gray-800">
        {/* Header Section */}
        <div className="text-center mb-12">
          <Typography
            variant="h1"
            className="text-4xl font-bold mb-4 text-black"
          >
            About Us
          </Typography>
          <Typography variant="lead" className="text-lg text-gray-600">
            Discover more about our mission, values, and team.
          </Typography>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Typography
              variant="h2"
              className="text-3xl font-bold mb-4 text-black"
            >
              Our Mission
            </Typography>
            <Typography className="text-lg text-gray-700">
              At FitLife, we believe in more than just fitness; we believe in
              transforming lives. Our state-of-the-art facilities, experienced
              trainers, and supportive community are here to help you reach your
              health and wellness goals. Whether you’re looking to get fit,
              build strength, or find a new passion, we’ve got you covered.
            </Typography>
          </div>
          <div className="md:w-1/2">
            <img
              src={teamPhoto1}
              alt="Team"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Offerings Section */}
        <div className="mb-12">
          <Typography
            variant="h2"
            className="text-3xl font-bold text-center mb-6 text-black"
          >
            What We Offer
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white border border-gray-300">
              <CardBody>
                <Typography variant="h5" className="mb-4 text-black">
                  Personal Training
                </Typography>
                <Typography className="text-gray-700">
                  Our certified trainers offer personalized workout plans and
                  one-on-one sessions tailored to your goals.
                </Typography>
              </CardBody>
              <CardFooter>
                <Button
                  color="gray"
                  className="text-black bg-gray-200 hover:bg-gray-300"
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            <Card className="bg-white border border-gray-300">
              <CardBody>
                <Typography variant="h5" className="mb-4 text-black">
                  Group Classes
                </Typography>
                <Typography className="text-gray-700">
                  Join our diverse range of group classes including yoga, HIIT,
                  spinning, and strength training.
                </Typography>
              </CardBody>
              <CardFooter>
                <Button
                  color="gray"
                  className="text-black bg-gray-200 hover:bg-gray-300"
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            <Card className="bg-white border border-gray-300">
              <CardBody>
                <Typography variant="h5" className="mb-4 text-black">
                  Nutrition Coaching
                </Typography>
                <Typography className="text-gray-700">
                  Achieve your fitness goals faster with personalized meal plans
                  and dietary advice.
                </Typography>
              </CardBody>
              <CardFooter>
                <Button
                  color="gray"
                  className="text-black bg-gray-200 hover:bg-gray-300"
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Meet Our Team Section */}
        <div className="mb-12">
          <Typography
            variant="h2"
            className="text-3xl font-bold text-center mb-6 text-black"
          >
            Meet Our Team
          </Typography>
          <div className="flex flex-col md:flex-row justify-around items-center">
            <Card className="w-full md:w-1/3 mb-6 md:mb-0 bg-white border border-gray-300">
              <img
                src={teamPhoto2}
                alt="Team Member"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardBody>
                <Typography variant="h5" className="mb-2 text-black">
                  Jane Doe
                </Typography>
                <Typography className="text-gray-600">
                  Certified Personal Trainer
                </Typography>
              </CardBody>
            </Card>
            <Card className="w-full md:w-1/3 mb-6 md:mb-0 bg-white border border-gray-300">
              <img
                src={teamPhoto2}
                alt="Team Member"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardBody>
                <Typography variant="h5" className="mb-2 text-black">
                  John Smith
                </Typography>
                <Typography className="text-gray-600">
                  Nutrition Specialist
                </Typography>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <Typography
            variant="h2"
            className="text-3xl font-bold mb-4 text-black"
          >
            Join Us Today!
          </Typography>
          <Typography className="text-lg text-gray-700 mb-6">
            Ready to start your fitness journey? Visit us at [Gym Address] or
            call us at [Phone Number] to schedule a tour or sign up for a
            membership.
          </Typography>
          <Button
            color="gray"
            className="text-black bg-gray-200 hover:bg-gray-300"
            size="lg"
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AboutUs;
