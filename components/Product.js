import Button from "@material-tailwind/react/Button";
import { useState } from "react";
import Icon from "@material-tailwind/react/Icon";
import Currency from "react-currency-formatter";
import Image from "next/image";
import Label from "@material-tailwind/react/Label";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
import { useRouter } from "next/dist/client/router";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [hasPrime] = useState(Math.random() < 0.5);
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING,
  );

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      hasPrime,
      description,
      category,
      image,
      quantity: 1,
    };
    dispatch(addToBasket(product));
  };
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <Label
        className="absolute top-2 right-2 text-xs italic text-gray-400"
        color="yellow"
      >
        {category}
      </Label>

      <Image
        className="cursor-pointer transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse"
        src={image}
        height={200}
        width={200}
        objectFit="contain"
        onClick={() => router.push(`/product/${id}`)}
      />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <Icon name="star" color="yellow" key={i} />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="GBP" />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-8"
            alt=""
            src="https://images-eu.ssl-images-amazon.com/images/G/31/x-locale/cs/help/images/gateway/Prime_clear-bg._CB485925770_.png"
          />
          <p className="text-xs text-gray-500">FREE Next-Day Delivery</p>
        </div>
      )}
      <Button
        onClick={addItemToBasket}
        size="lg"
        ripple="light"
        className="mt-auto button"
      >
        <Icon name="shopping_bag" size="sm" />
        Add to Cart
      </Button>
    </div>
  );
}

export default Product;
