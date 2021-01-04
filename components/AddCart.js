import React from "react";
import { Button } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";

export default function AddCart({ product, quantity = 1 }) {
  const {
    cartItems,
    setCartItem,
    getCurrentCartItem,
    createNewCart,
    updateCart,
  } = useCart();

  const onAddToCart = async (productID) => {
    const hasObject = getCurrentCartItem(productID);

    try {
      if (!Object.entries(hasObject).length) {
        const res = await createNewCart(productID, quantity);
        const payload = await res.json();

        setCartItem([...payload, ...cartItems]);
      } else {
        const res = await updateCart(hasObject.id, quantity);
        const payload = await res.json();
        const updated = cartItems.map((cart) =>
          cart.id === payload.id
            ? { ...cart, quantity: payload.quantity }
            : cart
        );
        setCartItem([...updated]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button colorScheme='teal' onClick={() => onAddToCart(product.id)}>
        Add To Cart
      </Button>
    </div>
  );
}
