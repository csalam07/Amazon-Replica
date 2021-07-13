import Icon from "@material-tailwind/react/Icon";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
import Button from "@material-tailwind/react/Button";

function CheckoutProduct({
  id,
  title,
  price,
  rating,
  hasPrime,
  description,
  category,
  image,
}) {
  const dispatch = useDispatch();
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
    };
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
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
        <Button className="button" onClick={addItemToBasket}>
          Add more
        </Button>
        <Button className="button" onClick={removeItemFromBasket}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
