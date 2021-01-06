import React, { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useAuth } from "../context/AuthContext";
import { Link } from "@chakra-ui/react";
import styles from "../styles/Header.module.css";
import { useCart } from "../context/CartContext";
import fetcher from "../utils/fetcher";
import { API_URL } from "../utils/urls";

export default function Header() {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems } = useCart();

  const isHome = router.pathname === "/";
  const goBack = (event) => {
    event.preventDefault();
    router.back();
  };

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
      {user ? (
        <NextLink href='/cart'>
          <Link>Cart Store - {cartItems.length}</Link>
        </NextLink>
      ) : (
        <div>Cart Store - </div>
      )}
      <div className={styles.auth}>
        {user ? (
          <NextLink href='/account'>
            <a>{user.email}</a>
          </NextLink>
        ) : (
          <NextLink href='/login'>
            <a>Login</a>
          </NextLink>
        )}
      </div>
    </div>
  );
}
