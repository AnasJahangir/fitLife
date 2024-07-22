import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create a context for the cart
const CartContext = createContext();

const initialState = {
  cart: [],
};

// Reducer function to handle cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { ...state, cart: updatedCart };
      } else {
        const updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { ...state, cart: updatedCart };
      }

    case "REMOVE_FROM_CART":
      const updatedCartRemove = state.cart.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(updatedCartRemove));
      return { ...state, cart: updatedCartRemove };

    case "LOAD_CART":
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};

// Provider component to wrap the app
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch({ type: "LOAD_CART", payload: savedCart });
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};