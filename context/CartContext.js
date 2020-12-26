import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
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

const useCartProvider = async () => {
  const [cartItems, setCartItem] = useState([]);

  const { user, getToken } = useAuth();
  const [token, setToken] = useState("");

  useEffect(() => {
    async function fetchCartOrder() {
      const tokenID = await getToken();
      setToken(tokenID);
    }
    fetchCartOrder();
  }, [user]);

  /**
   * This is dumb data
   */
  useEffect(() => {
    const carts = [
      { name: "BirdEgg", price: "29.90", quantity: 1 },
      { name: "The NextJs With Strapi Courses", price: "49.90", quantity: 1 },
    ];

    setCartItem(carts);
  }, []);

  const { data, error } = useSWR(
    user ? [`${API_URL}/orders`, token] : null,
    fetcher
  );

  console.log(data);
  // if(data) setCartItem(data)

  return {
    setCartItem,
    cartItems,
  };
};
