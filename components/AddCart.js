import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/router";

export default function AddCart({ productID, quantityInStore, quantity = 1 }) {
  const {
    cartMutate,
    cartItems,
    getCurrentCartItem,
    createNewCart,
    updateCart,
  } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onAddToCart = async (id) => {
    const hasObject = getCurrentCartItem(id);
    setIsLoading(true);

    try {
      if (!Object.entries(hasObject).length) {
        const res = await createNewCart(id, quantity);
        const newCartItem = await res.json();
        const _ = await cartMutate(newCartItem);
      } else {
        // Found existing Item
        const cartObject = [
          { id: hasObject.id, quantity: hasObject.quantity + quantity },
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
    <div>
      <Button
        isLoading={isLoading}
        colorScheme={+quantityInStore ? "teal" : "gray"}
        fontWeight={600}
        textTransform='uppercase'
        isDisabled={!+quantityInStore}
        onClick={() => onAddToCart(productID)}>
        {+quantityInStore ? "Add To Cart" : "Sold Out"}
      </Button>
    </div>
  );
}
