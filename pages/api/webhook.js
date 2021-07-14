import { buffer } from "micro";
import * as admin from "firebase-admin";

// secure a connection to FIrebase from the backend
const serviceAccount = require("../../permissions.json");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

//   Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  console.log("fullfill order ", session);

  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      title: JSON.parse(session.metadata.titles),
      status: "fulfilled",
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`success: order ${session.id} has been added to the db `);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;
    // Verify that the request is coming from Stripe

    try {
      event = await stripe.webhooks.constructEvent(
        payload,
        sig,
        endpointSecret,
      );
    } catch (err) {
      return res.status(400).send(`Bad Request :  ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fulfill the order
      return fulfillOrder(session)
        .then(() => {
          res.status(200).send("success");
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
