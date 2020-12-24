import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PK, API_URL } from "../utils/urls";

import styles from "../styles/BuyButton.module.css";

const stripePromise = loadStripe(STRIPE_PK);

export default function BuyButton({ product, quantity }) {
  const { user, getToken } = useAuth();
  const router = useRouter();

  const redirectToLogin = () => {
    router.push("/login");
  };

  const handleBuy = async () => {
    const stripe = await stripePromise;
    const token = await getToken();

    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      body: JSON.stringify({ product, quantity }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // session pass from stripe backend
    const session = await res.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <>
      {!user && (
        <button className={styles.buy} onClick={redirectToLogin}>
          Login to Buy
        </button>
      )}
      {user && (
        <button className={styles.buy} onClick={handleBuy}>
          BUY
        </button>
      )}
    </>
  );
}
