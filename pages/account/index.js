import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import NextLink from "next/link";
import useSWR from "swr";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../utils/urls";
import App from "../../components/App";
import {
  Box,
  Stack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Heading,
  Grid,
  Text,
  Link,
} from "@chakra-ui/react";

export default function account() {
  const { user, hasTokenCookie } = useAuth();
  const router = useRouter();

  const { data: orders } = useSWR(`${API_URL}/orders`);

  useEffect(() => {
    if (!hasTokenCookie && !user) return router.replace("/account/login");
  }, [user]);

  if (!orders && !user) {
    return (
      <App>
        <Heading mb={3} as='h2'>
          Account page
        </Heading>
        <Stack>
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />
        </Stack>
      </App>
    );
  }

  return (
    <App>
      <Head>
        <title>Accout page</title>
        <meta name='description' content='The account page, view your order' />
      </Head>
      <Heading as='h2'>Account page</Heading>
      <Box>
        <Text>Account email: {user?.email}</Text>
      </Box>
      <Box mt={4}>
        <Text className='h2' fontWeight='600' fontSize='22px'>
          Your order:{" "}
        </Text>
        <Grid templateColumns={{ sm: "200px 1fr" }}>
          {Array.isArray(orders) &&
            orders.map((order) => (
              <React.Fragment key={order.id}>
                <Box mr={3} mb={3}>
                  <NextLink href={`/products/${order.product.product_slug}`}>
                    <Link>
                      <Image
                        src={order.product.images[0].url}
                        width={200}
                        height={200}
                        layout='responsive'
                      />
                    </Link>
                  </NextLink>
                </Box>
                <Box d='flex' flexDir='column'>
                  <Text className='h2' fontWeight='700' fontSize='18px' mb={3}>
                    {new Date(order.created_at).toLocaleDateString("en-En")}{" "}
                    {order.product.name}
                  </Text>
                  <Text fontWeight='500' mb={3}>
                    ${order.total}
                  </Text>
                  <Text
                    fontWeight='500'
                    mb={3}
                    color={order.status == "paid" ? "green.1" : "red.500"}>
                    status: {order.status}
                  </Text>
                  <Text mb={3}>
                    order id:{" "}
                    <Text as='span' fontWeight='700'>
                      {order.trackID}
                    </Text>
                  </Text>
                </Box>
              </React.Fragment>
            ))}
        </Grid>
      </Box>
    </App>
  );
}
