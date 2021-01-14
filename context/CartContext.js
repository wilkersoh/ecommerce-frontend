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
  const { user, token, getToken } = useAuth();

  const { data: cartItems, mutate: cartMutate } = useSWR(
    user ? [`${API_URL}/carts`, token] : null,
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
      body: JSON.stringify([{ productID, quantity }]),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  /**
   *
   * @param {ArrayObject: [ {id, rest} ] } data
   */
  const updateCart = async (data) => {
    const token = await getToken();
    return await fetch(`${API_URL}/carts/${data[0].id}`, {
      method: "PUT",
      body: JSON.stringify([...data]),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const removeCartItem = async (id) => {
    const token = await getToken();
    return await fetch(`${API_URL}/carts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
