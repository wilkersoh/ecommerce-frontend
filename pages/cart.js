import React from "react";
import NextLink from "next/link";
import { useCart } from "../context/CartContext";

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
import CheckoutButton from "../components/CheckoutButton";

export default function cart() {
  const { cartItems, setCartItem, updateCart, removeCartItem } = useCart();
  console.log(cartItems);
  const handleChange = (id, value) => {
    let cart = cartItems.map((item) => {
      return item.id == id ? { ...item, quantity: Number(value) } : item;
    });

    setCartItem(cart);
  };

  const onUpdateCart = async () => {
    try {
      const res = await updateCart(cartItems);
      const payload = await res.json();
      /**
        Do Popup notice
       */
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveCart = async (targetID) => {
    try {
      await removeCartItem(targetID);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>I am cart</h1>
      {cartItems.map((cart) => (
        <React.Fragment key={cart.id}>
          <Box>{cart.product.name}</Box>
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
