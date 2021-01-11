import React from "react";
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
 */
export default function CheckoutButton() {
  const { user, getToken } = useAuth();
  const { cartItems } = useCart();
  const router = useRouter();

  const redirectToLogin = () => {
    router.push("/login");
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const token = await getToken();

    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      body: JSON.stringify([...cartItems]),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
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
