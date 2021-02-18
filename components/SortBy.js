import React from "react";

import { Box, Select } from "@chakra-ui/react";
import { useFilter } from "../context/FilterContext";

export default function SortBy() {
  const { updateSortBy } = useFilter();

  const handleSortBy = (e) => updateSortBy(e.target.value);

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
      <Select id='sort-by' _focus={{ borderRadius: 0 }} onChange={handleSortBy}>
        {/* <option value='best'>Best Selling</option>
        <option value='24'>Available</option> */}
        <option value='p.name,asc'>Alphabetically, A-Z </option>
        <option value='p.name,desc'>Alphabetically, Z-A </option>
        <option value='p.price,asc'>Price, low to high </option>
        <option value='p.price,desc'>Price, higt to low </option>
        <option value='p.created_at,asc'> Date, old to new</option>
        <option value='p.created_at,desc'>Date, new to old</option>
      </Select>
    </Box>
  );
}
