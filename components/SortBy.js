import React from "react";

import { Box, Select } from "@chakra-ui/react";

export default function SortBy() {
  return (
    <Box d='flex' justifyContent='center' borderRadius={2} bg='#f6f6f6'>
      <Box
        maxW={{ sm: "80px" }}
        fontWeight='700'
        px={3}
        w='full'
        as='label'
        m='auto'
        htmlFor='sort-by'>
        Sort By
      </Box>
      <Select id='sort-by' _focus={{ borderRadius: 0 }}>
        <option value='best'>Best Selling</option>
        <option value='24'>Available</option>
        <option value='48'>Alphabetically, A-Z </option>
        <option value='48'>Alphabetically, Z-A </option>
        <option value='48'>Price, low to high </option>
        <option value='48'>Price, higt to low </option>
        <option value='48'>Date, new to old </option>
        <option value='48'>Date, old to new </option>
      </Select>
    </Box>
  );
}
