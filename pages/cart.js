import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import Image from "next/image";
import App from "../components/App";
import { useCart } from "../context/CartContext";
import CheckoutButton from "../components/CheckoutButton";
import { twoDecimals } from "../utils/format";
import { fromImageToUrl } from "../utils/urls";
import { useAuth } from "../context/AuthContext";

import {
  Box,
  Button,
  Link,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Heading,
  Divider,
  Text,
  Grid,
} from "@chakra-ui/react";

export default function cart() {
  const { cartItems, cartMutate, updateCart, removeCartItem } = useCart();
  const { hasTokenCookie } = useAuth();
  const [checkoutItems, setCheckoutItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // const {data} = useSWR("", noAuthFetcher);

  useEffect(() => {
    if (!Array.isArray(cartItems)) return;

    // clone raw data for render
    const sortCart = cartItems.reverse();
    setCheckoutItem(sortCart);
  }, [cartItems]);

  useEffect(() => {
    // total all cart price
    const total = cartItems?.reduce((acc, item) => {
      return acc + +item.product.price * parseInt(item.quantity);
    }, 0);

    setTotalPrice(total);
  }, [cartItems, cartMutate, removeCartItem]);

  const handleChange = (id, value) => {
    const newCartValues = checkoutItems.map((item) =>
      item.id == id ? { ...item, quantity: Number(value) } : item
    );
    setCheckoutItem(newCartValues);
  };

  const onUpdateCart = async () => {
    try {
      const res = await updateCart(checkoutItems);
      const payload = await res.json();

      cartMutate(payload);

      /**
        Do Popup notice
      */
    } catch (error) {
      console.log("error:::::", error);
    }
  };

  const onRemoveCart = async (targetID) => {
    try {
      cartMutate(
        cartItems.filter((cart) => cart.id != targetID),
        false
      );

      await removeCartItem(targetID);
    } catch (error) {
      console.log(error);
    }
  };

  if (!checkoutItems?.length) {
    return (
      <App>
        <Head>
          <title>Your Shopping Cart</title>
        </Head>
        <Heading as='h1'>Your Cart</Heading>
        <Divider my={4} />
        {hasTokenCookie ? (
          <Text>You cart is empty.</Text>
        ) : (
          <Text>
            Your cart is currently empty. Please{" "}
            <NextLink href='/account/login' passHref>
              <Link
                cursor='pointer'
                d='inline-block'
                fontWeight='500'
                textDecor='underline'>
                login
              </Link>
            </NextLink>{" "}
            to view your cart.
          </Text>
        )}
        <NextLink href='/' passHref>
          <Link cursor='pointer'>
            Continue browsing{" "}
            <Box d='inline-block' textDecor='underline'>
              here
            </Box>
            .
          </Link>
        </NextLink>
      </App>
    );
  }

  return (
    <App>
      <Head>
        <title>Your Shopping Cart</title>
      </Head>
      <Heading as='h1'>Your Cart</Heading>
      <HeaderOverMd />
      <Divider my={4} />
      {(checkoutItems || []).map((cart) => (
        <Box
          key={cart.id}
          d='flex'
          my={4}
          flexDir={{ sm: "column", md: "row" }}>
          <Box as='section' w='full' d='flex'>
            <Box w={{ sm: "130px", md: "240px" }}>
              <NextLink
                href={
                  cart.category_slug
                    ? `/categories/${cart.category_slug}/product/${cart.product.product_slug}`
                    : `/products/${cart.product.product_slug}`
                }
                passHref>
                <Link>
                  <Image
                    src={fromImageToUrl(cart.product.images[0])}
                    width={250}
                    height={250}
                  />
                </Link>
              </NextLink>
            </Box>
            <Box ml={4} w='full'>
              <Box mb={2}>
                <NextLink
                  href={
                    cart.category_slug
                      ? `/categories/${cart.category_slug}/product/${cart.product.product_slug}`
                      : `/products/${cart.product.product_slug}`
                  }
                  passHref>
                  <Link className='h2' fontWeight='700' color='green.1'>
                    {cart.product.name}
                  </Link>
                </NextLink>
              </Box>
              {/* <Box mb={2}>Product selection</Box> */}
              <Box
                d='inline-block'
                color='green.1'
                hover={{ color: "green.0" }}
                cursor='pointer'
                onClick={() => onRemoveCart(cart.id)}>
                Remove
              </Box>
            </Box>
          </Box>
          <Grid
            as='section'
            gridTemplateColumns={{
              sm: "repeat(3, 1fr)",
              md: "repeat(3, 120px)",
            }}>
            <Box>
              <Text mb={3} d={{ md: "none" }}>
                Price
              </Text>
              <Text className='h2' fontWeight='700'>
                RM {cart.product.price}
              </Text>
            </Box>
            <Box>
              <Text mb={3} d={{ md: "none" }}>
                Quantity
              </Text>
              <NumberInput
                size={"sm"}
                step={1}
                value={cart.quantity}
                min={1}
                max={cart.product.quantity_in_store}
                id={cart.id}
                onChange={(value) => handleChange(cart.id, value)}
                clampValueOnBlur={true}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Box textAlign='right'>
              <Text mb={3} d={{ md: "none" }}>
                Total
              </Text>
              <Text className='h2' fontWeight='700'>
                RM {(cart.quantity * cart.product.price).toFixed(2)}
              </Text>
            </Box>
          </Grid>
          <Divider my={6} d={{ md: "none" }} />
        </Box>
      ))}
      <Box textAlign='right'>
        <Box mb={4}>
          <Text className='h2' fontWeight='800'>
            Total: RM {twoDecimals(totalPrice)}
          </Text>
        </Box>
        <NextLink href='/'>
          <Link mr={2}>
            <Button
              borderRadius={0}
              colorScheme='green.1'
              color={"green.1"}
              variant='outline'>
              Continue shopping
            </Button>
          </Link>
        </NextLink>
        <Box mb={{ sm: 2, md: 0 }} d='inline-block'>
          <Button
            borderRadius={0}
            onClick={onUpdateCart}
            colorScheme='green.1'
            color={"green.1"}
            variant='outline'>
            Update Cart
          </Button>
        </Box>
        <CheckoutButton checkoutItems={checkoutItems} ml={2} />
      </Box>
    </App>
  );
}

const HeaderOverMd = () => (
  <Grid
    d={{ sm: "none", md: "grid" }}
    gridTemplateColumns={{
      md: "1fr repeat(3, 120px)",
    }}>
    <Box></Box>
    <Text>Price</Text>
    <Text>Quantity</Text>
    <Text>Total</Text>
  </Grid>
);
