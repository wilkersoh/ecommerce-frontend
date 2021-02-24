import "../styles/globals.css";
import { SWRConfig } from "swr";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { ShopProvider } from "../context/ShopContext";
import fetcher from "../utils/fetcher";
import overrides from "../theme";
import { DefaultSeo } from "next-seo";
import SEO from "../seo.config";

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
              <DefaultSeo
                {...SEO}
                // openGraph={{
                //   ...SEO.openGraph,
                //   images: [
                //     {
                //       url: `https://boilerplateuploadprovider.s3.ap-southeast-1.amazonaws.com/Face_Book_Card_bc0eae1a20.png`,
                //       width: 1200,
                //       height: 630,
                //       alt:
                //         "利用网路科技，解决问题，和我说你的问题，或许我能帮到你。",
                //     },
                //   ],
                // }}
              />
              <Component {...pageProps} />
            </CartProvider>
          </AuthProvider>
        </ShopProvider>
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
