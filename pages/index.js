import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import fetch from "isomorphic-unfetch";
import styles from "../styles/Home.module.css";
import { fromImageToUrl, API_URL } from "../utils/urls";
import { twoDecimals } from "../utils/format";
import { Box, Text, Link } from "@chakra-ui/react";

export default function Home({ categories = [], products = [] }) {
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
      {products.map((product) => (
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
      ))}
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
