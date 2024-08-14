import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PlanCard from "../components/PlanCard";

function Plans() {
  const plans = [
    {
      title: "Basic",
      price: "10",
      features: [
        "Access to gym",
        "Free water",
        "Standard equipment",
        "Locker room access",
        "Group classes (limited)",
        "No contract required",
      ],
    },
    {
      title: "Premium",
      price: "25",
      features: [
        "All Basic features",
        "Premium equipment",
        "Personal trainer",
        "Unlimited group classes",
        "Sauna and steam room access",
        "Priority support",
      ],
    },
    {
      title: "Elite",
      price: "50",
      features: [
        "All Premium features",
        "Access to VIP lounge",
        "Specialized training programs",
        "Nutrition plan consultation",
        "Complimentary fitness gear",
        "Exclusive events and workshops",
      ],
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center py-12">
        <h1 className="text-4xl font-bold text-white mb-12">
          Choose Your Plan
        </h1>
        <div className="flex justify-center">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Plans;
