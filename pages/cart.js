import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import CheckoutButton from "../components/CheckoutButton";
import { fromImageToUrl } from "../utils/urls";
import { mutate } from "swr";

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

// const create = useCallback(
//   async (newObject, shouldRevalidate = false) => {
//     const response = await fetch(url, {
//       body: newObject,
//       method: "POST",
//     });
//     const result = response;
//     if (data && mutate) {
//       let newData = data;
//       if (isArray(data)) {
//         newData = data.concat(result);
//       }
//       await mutate([...new Set(newData)], shouldRevalidate);
//     }
//     return result;
//   },
//   [url, data, mutate]
// );

// function fetcher(url, username, password) {
//   return fetch(url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ username, password }),
//   }).then((res) => res.json());
// }

export default function cart() {
  const { cartMutate, cartItems, updateCart, removeCartItem } = useCart();
  const [cartValues, setCartValue] = useState([]);

  useEffect(() => {
    if (!Array.isArray(cartItems)) return;
    // clone raw data for render
    console.log("clone: ", cartItems);
    const sortCart = cartItems.reverse();
    setCartValue(sortCart);
  }, [cartItems]);

  const handleChange = (id, value) => {
    const newCartValues = cartValues.map((item) =>
      item.id == id ? { ...item, quantity: Number(value) } : item
    );

    setCartValue(newCartValues);
  };

  const onUpdateCart = async () => {
    try {
      const res = await updateCart(cartValues);
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
  console.log("cartValues:", cartValues);
  if (!cartValues?.length) {
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
      <h1>I am cart</h1>
      {(cartValues || []).map((cart) => (
        <React.Fragment key={cart.id}>
          <NextLink href={`/products/${cart.product.slug}`}>
            <Link>
              <Image
                src={fromImageToUrl(cart.product.image)}
                width={300}
                height={300}
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
              max={cart.product.store}
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
      <CheckoutButton />
    </div>
  );
}
