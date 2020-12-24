import { useState } from "react";
import Head from "next/head";
import { useAuth } from "../context/AuthContext";

import styles from "../styles/Login.module.css";

export default function login() {
  const [email, setEmail] = useState("");
  const { loginUser } = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(email);
  };
  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name='description' content='Login here to make your purchase' />
      </Head>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type='email'
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type='submit' className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}
