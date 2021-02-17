import React from "react";
import Image from "next/image";
import App from "../components/App";

import { Box } from "@chakra-ui/react";

export default function Error404() {
  return (
    <App>
      <Box mx='auto' w={{ sm: "full", md: "450px" }}>
        <Image
          src='/images/404.png'
          width={450}
          height={450}
          layout='responsive'
        />
      </Box>
    </App>
  );
}
