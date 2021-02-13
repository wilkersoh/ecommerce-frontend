import { createContext, useContext } from "react";
import { API_URL } from "../utils/urls";
import useSWR from "swr";
import noAuthFetcher from "../utils/noAuthFetcher";

const ShopContext = createContext();

export const ShopProvider = (props) => {
  const shop = useShopProvider();

  return (
    <ShopContext.Provider value={shop}>{props.children}</ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);

const useShopProvider = () => {
  const { data } = useSWR(`${API_URL}/shop-details`, noAuthFetcher);

  return {
    shop: data,
  };
};
