import { createContext, useContext, useState, useEffect } from "react";
import useSWR from "swr";
import { API_URL } from "../utils/urls";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = (props) => {
  const cart = useCartProvider();

  return (
    <CartContext.Provider value={cart}>{props.children}</CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

const useCartProvider = () => {
  const { user } = useAuth();

  const { data: cartItems, mutate: cartMutate } = useSWR(
    user ? [`${API_URL}/carts`] : null,
    { revalidateOnFocus: false }
  );

  const getCurrentCartItem = (productID) => {
    if (!Array.isArray(cartItems)) return;
    return cartItems.find((cart) => cart.product.id === productID) || {};
  };

  const createNewCart = async (productID, quantity) => {
    console.log("hit create: quantity > ", quantity);
    return await fetch(`${API_URL}/carts`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify([{ productID, quantity }]),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  /**
   *
   * @param {ArrayObject: [ {id, rest} ] } data
   */
  const updateCart = async (data) => {
    return await fetch(`${API_URL}/carts/${data[0].id}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify([...data]),
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  const removeCartItem = async (id) => {
    return await fetch(`${API_URL}/carts/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return {
    cartMutate,
    cartItems,
    createNewCart,
    updateCart,
    removeCartItem,
    getCurrentCartItem,
  };
};
