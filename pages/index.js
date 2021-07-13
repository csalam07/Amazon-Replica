import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import Footer from "../components/Footer";
import ClosingAlert from "@material-tailwind/react/ClosingAlert";
import { useEffect, useState } from "react";

export default function Home({ products }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <div className="h-screen bg-gray-100 scrollbar-thin  scrollbar-thumb-yellow-400 scrollbar-track-transparent">
      <Head>
        <title>Amazon</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      {show && (
        <ClosingAlert color="lightBlue">
          Disclaimer: This is not an original amazon. Its a repica of that.
          Please do not use your real credit/debit details.
        </ClosingAlert>
      )}

      <main className="max-x-screen-2xl mx-auto ">
        <Banner />
        <ProductFeed products={products} />
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json(),
  );
  return {
    props: { products },
  };
}
