import React from "react";
import { Link } from "react-router-dom";

const PlanCard = ({ title, price, features }) => (
  <div className="bg-black text-white shadow-lg rounded-lg p-6 w-full sm:w-1/3 m-4 border border-gray-700">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p className="text-4xl font-bold mb-6">${price}</p>
    <ul className="text-left mb-6">
      {features.map((feature, index) => (
        <li key={index} className="mb-2">
          {feature}
        </li>
      ))}
    </ul>
    <Link className="bg-white text-black py-2 px-4 rounded hover:bg-gray-300" to={"/contact-us"}>
      Join Now
    </Link>
  </div>
);
export default PlanCard;
