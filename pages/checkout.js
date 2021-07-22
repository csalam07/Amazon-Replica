import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import H4 from "@material-tailwind/react/Heading4";
import { useSelector } from "react-redux";
import {
  selectItems,
  selectTotal,
  selectTotalItems,
} from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import Button from "@material-tailwind/react/Button";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import LottieFiles from "../components/LottieFiles";

const stripePromise = loadStripe(process.env.stripe_public_key);

function checkout() {
  const items = useSelector(selectItems);
  console.warn(items);
  const total = useSelector(selectTotal);
  const selectTotalItem = useSelector(selectTotalItems);
  const [session] = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the backend to create a session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

  return (
    <>
      <Head>
        <title>Checkout | Amazon</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="bg-white h-screen scrollbar-thin  scrollbar-thumb-yellow-400 scrollbar-track-transparent">
        <Header />
        <main className="md:flex max-w-screen-2xl mx-auto">
          {/* left */}
          <div className="flex-grow m-5 shadow-sm">
            <Image
              className="mx-auto"
              src="https://links.papareact.com/ikj"
              width={1020}
              height={250}
              objectFit="contain"
              alt="banner"
            />

            <div className="flex flex-col p-5 space-y-10 bg-white">
              <H4 color="lightBlue">
                {items?.length ? (
                  `${items?.length} items in Basket`
                ) : (
                  <>
                    <H4> Empty basket. Nothing to show</H4>
                    <LottieFiles />
                  </>
                )}
              </H4>

              {items.map((item, i) => (
                <CheckoutProduct
                  key={i}
                  id={item.id}
                  title={item.title}
                  rating={item.rating}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                  image={item.image}
                  hasPrime={item.hasPrime}
                  quantity={item.quantity}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col bg-white p-7 shadow-md">
            {items.length > 0 && (
              <>
                <h2 className="whitespace-nowrap">
                  Subtotal ({selectTotalItem} items):{" "}
                  <span className="font-bold">
                    <Currency quantity={total} currency="GBP" />
                  </span>
                </h2>

                <Button
                  role="link"
                  onClick={createCheckoutSession}
                  className={`button mt-2 ${
                    !session &&
                    `cursor-not-allowed from-gray-300 to-gray-500 text-gray-300`
                  }`}
                >
                  {!session ? "Sign in to checkout" : "Proceed to checkout"}
                </Button>
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default checkout;
