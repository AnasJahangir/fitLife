import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useCart } from "../config/Context/CartContext";
import { useState } from "react";

export function EcommerceCard({ item }) {
  const { imageUrl, price, title, description } = item;
  const { state, dispatch } = useCart();
  const matchedItem = state.cart.find((v) => v.id === item.id);
  const [count, setCount] = useState(matchedItem ? matchedItem.quantity : 1);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: count } });
  };

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  return (
    <Card className="w-full">
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          src={imageUrl}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-bold">
            {title}
          </Typography>
          <Typography color="blue-gray" className="font-bold">
            ${price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex items-center">
        <Button
          ripple={false}
          fullWidth={true}
          onClick={() => addToCart(item)}
          className="bg-black text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          disabled={matchedItem && matchedItem.quantity === count}
        >
          {matchedItem ? "Update Cart" : "Add to Cart"}
        </Button>
        <button
          className="bg-gray-300 ms-5 me-2 w-14 h-9 text-2xl flex justify-center items-center rounded-full"
          onClick={handleDecrement}
          disabled={count <= 1 && !matchedItem}
        >
          -
        </button>
        <span>{count}</span>
        <button
          className="bg-gray-300 ms-2 w-14 h-9 text-2xl flex justify-center items-center rounded-full"
          onClick={handleIncrement}
        >
          +
        </button>
      </CardFooter>
    </Card>
  );
}
