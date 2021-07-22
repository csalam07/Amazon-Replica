import Image from "next/image";
import Icon from "@material-tailwind/react/Icon";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import { selectItems, selectTotalItems } from "../slices/basketSlice";
import { useState } from "react";
import SearchItem from "./SearchItem";

function Header({ products }) {
  const [searchTerm, setSearchTerm] = useState([]);

  const [showResults, setShowResults] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const [session, laoding] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  const selectTotalItem = useSelector(selectTotalItems);

  const handleSearch = (e) => {
    let term = e.target.value;
    setSearchTerm(term);
    term = term.toLowerCase();

    setSearchResult(
      term &&
        products?.filter((product) =>
          product.title.toLowerCase().includes(term),
        ),
    );
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="flex items-center p-2 bg-amazon_blue">
        <div className="mt-2 flex items-center sm:flew-grow-0  cursor-pointer">
          <Image
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            width={150}
            height={40}
            objectFit="contain"
            onClick={() => router.push("/")}
          />
        </div>

        {/* search start */}
        <div className="hidden relative sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            placeholder="Search"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            onMouseOver={() => setShowResults(true)}
            onBlur={() => setShowResults(false)}
            onFocus={() => setShowResults(true)}
          />

          <span className="flex text-center p-4">
            <Icon name="search" size="3xl" />
          </span>

          {showResults && (
            <div
              className="absolute w-full bg-white bottom-0 z-10 rounded-md overflow-x-hidden scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-transparent"
              style={{
                transform: "translateY(100%)",
                height: "auto",
                maxHeight: "400px",
                overflowY: "auto",
              }}
              onClick={() => setShowResults(true)}
              onMouseOver={() => setShowResults(true)}
              onMouseLeave={() => setShowResults(false)}
            >
              {searchResult?.length ? (
                searchResult.map(
                  ({ id, title, price, description, category, image }) => (
                    <SearchItem
                      key={id}
                      id={id}
                      title={title}
                      price={price}
                      description={description}
                      category={category}
                      image={image}
                    />
                  ),
                )
              ) : (
                <>
                  {searchTerm && (
                    <p>{`No products found matching ${searchTerm}`}</p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        {/* search end */}

        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="link" onClick={!session ? signIn : signOut}>
            <p>{session ? `Hello, ${session.user.name}` : "Guest, Sign In"}</p>
            <p className="font-extrabold md:text-xs">Account &amp; List</p>
          </div>
          <div className="link" onClick={() => router.push("/orders")}>
            <p>Returns</p>
            <p className="font-extrabold md:text-xs">&amp; Orders</p>
          </div>
          <div
            className="relative flex link items-center"
            onClick={() => router.push("/checkout")}
          >
            <span className="absolute top-0 animate-bounce right-0  md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {selectTotalItem}
            </span>

            <Icon name="shopping_basket" size="5xl" color="white" />
            <p className="hidden md:inline font-extrabold md:text-xs mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* bottom nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm lg:justify-between">
        <p className="link flex items-center">
          <Icon name="menu" size="3xl" />
          <span className=" ml-1">All</span>
        </p>
        <p className="link">Best Sellers</p>
        <p className="link hidden lg:inline-flex">Mobile</p>
        <p className="link">Prime</p>
        <p className="link hidden lg:inline-flex">Fashion</p>
        <p className="link hidden lg:inline-flex">New Releases</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Customer Service</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden md:inline-flex">Health &amp; Personal Care</p>
        <p className="link hidden md:inline-flex">Home &amp; Kitchen</p>
        <p className="link hidden md:inline-flex">Amazon Pay</p>

        <div className="link hidden md:inline-flex">
          <Image
            className="justify-end"
            src="https://9to5toys.com/wp-content/uploads/sites/5/2019/02/amazon-prime-banner.png?"
            width={150}
            height={40}
            objectFit="contain"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
