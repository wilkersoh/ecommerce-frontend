import React from "react";

import { Box, Select } from "@chakra-ui/react";
import { useFilter } from "../context/FilterContext";

export default function PageSize() {
  const { setPageSize } = useFilter();

  const handlePageSize = (e) => setPageSize(e.target.value);

  return (
    <Box
      d='flex'
      width='130px'
      justifyContent='center'
      borderRadius={2}
      bg='#f6f6f6'>
      <Box
        fontWeight='700'
        maxW='65px'
        px={3}
        as='label'
        m='auto'
        htmlFor='set-by-limit'>
        Show
      </Box>
      <Select
        id='set-by-limit'
        borderRadius={0}
        _focus={{ borderRadius: 0 }}
        onChange={handlePageSize}>
        {/* <option value='12'>12</option>
        <option value='24'>24</option>
        <option value='48'>48</option> */}
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
      </Select>
    </Box>
  );
}
