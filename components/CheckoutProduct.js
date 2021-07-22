import Icon from "@material-tailwind/react/Icon";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectItems,
  updateQuantity,
} from "../slices/basketSlice";
import Button from "@material-tailwind/react/Button";
import { useState } from "react";

function CheckoutProduct({
  id,
  title,
  price,
  rating,
  hasPrime,
  description,
  quantity,
  image,
}) {
  const dispatch = useDispatch();
  const [quantityUp, setQuantityUp] = useState(quantity);

  const addItemToBasket = () => {
    setQuantityUp(quantity + 1);
    updateQuantityHere(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 0) {
      setQuantityUp(quantity - 1);
      updateQuantityHere(quantity - 1);
    }
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  const updateQuantityHere = (count) => {
    const product = { id, quantity: count };
    dispatch(updateQuantity(product));
  };

  return (
    <div className="grid grid-cols-5 ">
      <Image src={image} height={200} width={200} objectFit="contain" />

      {/*middle section*/}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <Icon color="yellow" name="star" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="GBP" />
        {" * "} {quantity} {" = "}
        <Currency quantity={price * quantity} currency="GBP" />
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-8"
              alt=""
              src="https://images-eu.ssl-images-amazon.com/images/G/31/x-locale/cs/help/images/gateway/Prime_clear-bg._CB485925770_.png"
            />
            <p className="text-xs text-gray-500">FREE Next-Day Delivery</p>{" "}
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <div className="flex py-2 space-x-3">
          <Button className="button" onClick={addItemToBasket}>
            <Icon name="add" />
          </Button>
          <Button
            color="gray"
            buttonType="link"
            size="small"
            rounded={true}
            block={false}
            iconOnly={false}
            ripple="light"
          >
            {quantity}
          </Button>
          <Button className="button" onClick={decrease}>
            <Icon name="remove" />
          </Button>
        </div>
        <Button className="button" onClick={removeItemFromBasket}>
          remove
        </Button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
