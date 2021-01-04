import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useCart } from "../context/CartContext";
import { API_URL } from "../utils/urls";
import fetcher from "../utils/fetcher";
import { useAuth } from "../context/AuthContext";

export default function cart() {
  const { cartItems } = useCart();
  console.log(cartItems);
  return (
    <div>
      <h1>I am cart</h1>
      {cartItems.map((cart) => (
        <div key={cart.product.name}>
          {cart.product.name} ${cart.product.price} - {cart.quantity}
        </div>
      ))}
    </div>
  );
}
