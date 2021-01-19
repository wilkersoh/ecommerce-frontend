import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import fetch from "isomorphic-unfetch";
import styles from "../styles/Home.module.css";
import { fromImageToUrl, API_URL } from "../utils/urls";
import { twoDecimals } from "../utils/format";
import { Box, Text, Link, Button } from "@chakra-ui/react";

export default function Home({ categories = [], products = [] }) {
  const authLogin = async () => {
    const loginInfo = {
      identifier: "admin@mail.io",
      password: "password",
    };
    const res = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      // credentials: "same-origin",
      credentials: "include",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });
    console.log(res);
    // const payload = await res.json();
    // console.log(payload);
  };

  const authLogout = async () => {
    const res = await fetch(`${API_URL}/logout`, {
      method: "POST",
    });
  };

  // auth ssr cannot save it in storage we need nookies npm
  /**
    import {setCookie} from "nookies";


    _app.js
    import {parseCookies} from 'nookies';
    In side getStaticProps
    const jwt = parseCookies(ctx).jwt


   */
  const authRegister = async () => {
    const regsterInfo = {
      username: "yee01",
      email: "yee@mail.io",
      password: "password",
    };
    const res = await fetch(`${API_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regsterInfo),
    });
    const payload = await res.json();
    console.log(payload);
  };

  if (!categories.length) {
    return (
      <Box>
        <Box>Please Update Product's category</Box>
      </Box>
    );
  }
  // console.log(categories);
  // console.log(products);
  return (
    <Box>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Box d='flex'>
        <Button onClick={authRegister}>Click me to Regiser </Button>
        <Button onClick={authLogin}>Click me to Login </Button>
        <Button onClick={authLogout}>Click me to Logout </Button>
        {categories.map((category) => (
          <NextLink key={category.id} href={`/categories/${category.slug}`}>
            <Link>
              <Box d='flex' flexDir='column' textAlign='center'>
                <Box
                  height={{ base: 110, sm: 157, md: 330, lg: 218 }}
                  width={{ base: 110, sm: 157, md: 330, lg: 218 }}
                  maxW={"330px"}
                  position='relative'
                  className='blue'>
                  <Image
                    src={category.image.url}
                    alt={`${category.name} image`}
                    layout='fill'
                  />
                </Box>
                <Text fontSize='0.9em' fontWeight='700' mb={"5px"}>
                  {category.name}
                </Text>
              </Box>
            </Link>
          </NextLink>
        ))}
      </Box>
      {/* {products.map((product) => (
        <div key={product.name} className={styles.product}>
          <NextLink href={`/products/${product.slug}`}>
            <a>
              <div className={styles.product__Row}>
                {product.id}
                <div className={styles.product__ColImg}>
                  {product.images.map((image) => (
                    <Image
                      key={image.id}
                      src={fromImageToUrl(image)}
                      width={500}
                      height={500}
                    />
                  ))}
                </div>
                <div className={styles.product__Col}>
                  {product.name} ${twoDecimals(product.price)}
                </div>
              </div>
            </a>
          </NextLink>
        </div>
      ))} */}
    </Box>
  );
}

export async function getStaticProps() {
  // Fetch products
  const product_res = await fetch(`${API_URL}/products`);
  const products = await product_res.json();
  const categories_res = await fetch(`${API_URL}/categories`);
  const categories = await categories_res.json();

  return {
    props: {
      products,
      categories,
    },
  };
}
