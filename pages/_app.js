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
                openGraph={{
                  type: "website",
                  locale: "en_IE",
                  url: "https://creative.staging.selfpaths.com/",
                  site_name: "Creative 文具屋",
                  images: [
                    {
                      url:
                        "https://creative.staging.selfpaths.com/images/facebook_1.jpg",
                      width: 1200,
                      height: 630,
                      alt:
                        "Creative 文具 | Find the best stationery deals and happy hours in your area.",
                    },
                  ],
                }}
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
