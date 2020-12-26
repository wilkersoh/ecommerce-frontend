import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function cart({ carts }) {
  const { cartItems, setCartItem } = useCart();

  return (
    <div>
      <h1>I am cart</h1>
      {cartItems.map((cart) => (
        <div key={cart.name}>
          {cart.name} ${cart.price}
        </div>
      ))}
    </div>
  );
}
