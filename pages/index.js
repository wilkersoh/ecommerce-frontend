import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import NextLink from "next/link";
import fetch from "isomorphic-unfetch";
import styles from "../styles/Home.module.css";
import { fromImageToUrl, API_URL } from "../utils/urls";
import { twoDecimals } from "../utils/format";
import { Box, Text, Link, Button } from "@chakra-ui/react";

export default function Home({ categories = [], page }) {
  const router = useRouter();

  console.log("page:", page);
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
    </Box>
  );
}

// export async function getServerSideProps({ query: { page = 1 } }) {
//   const res = await fetch(`${API_URL}/categories`);
//   const categories = await res.json();
//   // console.log(categories);
//   console.log(page);
//   return {
//     props: {
//       categories,
//       page: +page, // plus is turn it to number type
//     },
//   };
// }

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
