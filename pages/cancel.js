import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { API_URL } from "../utils/urls";
import { useCart } from "../context/CartContext";

import { Box, Text } from "@chakra-ui/react";

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

  if (loading)
    return (
      <>
        <Head>We are cancelling your payment</Head>
        <p>Wating a momnet... we are handling your payment.</p>
      </>
    );

  return (
    <Box>
      <Head>
        <title>Successful cancelation</title>
      </Head>
      <h2>Cancel!</h2>
      <NextLink href='/cart'>
        <a>Backkkk</a>
      </NextLink>

      <Text>Your just cancelling:</Text>
      {cartItems.map((cart) => (
        <Box>{cart.product.name}</Box>
      ))}
    </Box>
  );
}
