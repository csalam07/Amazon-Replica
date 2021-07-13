import H5 from "@material-tailwind/react/Heading5";
import LeadText from "@material-tailwind/react/LeadText";
import Icon from "@material-tailwind/react/Icon";

export default function Footer() {
  return (
    <div className="bg-amazon_blue">
      <footer className="relative bg-amazon_blue pt-8 pb-6">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left pt-6">
            <div className="w-full lg:w-6/12 px-4">
              <H5 color="yellow">Amazon Replica</H5>
              <div className="-mt-4">
                <LeadText color="white">
                  Make money with us. Sell your products on Amazon
                </LeadText>
              </div>
              <div className="flex gap-2 mt-6 md:justify-start md:mb-0 mb-8 justify-center">
                <a
                  href="m"
                  className="grid place-items-center bg-white text-blue-600 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                  rel="noopener noreferrer"
                >
                  <Icon size="md" name="facebook" />
                </a>
                <a
                  href=""
                  className="grid place-items-center bg-white text-blue-400 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                  rel="noopener noreferrer"
                >
                  <Icon size="md" name="facebook" />
                </a>
                <a
                  href=""
                  className="grid place-items-center bg-white text-indigo-500 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                  rel="noopener noreferrer"
                >
                  <Icon size="md" name="instagram" />
                </a>
                <a
                  href=""
                  className="grid place-items-center bg-white text-pink-400 shadow-md font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none"
                  rel="noopener noreferrer"
                >
                  <Icon size="md" name="facebook" />
                </a>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top">
                <div className="w-full lg:w-4/12 px-4 ml-auto md:mb-0 mb-8">
                  <span className="block uppercase text-yellow-100 text-sm font-serif font-medium mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        href=""
                        rel="noreferrer"
                        className="text-white hover:text-gray-400 block pb-2 text-sm"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-white hover:text-gray-400 block pb-2 text-sm"
                        href=""
                      >
                        Careers
                      </a>
                    </li>
                    <li>
                      <a
                        href=""
                        rel="noreferrer"
                        className="text-white hover:text-gray-400 block pb-2 text-sm"
                      >
                        Press Releases
                      </a>
                    </li>
                    <li>
                      <a
                        href=" "
                        rel="noreferrer"
                        className="text-white hover:text-gray-400 block pb-2 text-sm"
                      >
                        GIft a Smile
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-yellow-100 text-sm font-serif font-medium mb-2">
                    Other Resources
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        href=""
                        rel="noreferrer"
                        className="text-white hover:text-gray-400 block pb-2 text-sm"
                      >
                        Sell on Amazon
                      </a>
                    </li>
                    <li>
                      <a
                        href=""
                        rel="noreferrer"
                        className="text-white hover:text-gray-400 block pb-2 text-sm"
                      >
                        Become an Affiliate
                      </a>
                    </li>
                    <li>
                      <a
                        href=""
                        rel="noreferrer"
                        className="text-white hover:text-gray-400 block pb-2 text-sm"
                      >
                        Advertise Your Products
                      </a>
                    </li>
                    <li>
                      <a
                        href=""
                        rel="noreferrer"
                        className="text-white hover:text-gray-400 block pb-2 text-sm"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-300 font-medium py-1">
                No Copyright © {new Date().getFullYear()} Amazon Replica by{" "}
                <a
                  href=""
                  className="text-white hover:text-gray-400 transition-all"
                >
                  CSAlam07
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
