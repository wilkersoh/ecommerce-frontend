import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { Link } from "@chakra-ui/react";

import styles from "../styles/Header.module.css";
import { useCart } from "../context/CartContext";

export default function Header() {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems } = useCart();

  const isHome = router.pathname === "/";
  const goBack = (event) => {
    event.preventDefault();
    router.back();
  };

  if (!Array.isArray(cartItems)) {
    return (
      <div className={styles.nav}>
        {!isHome && (
          <div>
            <a onClick={goBack}>{"<"} Back</a>
          </div>
        )}

        <div className={styles.title}>
          <NextLink href='/'>
            <a>
              <h1>The E-Commerce</h1>
            </a>
          </NextLink>
        </div>
        <div>Cart Store </div>
        <NextLink href='/login'>
          <a>Login</a>
        </NextLink>
      </div>
    );
  }

  return (
    <div className={styles.nav}>
      {!isHome && (
        <div>
          <a onClick={goBack}>{"<"} Back</a>
        </div>
      )}
      <div className={styles.title}>
        <NextLink href='/'>
          <a>
            <h1>The E-Commerce</h1>
          </a>
        </NextLink>
      </div>
      <NextLink href='/cart'>
        <Link>Cart Store {cartItems.length} </Link>
      </NextLink>
      <div className={styles.auth}>
        <NextLink href='/account'>
          <a>{user.email}</a>
        </NextLink>
      </div>
    </div>
  );
}
