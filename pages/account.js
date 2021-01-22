import React, { useState, useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../utils/urls";

import {
  Box,
  Stack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import useSWR from "swr";

// const useOrders = (user) => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (user) {
//         try {
//           setLoading(true);
//           const order_res = await fetch(`${API_URL}/orders`, {
//             credentials: "include",
//           });
//           const data = await order_res.json();
//           setOrders(data);
//         } catch (error) {
//           setOrders([]);
//         }
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [user]);

//   return { orders, loading };
// };

export default function account() {
  const { logoutUser, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  // const { orders, loading } = useOrders(user);

  const { data: orders } = useSWR(`${API_URL}/orders`);

  useEffect(() => {
    if (!orders) return setIsLoading(true);

    setIsLoading(false);
  }, [orders]);

  if (!user) {
    return (
      <div>
        <p>Please login or register</p>
        <NextLink href='/account/login'>
          <a>Login</a>
        </NextLink>
        <NextLink href='/'>
          <a>Go Back</a>
        </NextLink>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Stack>
        <Skeleton height='20px' />
        <Skeleton height='20px' />
        <Skeleton height='20px' />
      </Stack>
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
      {Array.isArray(orders) &&
        orders.map((order) => (
          <div key={order.id}>
            {new Date(order.created_at).toLocaleDateString("en-En")}{" "}
            {order.product.name} ${order.total} {order.status}
          </div>
        ))}
      <p>Logged in as: {user.username}</p>
      <a href='#' onClick={logoutUser}>
        Logout
      </a>
    </div>
  );
}
