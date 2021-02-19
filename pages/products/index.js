import React, { useEffect } from "react";
import { useRouter } from "next/router";
import App from "../../components/App";

export default function index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/products/all");
  }, []);

  return <App></App>;
}
