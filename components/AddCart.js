import React, { useState } from "react";
import { Button, CircularProgressLabel } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/router";

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

  const onAddToCart = async () => {
    let hasObject = getCurrentCartItem(productID);
    if (hasObject === undefined) hasObject = {};

    // redirect if user didn't login
    setIsLoading(true);

    try {
      if (!Object.entries(hasObject).length) {
        const res = await createNewCart(productID, quantity, category_slug);
        const newCartItem = await res.json();
        console.log("newCartItem :>> ", newCartItem);
        // if(!newCartItem.user) {
        //   //
        // }

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
      // onClick={() => onAddToCart(productID)}
      onClick={onAddToCart}
      {...props}>
      {+quantityInStore ? "Add To Cart" : "Sold Out"}
    </Button>
  );
}
