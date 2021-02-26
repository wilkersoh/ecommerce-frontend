import React, { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import App from "../components/App";
import SkeletonLoading from "../components/SkeletonLoading";

import { Heading, Text, Link } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

export default function activate() {
  const { hasTokenCookie } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (hasTokenCookie) return router.push("/");
  }, [hasTokenCookie]);

  if (router.query.redirect)
    return (
      <App>
        <Heading>We already sent confirmation to your email.</Heading>
      </App>
    );

  if (hasTokenCookie)
    return (
      <App>
        <SkeletonLoading />
      </App>
    );

  return (
    <App>
      <Heading>Account activated</Heading>
      <Text d='inline-block'>Your email is activated click</Text>{" "}
      <NextLink href='/account/login' passHref>
        <Link textDecor='underline'>here</Link>
      </NextLink>{" "}
      <Text d='inline-block'>to login.</Text>
    </App>
  );
}
