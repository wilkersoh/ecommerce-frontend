import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { API_URL, fromImageToUrl } from "../../../utils/urls";
import { twoDecimals } from "../../../utils/format";
import AddCart from "../../../components/AddCart";
import { useCart } from "../../../context/CartContext";

import { Button, Box, Text } from "@chakra-ui/react";

const Product = ({ product }) => {
  const { cartItems, getCurrentCartItem } = useCart();
  const [currentProduct, setCurrentProduct] = useState({ quantity: 1 });
  const {
    meta_title,
    brand,
    name,
    images,
    quantity_in_store,
    id,
    price,
    content,
  } = product;

  // useEffect(() => {
  //   const current = getCurrentCartItem(product.id);
  //   console.log("current: ", current);
  //   setCurrentProduct({ ...currentProduct, ...current });
  // }, [cartItems, setCurrentProduct]);

  // const router = useRouter();

  // if (router.isFallback) {
  //   return <div>Loading... sorry for watiing...</div>;
  // }

  return (
    <Box>
      <Head>{meta_title && <title>{meta_title}</title>}</Head>
      {/* <PageNav /> */}
      <Text>{brand.name}</Text>
      <Text as='h3'>{name}</Text>
      {images.map((image) => (
        <Box key={image.id}>
          <Image src={fromImageToUrl(image)} width={500} height={500} />
        </Box>
      ))}
      <Text as='h3'>{name}</Text>
      <Box>
        <Text>Quantity</Text>
        <Box>In Store - {quantity_in_store}</Box>
      </Box>
      <AddCart productID={id} quantityInStore={quantity_in_store} />
      <Text>${twoDecimals(price)}</Text>
      <Text>{content}</Text>
    </Box>
  );
};

export async function getStaticProps({ params: { product_slug } }) {
  const product_res = await fetch(
    `${API_URL}/products/?product_slug=${product_slug}`
  ); // question mark is query slug, to find the slug in the json
  const found = await product_res.json();
  console.log("found>>>", found);
  return {
    props: {
      product: found[0],
    },
    // revalidate: 3,
  };
}

export async function getStaticPaths() {
  // Retrieve all the possbile paths
  const products_res = await fetch(`${API_URL}/products/`);
  const products = await products_res.json();
  // Return them to Nextjs context

  return {
    paths: !products.length
      ? []
      : products.map((product) => ({
          params: { product_slug: product.product_slug },
        })),
    fallback: false, // Tells to nextjs to show a 404 if the param is not found
  };
}

export default Product;
