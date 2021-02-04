import { createContext, useContext } from "react";
import { API_URL } from "../utils/urls";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";

const ShopContext = createContext();

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const ShopProvider = (props) => {
  const shop = useShopProvider();

  return (
    <ShopContext.Provider value={shop}>{props.children}</ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);

const useShopProvider = () => {
  const { data } = useSWR(`${API_URL}/shop-details`, fetcher);

  return {
    shop: data,
  };
};
