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
  const [count, setCount] = useState(1);
  const addToCart = (product) => {
    product.quantity = count;
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const minusToCart = (productId) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: productId });
  };
  console.log(state.cart);

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
        >
          Add to Cart
        </Button>
        <button
          className="bg-gray-300 ms-5 me-2 w-14 h-9 text-2xl flex justify-center items-center rounded-full "
          onClick={() => count > 0 && setCount(count - 1)}
        >
          -
        </button>
        <span>{count > 0 && count}</span>
        <button
          className="bg-gray-300 ms-2 w-14 h-9 text-2xl flex justify-center items-center rounded-full "
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
      </CardFooter>
    </Card>
  );
}
