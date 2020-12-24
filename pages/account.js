import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../utils/urls";

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setLoading(true);
          const token = await getToken();
          const order_res = await fetch(`${API_URL}/orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await order_res.json();
          setOrders(data);
        } catch (error) {
          setOrders([]);
        }
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  return { orders, loading };
};

export default function account() {
  const { logoutUser, user, getToken } = useAuth();

  const { orders, loading } = useOrders(user, getToken);
  if (!user) {
    return (
      <div>
        <p>Please login or register</p>
        <NextLink href='/'>
          <a>Go Back</a>
        </NextLink>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Accout page</title>
        <meta name='description' content='The account page, view your order' />
      </Head>
      <h2>Account page</h2>
      <h3>Your orders</h3>
      {loading && <p>Loading your orders</p>}
      {orders.map((order) => (
        <div key={order.id}>
          {new Date(order.created_at).toLocaleDateString("en-En")}{" "}
          {order.product.name} ${order.total} {order.status}
        </div>
      ))}
      <p>Logged in as: {user.email}</p>
      <a href='#' onClick={logoutUser}>
        Logout
      </a>
    </div>
  );
}
