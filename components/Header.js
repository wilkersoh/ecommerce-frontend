import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

import styles from "../styles/Header.module.css";
import { useCart } from "../context/CartContext";

import { Box, Link, Text, Stack, HStack } from "@chakra-ui/react";

export default function Header() {
  const router = useRouter();
  const { user, logoutUser } = useAuth();
  const { cartItems } = useCart();

  const isHome = router.pathname === "/";
  const goBack = (event) => {
    event.preventDefault();
    router.back();
  };

  if (!user) {
    return (
      <Box className={styles.nav}>
        <Box className={styles.title}>
          <NextLink href='/'>
            <Link>
              <h1>The E-Commerce</h1>
            </Link>
          </NextLink>
        </Box>
        <Box>Cart</Box>
        <NextLink href='/account/login'>
          <Link>Login</Link>
        </NextLink>
        <Text px={4}>OR</Text>
        <NextLink href='/account/register'>
          <Link>Create account</Link>
        </NextLink>
      </Box>
    );
  }

  return (
    <Box className={styles.nav}>
      {!isHome && (
        <Box>
          <Link onClick={goBack}>{"<"} Back</Link>
        </Box>
      )}
      <Box className={styles.title}>
        <NextLink href='/'>
          <Link>
            <h1>The E-Commerce</h1>
          </Link>
        </NextLink>
      </Box>
      <HStack spacing='24px'>
        <NextLink href='/cart'>
          <Link>Cart Store {cartItems?.length} </Link>
        </NextLink>
        <Box>
          <NextLink href='/account'>
            <Link>My Account</Link>
          </NextLink>
        </Box>
        <Box className={styles.auth}>
          <Box onClick={logoutUser}>Logout</Box>
        </Box>
        <NextLink href='/cart'>
          <Link>Cart {user.carts.length}</Link>
        </NextLink>
      </HStack>
    </Box>
  );
}
