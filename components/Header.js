import Image from "next/image";
import Icon from "@material-tailwind/react/Icon";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const [session, laoding] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

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

        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            placeholder="Search"
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          {/* <SearchIcon " /> */}
          <span className="flex text-center p-4">
            <Icon name="search" size="3xl" />
          </span>
        </div>
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          <div className="link" onClick={!session ? signIn : signOut}>
            <p>{session ? `Hello, ${session.user.name}` : "Guest, Sign In"}</p>
            <p className="font-extrabold md:text-xs">Account &amp; List</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-xs">&amp; Orders</p>
          </div>
          <div
            className="relative flex link items-center"
            onClick={() => router.push("/checkout")}
          >
            <span className="absolute top-0 animate-bounce right-0  md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items?.length}
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
          <span className="h-6 mr-1">
            <Icon name="menu" size="3xl" />
          </span>
          All
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
