import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

import styles from "../styles/Header.module.css";

export default function Header() {
  const router = useRouter();
  const { user } = useAuth();

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
