import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import { Box } from "@chakra-ui/react";

export default function App({ children, ...rest }) {
  return (
    <Box d='flex' flexDirection='column' minH='100vh'>
      <Header />
      <Box mx='auto' maxW='1030px' w='full'>
        <Box as='main' {...rest}>
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
