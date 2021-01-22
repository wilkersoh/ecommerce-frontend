import "../styles/globals.css";
import { SWRConfig } from "swr";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import fetcher from "../utils/fetcher";
import { theme } from "../styles/theme";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={{ dedupingInterval: 5000, fetcher }}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
