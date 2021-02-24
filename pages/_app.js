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
                //   type: "website",
                //   locale: "en_IE",
                //   url: "https://creative.staging.selfpaths.com/",
                //   description:
                //     "利用网路科技，解决问题，和我说你的问题，或许我能帮到你。",
                //   site_name: "Creative 文具屋",
                //   images: [
                //     {
                //       url:
                //         "https://creative.staging.selfpaths.com/images/banner.jpg",
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
