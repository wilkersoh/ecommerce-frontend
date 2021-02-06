import React from "react";

import { Box, Select } from "@chakra-ui/react";

export default function PageSize() {
  return (
    <Box
      d='flex'
      width='130px'
      justifyContent='center'
      borderRadius={2}
      bg='#f6f6f6'>
      <Box
        fontWeight='700'
        maxW='70px'
        px={3}
        as='label'
        m='auto'
        htmlFor='set-by-limit'>
        Show
      </Box>
      <Select id='set-by-limit' borderRadius={0} _focus={{ borderRadius: 0 }}>
        <option value='12'>12</option>
        <option value='24'>24</option>
        <option value='48'>48</option>
      </Select>
    </Box>
  );
}
