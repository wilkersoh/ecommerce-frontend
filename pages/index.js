import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import fetch from "isomorphic-unfetch";
import { API_URL, fromImageToUrl } from "../utils/urls";
import { Box, Text, Link, Grid } from "@chakra-ui/react";
import App from "../components/App";
import { useShop } from "../context/ShopContext";

export default function Home({ categories = [] }) {
  const { shop } = useShop();

  if (!categories.length) {
    return (
      <Box>
        <Box>Please Update Product's category</Box>
      </Box>
    );
  }

  return (
    <App>
      <Head>
        <title>Home - {shop?.name}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Grid
        templateColumns={{ sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={6}
        justifyItems='center'>
        {categories.map((category) => (
          <NextLink
            key={category.id}
            href={`/categories/${category.category_slug}`}
            passHref>
            <Link w='full'>
              <Box textAlign='center'>
                <Image
                  src={fromImageToUrl(category.image)}
                  alt={category.name}
                  height={330}
                  width={330}
                  layout='responsive'
                />
                <Text fontSize='0.9em' fontWeight='700' mb={"5px"}>
                  {category.name}
                </Text>
              </Box>
            </Link>
          </NextLink>
        ))}
      </Grid>
    </App>
  );
}

export async function getStaticProps() {
  // Fetch products
  const categories_res = await fetch(`${API_URL}/categories`);
  const categories = await categories_res.json();

  return {
    props: {
      categories,
    },
  };
}
