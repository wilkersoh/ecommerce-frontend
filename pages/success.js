import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { API_URL } from "../utils/urls";
import { useCart } from "../context/CartContext";
import SkeletonLoading from "../components/SkeletonLoading";
import App from "../components/App";
import { twoDecimals } from "../utils/format";

import { CopyIcon } from "@chakra-ui/icons";
import { Box, Text, Heading, Link, useClipboard } from "@chakra-ui/react";

const queryKey = "session_id";

const useOrder = (session_id) => {
  const { cartMutate, cartItems } = useCart();
  const [orders, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // to avoid server error
    if (Array.isArray(session_id)) return;

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/orders/confirm`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ checkout_session: session_id }),
          headers: {
            "Content-type": "application/json",
          },
        });
        const payload = await res.json();

        setOrder(payload);
      } catch (error) {
        setOrder([]);
      }

      setLoading(false);
    };

    const clearCart = async () => {
      try {
        await fetch(`${API_URL}/carts/deletes`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        });

        // clear all cartItems
        cartMutate([]);
      } catch (error) {
        console.log("cannot clear cart, something went wrong");
      }
    };
    fetchOrder();
    clearCart();
  }, [session_id]);

  return { orders, loading };
};

export default function success() {
  const router = useRouter();
  const { cartMutate, cartItems } = useCart();
  const [trackNumber, setTrackNumber] = useState({
    number: null,
    totalPrice: null,
  });
  const { hasCopied, onCopy } = useClipboard(trackNumber.number);

  const session_id =
    router.query[queryKey] ||
    router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`));

  const { orders, loading } = useOrder(session_id);

  useEffect(() => {
    if (!orders.length) return;
    const totalPrice = orders.reduce((acc, order) => {
      const { quantity, product } = order;
      const sum = product.price * quantity;
      return acc + sum;
    }, 0);

    setTrackNumber({ number: orders[0].trackID, totalPrice });
  }, [orders]);

  if (loading || !orders.length)
    return (
      <App>
        <Head>
          <title>We are handling your payment</title>
        </Head>
        <Box mt={4}>
          <SkeletonLoading />
        </Box>
      </App>
    );

  return (
    <App>
      <Head>
        <title>Thank you for your purchase!</title>
      </Head>
      <Heading as='h1' mb={6}>
        Thank you. Your ordered:
      </Heading>

      <Box mb={3} d='flex' flexDir={{ sm: "column", lg: "row" }}>
        <Box mr={{ lg: 8 }}>
          <Text>
            Your order is confirmed with order number:{" "}
            <Box
              as='span'
              cursor='pointer'
              position='relative'
              onClick={onCopy}
              fontWeight='600'>
              <Text
                as='span'
                color={hasCopied ? "green.1" : "black"}
                d='inline-block'>
                {orders[0].trackID}
              </Text>
              <CopyIcon
                w={3}
                h={3}
                cursor='pointer'
                position='absolute'
                bottom={"-3px"}
                right={"-13px"}
              />
            </Box>
          </Text>
          <Heading fontSize='15px' my={2}>
            Total: RM {twoDecimals(trackNumber.totalPrice)}
          </Heading>
        </Box>
        <AddressComponent orders={orders} />
      </Box>

      {orders.map((order) => (
        <Box key={order.id} mb={4} d='flex'>
          <Box w='20%' mr={6}>
            <NextLink href={`/products/${order.product.product_slug}`} passHref>
              <Link>
                <Image
                  src={order.product.images[0].url}
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
                href={`/products/${order.product.product_slug}`}
                passHref>
                <Link _hover={{ textDecor: "underline" }}>
                  {order.product.name}
                </Link>
              </NextLink>
            </Heading>
            <Box fontSize='17px'>
              <Text as='h3' mt={3} fontWeight='400'>
                RM {twoDecimals(order.product.price)} / each
              </Text>
              <Text mt={3} as='h3'>
                Quantity: {order.quantity}
              </Text>
              <Text mt={3}>
                Total:{" "}
                <Text as='span' fontWeight='600' color='green.1'>
                  RM {twoDecimals(order.product.price * order.quantity)}
                </Text>
              </Text>
            </Box>
          </Box>
        </Box>
      ))}
    </App>
  );
}

const AddressComponent = ({ orders }) => {
  const [address, userInfo] = Object.entries(JSON.parse(orders[0].ship_to));
  const { city, country, line1, line2, postal_code, state } = address[1];
  const [_, name] = userInfo;

  return (
    <Box mt={{ sm: 2, lg: 0 }}>
      <Heading as='h2' fontWeight='500' fontSize='16px'>
        {name}
      </Heading>
      <Text>
        {line1} {line2}
      </Text>
      <Text> {postal_code}</Text>
      <Text>{city}</Text>
      <Text>{state}</Text>
    </Box>
  );
};
