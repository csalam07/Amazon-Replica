import "@material-tailwind/react/tailwind.css";
import "../styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { Provider as AuthProvider } from "next-auth/client";
import { AnimateSharedLayout } from "framer-motion";
import { store } from "../app/store";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        // Font Awesome Link
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
          integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
          crossOrigin="anonymous"
        />
      </Head>
      <AuthProvider session={pageProps.session}>
        <Provider store={store}>
          <AnimateSharedLayout>
            <Component {...pageProps} />
          </AnimateSharedLayout>
        </Provider>
      </AuthProvider>
    </>
  );
};

export default MyApp;
