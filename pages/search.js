import React, { useState } from "react";
import App from "../components/App";
import useSWR from "swr";
import { API_URL } from "../utils/urls";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";

export default function search() {
  const [searchValue, setSearchValue] = useState("");

  // const {data} = useSWR(`${API_URL}/search?q=value`);

  return (
    <App>
      <Box h='200px'>
        <Heading fontSize='1.64706em'>Search for products on our site</Heading>
        <InputGroup w={{ sm: "full", md: "500px" }} size='md' mt={8}>
          <Input placeholder='Search' _focus={{ borderColor: "green.1" }} />
          <InputRightElement
            cursor='pointer'
            h='full'
            w='50px'
            bgColor='green.1'
            children={<Search2Icon color='white' />}
          />
        </InputGroup>
      </Box>
    </App>
  );
}
