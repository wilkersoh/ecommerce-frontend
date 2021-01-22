import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { API_URL } from "../utils/urls";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const useOrder = (session_id) => {
  const { cartMutate, cartItems } = useCart();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // to avoid server error
    if (Array.isArray(session_id)) return;

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/orders/confirm`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ checkout_session: session_id }),
          headers: {
            "Content-type": "application/json",
          },
        });
        const payload = await res.json();
        setOrder(payload);
      } catch (error) {
        setOrder([]);
      }

      setLoading(false);
    };

    const clearCart = async () => {
      try {
        console.log("inside clearCart");
        cartMutate((data) => {
          console.log("data: ", data);
        });
        await fetch(`${API_URL}/carts/deletes`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        });
      } catch (error) {
        console.log("cannot clear cart, something went wrong");
      }
    };
    fetchOrder();
    clearCart();
  }, [session_id]);

  return { order, loading };
};

export default function success() {
  const router = useRouter();
  const { user } = useAuth();
  const queryKey = "session_id";
  const session_id =
    router.query[queryKey] ||
    router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`));

  const { order, loading } = useOrder(session_id);

  return (
    <div>
      <Head>
        <title>
          {loading
            ? "We are handling your payment"
            : "Thank you for your purchase!"}
        </title>
      </Head>
      <h2>Success!</h2>
      <NextLink href='/cart'>
        <a>Backkkk</a>
      </NextLink>
      {loading && <p>Wating a momnet... we are handling your payment.</p>}
      {order && (
        <p>
          Your order is confirmend, with order number:{" "}
          {order.length && order[0].trackID}
        </p>
      )}
    </div>
  );
}
