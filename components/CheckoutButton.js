import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@chakra-ui/react";
import { STRIPE_PK, API_URL } from "../utils/urls";

import styles from "../styles/BuyButton.module.css";
import { useCart } from "../context/CartContext";

const stripePromise = loadStripe(STRIPE_PK);

/**
 *
 * @param {ArrayObject} param
 * Showhow checkoutItems pass from cart into Checkbutton became Object Array {[]}
 */
export default function CheckoutButton({ checkoutItems }) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { updateCart } = useCart();

  const redirectToLogin = () => {
    router.push("/login");
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    setIsLoading(true);
    // Update to Cart
    await updateCart(checkoutItems);

    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(checkoutItems), // [{},{}, {}]
      headers: {
        "Content-type": "application/json",
      },
    });

    // session pass from stripe backend
    const session = await res.json();
    console.log("session frontend:", session);
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <>
      {!user && (
        <Button className={styles.buy} onClick={redirectToLogin}>
          Login to Buy
        </Button>
      )}
      {user && (
        <Button
          isLoading={isLoading}
          onClick={handleCheckout}
          bgColor='#59756f'
          color='#fff'
          variant='solid'>
          Check Out
        </Button>
      )}
    </>
  );
}
