import React, { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Link } from "@chakra-ui/react";

export default function BuyButton({ productID, children, ...porps }) {
  const router = useRouter();

  const onCheckItem = (id, quantity = 1) => {
    console.log("added buy button");
  };

  return (
    <div onClick={() => onCheckItem(productID)}>
      <div {...porps}>{children}</div>
    </div>
  );
}
