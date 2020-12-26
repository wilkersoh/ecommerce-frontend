import React from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";

export default function AddCart({ product, children, ...porps }) {
  const { cartItems, setCartItem } = useCart();
  const onAddToCart = (name, quantity = 1) => {
    // Check is there already in cart
    cartItems?.forEach((cart) => {
      if (cart.name === product.name) {
        cart.quantity++;
      }
    });

    setCartItem([...cartItems]);
  };

  return (
    <div onClick={onAddToCart}>
      <div {...porps}>{children}</div>
    </div>
  );
}
