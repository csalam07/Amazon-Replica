import Head from "next/head";
import { getSession, useSession } from "next-auth/client";
import Header from "../components/Header";
import db from "../firebase";
import Order from "../components/Order";
import LottieFiles from "../components/LottieFiles";
import Icon from "@material-tailwind/react/Icon";

function orders({ orders }) {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>Orders | Amazon</title>
      </Head>
      <div className="bg-gray-100 h-screen scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-transparent">
        <Header />

        <main className="max-w-screen-lg mx-auto mt-10 p-10">
          <h1 className="flex items-center justify-between text-3xl border-b mb-3 pb-2 border-yellow-400">
            <span>Your orders</span>
            <Icon name="shopping_cart" color="yellow" size="3xl" />
          </h1>

          {session ? (
            <p>{orders && orders?.length} Orders</p>
          ) : (
            <p>Please login to see your orders</p>
          )}

          <div className="mt-5 space-y-4">
            {orders ? (
              orders?.map((order) => <Order key={order.id} {...order} />)
            ) : (
              <LottieFiles />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const moment = require("moment");

  // Get the users login credentials...
  const session = await getSession(context);

  if (!session) {
    return { props: {} };
  }

  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      titles: order.data().title,
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    })),
  );

  return {
    props: {
      orders,
    },
  };
}
