import React, { useRef } from "react";
import { useRouter } from "next/router";
import { Box, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function GlobalSearch({ ...rest }) {
  const router = useRouter();
  const inputRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?q=${inputRef.current.value}`);
  };

  return (
    <Box as='form' onSubmit={onSubmit}>
      <InputGroup bgColor='#fff' borderRadius='6px' {...rest}>
        <InputLeftElement
          pointerEvents='none'
          color='#000'
          children={<Search2Icon color='gray.300' />}
        />
        <Input ref={inputRef} type='text' placeholder='Search' />
      </InputGroup>
    </Box>
  );
}
