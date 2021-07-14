import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";

function failed() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Payment Failed | Amazon</title>
      </Head>
      <div className="bg-gray-100 h-screen">
        <Header />

        <Modal size="sm" active={true} toggler={() => router.push("/")}>
          <ModalHeader toggler={() => router.push("/")}>
            <p className="flex items-center space-x-2">
              <Icon name="cancel" size="3xl" color="red" />
              <span>Orders Failed</span>
            </p>
          </ModalHeader>
          <ModalBody>
            <p className="text-base leading-relaxed text-gray-600 font-normal">
              Try again? or Please review your payment details. You will get
              full refund in within 24 hours incase if money has been debited
              from your account. Fore more details please contact our customer
              care.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="yellow"
              onClick={() => router.push("/")}
              ripple="light"
            >
              Return Home
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default failed;
