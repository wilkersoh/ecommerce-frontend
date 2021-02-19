import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function AddCart({
  productID,
  quantityInStore,
  category_slug,
  quantity = 1,
  ...props
}) {
  const {
    cartMutate,
    cartItems,
    getCurrentCartItem,
    createNewCart,
    updateCart,
  } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { hasTokenCookie } = useAuth();

  const onAddToCart = async (e) => {
    setIsLoading(true);
    if (!hasTokenCookie) {
      // redirect if user didn't login
      // Trick of not trigger the link tag (Button inside link tag)
      setTimeout(() => {
        return router.push("/account/login");
      }, 2000);
      return;
    }

    let hasObject = getCurrentCartItem(productID);
    if (hasObject === undefined) hasObject = {};

    try {
      if (!Object.entries(hasObject).length) {
        const res = await createNewCart(productID, quantity, category_slug);
        const newCartItem = await res.json();

        const _ = await cartMutate(newCartItem);
      } else {
        // Found existing Item
        const cartObject = [
          {
            id: hasObject.id,
            quantity: +hasObject.quantity + parseInt(quantity),
          },
        ];

        cartMutate(
          cartItems.map((cart) =>
            cart.id === cartObject.id
              ? { ...cart, quantity: cart.quantity++ }
              : cart
          ),
          false
        );
        const res = await updateCart(cartObject);
        const payload = await res.json();

        cartMutate(payload);
      }
    } catch (error) {
      console.log("error in onAddToCart: ", error);
    }

    router.push("/cart");
  };

  return (
    <Button
      isLoading={isLoading}
      colorScheme={+quantityInStore ? "teal" : "gray"}
      fontWeight={600}
      textTransform='uppercase'
      isDisabled={!+quantityInStore}
      onClick={onAddToCart}
      {...props}>
      {+quantityInStore ? "Add To Cart" : "Sold Out"}
    </Button>
  );
}
