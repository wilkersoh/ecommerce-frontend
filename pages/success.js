import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { API_URL } from "../utils/urls";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const useOrder = (session_id, token) => {
  const { cartItems, setCartItem } = useCart();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState("");

  const confirmPayment = () => {
    return fetch(`${API_URL}/orders/confirm`, {
      method: "POST",
      body: JSON.stringify({ checkout_session: session_id }),
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  const removeCart = () => {
    return fetch(`${API_URL}/carts/deletes`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await Promise.all([confirmPayment(), removeCart()]);
        const payload = await res[0].json();

        setCartItem([]);
        setOrder(payload);
      } catch (error) {
        setOrder([]);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [session_id]);

  return { order, loading };
};

export default function success() {
  const router = useRouter();
  const { token } = useAuth();
  const { session_id } = router.query;
  const { order, loading } = useOrder(session_id, token);

  if (!token) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>
          {!token ? "Handling payment" : "Thank you for your purchase!"}
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
