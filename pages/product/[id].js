import Icon from "@material-tailwind/react/Icon";
import Head from "next/head";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Product from "../../components/Product";
import Button from "@material-tailwind/react/Button";
import Currency from "react-currency-formatter";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef } from "react";
import { addToBasket } from "../../slices/basketSlice";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

function product({ products, product }) {
  const router = useRouter();
  const { id } = router.query;

  const productRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    productRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [id]);

  const addItemToBasket = () => {
    const productSingle = {
      id: product.id,
      title: product.title,
      price: product.price,
      rating: product.rating,
      hasPrime: product.hasPrime,
      description: product.description,
      category: product.category,
      image: product.image,
      quantity: 1,
    };
    dispatch(addToBasket(productSingle));
  };
  return (
    <div className="h-screen scrollbar-thin  scrollbar-thumb-yellow-400 scrollbar-track-transparent">
      <Head>
        <title>amazon</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header products={products} />

      <header className="bg-gray-50 p-10 mb-10" ref={productRef}>
        <div className="flex items-center space-x-4 max-w-screen-xl mx-auto">
          <Icon name="home" size="md" color="yellow" /> Home
          <Icon name="double_arrow" size="md" color="yellow" />
          <span className="truncate">{product.category}</span>
          <Icon name="double_arrow" size="md" color="yellow" />
          <span className="truncate">{product.title}</span>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto mt-5">
        <div className="flex flex-wrap">
          <div className="px-5 mb-7 w-full md:w-7/12">
            <div className="w-full mb-4">
              <motion.figure className="image" layoutId="image">
                <Image
                  width={700}
                  height={500}
                  objectFit="contain"
                  src={product.image}
                  alt={product.title}
                />
              </motion.figure>
            </div>
          </div>
          <div className="px-5 mb-10 w-full md:w-5/12">
            <p className="font-serif text-xl text-black">{product.category}</p>
            <h1 className="my-2 text-5xl text-yellow-500 mb-7">
              {product.title}
            </h1>
            <p className="text-gray-600 text-base mb-5">
              {product.description}
            </p>
            <p className="flex items-center">
              <b className="mr-1">Rating:</b> 3
              <Icon name="star" color="yellow" size="md" />
              {/* <span> ({reviews})</span> */}
            </p>
            <p>
              <b>Company:</b> csalam
            </p>
            <p>
              <b>Stock:</b> Available in stock
              {/* {stock > 0 ? "Available in stock" : "Stock out!"} */}
            </p>

            <p className="text-yellow-500 text-2xl mb-7">
              <Currency quantity={product.price} />
            </p>

            <div className="flex items-center space-x-2">
              <img
                className="w-12"
                src="https://links.papareact.com/fdw"
                alt=""
              />
              <p className="text-xs text-gray-500">Free Next-day delivery</p>
            </div>

            {/* <QuantityCount setQuantity={setQuantity} quantity={quantity} /> */}
            <Button
              onClick={addItemToBasket}
              buttonType="filled"
              size="lg"
              ripple="light"
              block={true}
              className="mt-auto button"
            >
              <Icon name="shopping_bag" size="sm" />
              Add to Cart
            </Button>
          </div>
        </div>
      </main>
      <div className="mt-12 bg-gradient-to-t from-gray-100 to-transparent">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="text-yellow-500 ml-10 text-3xl mb-7">Also Bought</h1>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-100 grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {products
              .slice(product.id, product.id + 8)
              .map(({ id, title, price, description, category, image }) => (
                <Product
                  products={products}
                  key={id}
                  id={id}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                />
              ))}
          </motion.div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default product;
export const getStaticPaths = async () => {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (response) => response.json(),
  );

  const paths = products.map((product) => {
    return {
      params: { id: product.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps(context) {
  const id = context.params.id;
  const product = await fetch(`https://fakestoreapi.com/products/${id}`).then(
    (res) => res.json(),
  );
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json(),
  );
  return {
    props: { product, products },
  };
}
