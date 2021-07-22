import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Currency from "react-currency-formatter";

function SearchItem({ id, title, price, description, category, image }) {
  const router = useRouter();
  return (
    <div
      key={id}
      className="flex items-center space-x-10 p-4 my-2 border-b-2 rounded-md border-gray-100 transition duration-300 ease-in hover:scale-[1.01] hover:bg-gray-100 hover:text-amazon_blue-default"
      onClick={() => router.push(`/product/${id}`)}
    >
      <div className="hidden md:inline-flex">
        <Image
          src={image}
          alt={title}
          height={40}
          width={40}
          objectFit="contain"
        />
      </div>
      <div>
        <h5 className="font-medium text-sm text-gray-600 line-clamp-1">
          {title}
        </h5>

        <p>
          <p className="text-xs text-gray-400 space-x-2">
            <span>{category}</span>
            <Currency quantity={price} />
          </p>
        </p>
      </div>
    </div>
  );
}

export default SearchItem;
