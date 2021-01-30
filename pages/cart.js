import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import CheckoutButton from "../components/CheckoutButton";
import { fromImageToUrl } from "../utils/urls";

import {
  Box,
  Button,
  Link,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

export default function cart() {
  const { cartItems, cartMutate, updateCart, removeCartItem } = useCart();
  const [checkoutItems, setCheckoutItem] = useState([]);

  useEffect(() => {
    if (!Array.isArray(cartItems)) return;

    // clone raw data for render
    const sortCart = cartItems.reverse();
    setCheckoutItem(sortCart);
  }, [cartItems]);

  const handleChange = (id, value) => {
    const newCartValues = checkoutItems.map((item) =>
      item.id == id ? { ...item, quantity: Number(value) } : item
    );
    console.log("newCartValues: ", newCartValues);
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
  console.log("checkoutItems:", checkoutItems);
  if (!checkoutItems?.length) {
    return (
      <div>
        <h1>Your Cart</h1>
        <p>Your cart is currently empty.</p>
        <NextLink href='/'>
          <Link>Continue browsing here.</Link>
        </NextLink>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Your Shopping Cart - dayfruit</title>
      </Head>
      <h1>I am cart</h1>
      {(checkoutItems || []).map((cart) => (
        <React.Fragment key={cart.id}>
          <NextLink href={`/categories/product/${cart.product.slug}`}>
            <Link>
              Testng
              <Image
                src={fromImageToUrl(cart.product.images[0])}
                width={500}
                height={500}
              />
            </Link>
          </NextLink>
          <Box>
            <NextLink href={`/products/${cart.product.slug}`}>
              <Link>{cart.product.name}</Link>
            </NextLink>
          </Box>
          <Box>Price: RM {cart.product.price}</Box>
          <Box>
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
          <Box>Total: RM {(cart.quantity * cart.product.price).toFixed(2)}</Box>
          <div onClick={() => onRemoveCart(cart.id)}>Remove</div>
        </React.Fragment>
      ))}
      <NextLink href='/'>
        <Link>
          <Button colorScheme='#59756f' color={"#59756f"} variant='outline'>
            Continue shopping
          </Button>
        </Link>
      </NextLink>
      <Button
        onClick={onUpdateCart}
        colorScheme='#59756f'
        color={"#59756f"}
        variant='outline'>
        Update Cart
      </Button>
      <CheckoutButton checkoutItems={checkoutItems} />
    </div>
  );
}
