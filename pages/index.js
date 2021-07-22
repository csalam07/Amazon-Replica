import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import Footer from "../components/Footer";
import ClosingAlert from "@material-tailwind/react/ClosingAlert";
import { useEffect, useState } from "react";
import Progress from "@material-tailwind/react/Progress";

export default function Home({ products }) {
  const [show, setShow] = useState(true);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const timeId = setInterval(() => {
      setLevel((newLevel) =>
        newLevel >= 100 ? setShow(false) : (newLevel += 20),
      );
    }, 500);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  return (
    <div className="h-screen bg-gray-100 scrollbar-thin  scrollbar-thumb-yellow-400 scrollbar-track-transparent">
      <Head>
        <title>Amazon</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      {show && <Progress color="yellow" value={level} percentage={false} />}
      <Header products={products} />

      <div className="max-w-[70vw] top-30 left-0 right-0 m-auto absolute z-50 flex">
        {show && (
          <ClosingAlert color="lightBlue">
            Disclaimer: This is not an original amazon. Its a replica of amazon.
            Please do not use your real credit/debit
            details.......&nbsp;&nbsp;&nbsp;
          </ClosingAlert>
        )}
      </div>

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
