import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { API_URL, fromImageToUrl } from "../../../utils/urls";
import { twoDecimals } from "../../../utils/format";
import AddCart from "../../../components/AddCart";
import { useCart } from "../../../context/CartContext";

import { Button, Box } from "@chakra-ui/react";

const Product = ({ product }) => {
  const { cartItems, getCurrentCartItem } = useCart();
  const [currentProduct, setCurrentProduct] = useState({ quantity: 1 });
  console.log(product);

  useEffect(() => {
    const current = getCurrentCartItem(product.id);
    setCurrentProduct({ ...currentProduct, ...current });
  }, [cartItems, setCurrentProduct]);

  // const router = useRouter();

  // if (router.isFallback) {
  //   return <div>Loading... sorry for watiing...</div>;
  // }

  return (
    <div>
      <Head>{product.meta_title && <title>{product.meta_title}</title>}</Head>
      <p>{product.brand}</p>
      <h3>{product.name}</h3>
      {product.images.map((image) => (
        <Box key={image.id}>
          <Image src={fromImageToUrl(image)} width={500} height={500} />
        </Box>
      ))}
      <h3>{product.name}</h3>
      <div>
        <p>Quantity</p>
        <div>In Store - {product.store}</div>
      </div>
      <AddCart product={product} />
      <p>${twoDecimals(product.price)}</p>
      <p>{product.content}</p>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const product_res = await fetch(`${API_URL}/products/?slug=${slug}`); // question mark is query slug, to find the slug in the json
  const found = await product_res.json();

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
          params: { slug: String(product.slug) },
        })),
    fallback: false, // Tells to nextjs to show a 404 if the param is not found
  };
}

export default Product;
