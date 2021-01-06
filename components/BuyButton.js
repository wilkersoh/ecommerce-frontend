import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";

export default function BuyButton({
  productID,
  quantity = 1,
  children,
  ...porps
}) {
  const router = useRouter();
  const { cartItems, setCartItem } = useCart();

  const onCheckItem = () => {
    // isChecked is true
    const updated = cartItems.map((cart) =>
      cart.product.id === productID ? { ...cart, isChecked: true } : cart
    );
    setCartItem([...updated]);

    router.push("/cart");
  };

  return (
    <div onClick={onCheckItem}>
      <Button {...porps}>{children}</Button>
    </div>
  );
}
