import Icon from "@material-tailwind/react/Icon";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import H3 from "@material-tailwind/react/Heading3";
import H4 from "@material-tailwind/react/Heading4";
import H5 from "@material-tailwind/react/Heading5";
import H6 from "@material-tailwind/react/Heading6";

function product({ products }) {
  return (
    <div>
      <Head>
        <title>Amazon</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header products={products} />

      <header className="flex items-center space-x-5 p-5  max-w-sm ml-20 mt-10">
        <Icon name="home" size="md" color="yellow" /> Home
        <Icon name="double_arrow" size="md" color="yellow" /> Mens
        <Icon name="double_arrow" size="md" color="yellow" />
        title
      </header>
      <main className="flex ">
        <div className="px-20 flex-[0.5] ">
          <Image
            src="/favicon.png"
            height={400}
            width={400}
            objectFit="contain"
          />
        </div>
        <div className="flex-grow flex-[0.5] bg-red-400">
          <H3 color="Black">Material Tailwind</H3>
          <p>description</p>
        </div>
      </main>
    </div>
  );
}

export default product;
export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json(),
  );
  return {
    props: { products },
  };
}
