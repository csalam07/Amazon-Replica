import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../components/Header";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";

function success() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Order successful | Amazon</title>
      </Head>

      <div className="bg-gray-100 h-screen">
        <Header />

        <main>
          <Modal size="sm" active={true} toggler={() => router.push("/")}>
            <ModalHeader toggler={() => router.push("/")}>
              <p className="flex items-center space-x-2">
                <Icon name="check_circle" size="3xl" color="green" />
                <span>Orders Confirmed</span>
              </p>
            </ModalHeader>
            <ModalBody>
              <p className="text-base leading-relaxed text-gray-600 font-normal">
                Thank you for shopping with us. We'll send a confirmation once
                your item has been shipped, if you would like to check the
                status of your order(s) please press the "View Order" button
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="blue"
                buttonType="link"
                onClick={() => router.push("/orders")}
                ripple="light"
              >
                Buy More
              </Button>

              <Button
                color="yellow"
                onClick={() => router.push("/orders")}
                ripple="light"
              >
                View Order
              </Button>
            </ModalFooter>
          </Modal>
        </main>
      </div>
    </>
  );
}

export default success;
