import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { API_URL } from "../utils/urls";
import App from "../components/App";
import { useCart } from "../context/CartContext";
import SkeletonLoading from "../components/SkeletonLoading";
import { twoDecimals } from "../utils/format";

import { Box, Text, Heading, Link } from "@chakra-ui/react";

const queryKey = "cancel_id";

const useOrderCancelation = (cancel_id) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // to avoid server error
    if (Array.isArray(cancel_id)) return;

    const cancelOrder = async () => {
      try {
        const res = await fetch(`${API_URL}/orders/cancel`, {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({ cancel_id }),
          headers: {
            "Content-type": "application/json",
          },
        });
        const payload = await res.json();
      } catch (error) {
        // handling error
      }

      setLoading(false);
    };

    cancelOrder();
  }, [cancel_id]);

  return { loading };
};

export default function cancel() {
  const router = useRouter();
  const { cartItems } = useCart();
  const cancel_id =
    router.query[queryKey] ||
    router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`));

  const { loading } = useOrderCancelation(cancel_id);

  if (loading || !cartItems)
    return (
      <App>
        <Head>
          <title>Cancelling your order</title>
        </Head>

        <Head>We are cancelling your payment</Head>
        <Text>Wating a moment... we are handling your payment.</Text>
        <SkeletonLoading />
      </App>
    );

  return (
    <App>
      <Head>
        <title>Successful cancelation</title>
      </Head>

      <Heading as='h1' mb={6}>
        Your just cancelling:
      </Heading>

      {cartItems.map((cart) => (
        <Box key={cart.id} d='flex' mb={4}>
          <Box w='20%' mr={6}>
            <NextLink
              href={
                cart.category_slug
                  ? `/categories/${cart.category_slug}/product/${cart.product.product_slug}`
                  : `/products/${cart.product.product_slug}`
              }
              passHref>
              <Link>
                <Image
                  src={cart.product.images[0].url}
                  width={200}
                  height={200}
                  layout='responsive'
                />
              </Link>
            </NextLink>
          </Box>
          <Box w='80%'>
            <Heading as='h2' fontSize='1.29em' color='green.1'>
              <NextLink
                href={
                  cart.category_slug
                    ? `/categories/${cart.category_slug}/product/${cart.product.product_slug}`
                    : `/products/${cart.product.product_slug}`
                }
                passHref>
                <Link _hover={{ textDecor: "underline" }}>
                  {cart.product.name}
                </Link>
              </NextLink>
            </Heading>
            <Box fontSize='17px'>
              <Text as='h3' mt={3} fontWeight='400'>
                RM {twoDecimals(cart.product.price)} / each
              </Text>
              <Text mt={3} as='h3'>
                Quantity - {cart.quantity}
              </Text>
              <Text mt={3}>
                Total:{" "}
                <Text as='span' fontWeight='600' color='green.1'>
                  RM {twoDecimals(cart.product.price * cart.quantity)}
                </Text>
              </Text>
            </Box>
          </Box>
        </Box>
      ))}
    </App>
  );
}
