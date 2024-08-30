import React from "react";
import { useCart } from "../config/Context/CartContext";

const PlanCard = ({ title, price, features }) => {
  const item = {
    id: price,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmFwmEITv5_Cz4SARBjGkP9b6fQdRklSVH1g&s",
    price,
    title,
    description: features,
    quantity: 1,
  };
  const { dispatch } = useCart();
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  return (
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
      <button
        className="bg-white text-black py-2 px-4 rounded hover:bg-gray-300"
        onClick={() => addToCart(item)}
      >
        Join Now
      </button>
    </div>
  );
};
export default PlanCard;
