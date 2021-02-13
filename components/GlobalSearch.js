import React from "react";

import { Box, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function GlobalSearch({ ...rest }) {
  return (
    <InputGroup bgColor='#fff' borderRadius='6px' {...rest}>
      <InputLeftElement
        pointerEvents='none'
        color='#000'
        children={<Search2Icon color='gray.300' />}
      />
      <Input list='ice-cream-flavors' type='text' placeholder='Search' />
      <Box as='datalist' id='ice-cream-flavors'>
        <option value='Chocolate' />
        <option value='Coconut' />
        <option value='Mint' />
        <option value='Strawberry' />
        <option value='Vanilla' />
      </Box>
    </InputGroup>
  );
}
