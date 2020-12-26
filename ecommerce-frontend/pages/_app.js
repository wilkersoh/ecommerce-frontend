import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";

import Header from "../components/Header";
import Footer from "../components/Footer";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <content>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </content>
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
