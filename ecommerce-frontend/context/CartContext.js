import { createContext, useContext, useState, useEffect } from "react";
import useSWR from "swr";
import { API_URL } from "../utils/urls";
import fetcher from "../utils/fetcher";
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
  const [cartItems, setCartItem] = useState([]);

  const { user, token } = useAuth();

  const { data } = useSWR(user ? [`${API_URL}/carts`, token] : null, fetcher, {
    revalidateOnFocus: false,
  });

  // console.log(data); re-render 7 time in index page
  useEffect(() => {
    if (Array.isArray(data)) setCartItem(data);
  }, [data]);

  const getCurrentCartItem = (productID) => {
    return cartItems.find((cart) => cart.product.id === productID) || {};
  };

  const createNewCart = async (productID, quantity) => {
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
    return await fetch(`${API_URL}/carts/${id}`, {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return {
    setCartItem,
    cartItems,
    createNewCart,
    updateCart,
    removeCartItem,
    getCurrentCartItem,
  };
};
