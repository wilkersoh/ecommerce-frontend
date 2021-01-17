import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import { Box } from "@chakra-ui/react";

export default function App() {
  return (
    <>
      <Box>
        <Header />
        <Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
