import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

import styles from "../styles/Header.module.css";
import { useCart } from "../context/CartContext";

import { Box, Link } from "@chakra-ui/react";

export default function Header() {
  const router = useRouter();
  const { user } = useAuth();
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
        <Box>Cart Store </Box>
        <NextLink href='/login'>
          <Link>Login</Link>
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
      <NextLink href='/cart'>
        <Link>Cart Store {cartItems?.length} </Link>
      </NextLink>
      <Box className={styles.auth}>
        <NextLink href='/account'>
          <Link>{user.email}</Link>
        </NextLink>
      </Box>
    </Box>
  );
}
