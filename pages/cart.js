import React from "react";
import { useCart } from "../context/CartContext";

import { Button, Checkbox } from "@chakra-ui/react";

export default function cart() {
  const { cartItems, setCartItem, updateCart, removeCartItem } = useCart();

  const onCheckboxChange = (cartID) => {
    setCartItem((prev) => {
      const updated = prev.map((cart) => {
        return cart.id === cartID
          ? { ...cart, isChecked: !cart.isChecked }
          : cart;
      });
      return updated;
    });
  };

  const handleChange = () => {
    //  const quantity = Number(e.target.value);
    //  const isMax = checkStoreQuantity(product.store, quantity);
    //  setCurrentProduct({
    //    ...currentProduct,
    //    quantity: isMax ? product.store : quantity,
    //  });
  };

  const addToInput = (valueToAdd, targetID) => {
    setCartItem((prev) => {
      const cart = cartItems.map((item, i) =>
        item.id === targetID
          ? { ...item, quantity: prev[i].quantity + valueToAdd }
          : item
      );

      return cart;
    });
  };

  const onUpdateCart = async () => {
    try {
      const res = await updateCart(cartItems);
      const payload = await res.json();
      /**
        Do Popup notice
       */
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveCart = async (targetID) => {
    try {
      setCartItem(() => {
        const cart = cartItems.filter((item) => item.id !== targetID);
        return cart;
      });
      await removeCartItem(targetID);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>I am cart</h1>
      {cartItems.map((cart) => (
        <React.Fragment key={cart.id}>
          <div>
            {cart.product.name} ${cart.product.price}
          </div>
          <div>
            <Button
              type='button'
              px={4}
              colorScheme='teal'
              onClick={() => addToInput(-1, cart.id)}>
              -
            </Button>
            <input
              type='text'
              name={"quantity"}
              value={cart.quantity}
              onChange={handleChange}></input>
            <Button
              type='button'
              px={4}
              colorScheme='teal'
              onClick={() => addToInput(+1, cart.id)}>
              +
            </Button>
          </div>
          <div onClick={() => onRemoveCart(cart.id)}>Remove</div>
          <div>
            <Checkbox
              onChange={() => onCheckboxChange(cart.id)}
              colorScheme='green'
              isChecked={cart.isChecked}></Checkbox>
          </div>
        </React.Fragment>
      ))}
      <Button colorScheme='#59756f' color={"#59756f"} variant='outline'>
        Continue shopping
      </Button>
      <Button
        onClick={onUpdateCart}
        colorScheme='#59756f'
        color={"#59756f"}
        variant='outline'>
        Update Cart
      </Button>
      <Button bgColor='#59756f' color='#fff' variant='solid'>
        Check Out
      </Button>
    </div>
  );
}
