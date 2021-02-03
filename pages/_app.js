import "../styles/globals.css";
import { SWRConfig } from "swr";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { ShopProvider } from "../context/ShopContext";
import fetcher from "../utils/fetcher";
import overrides from "../theme";

import { Fonts } from "../theme/customs/Fonts";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={overrides}>
      <Fonts />
      <SWRConfig value={{ dedupingInterval: 5000, fetcher }}>
        <ShopProvider>
          <AuthProvider>
            <CartProvider>
              <Component {...pageProps} />
            </CartProvider>
          </AuthProvider>
        </ShopProvider>
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
