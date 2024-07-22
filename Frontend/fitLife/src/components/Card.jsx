import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useCart } from "../config/Context/CartContext";

export function EcommerceCard({ item }) {
  const { imageUrl, price, title, description } = item;
  const { dispatch } = useCart();
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
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
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          onClick={() => addToCart(item)}
          className="bg-black text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
