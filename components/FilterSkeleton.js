import React from "react";
import { Skeleton, Stack, Box } from "@chakra-ui/react";

export default function FilterSkeleton() {
  return (
    <Box d={{ sm: "none", md: "block" }}>
      {new Array(3).fill("").map((_, i) => (
        <Stack key={i} spacing='14px'>
          <Skeleton
            startColor='gray.500'
            endColor='orange.500'
            height='16px'
            width='40%'
            my={4}
          />
          <Skeleton startColor='gray.500' endColor='orange.500' height='10px' />
          <Skeleton startColor='gray.500' endColor='orange.500' height='10px' />
          <Skeleton startColor='gray.500' endColor='orange.500' height='10px' />
          <Skeleton startColor='gray.500' endColor='orange.500' height='10px' />
          <Skeleton startColor='gray.500' endColor='orange.500' height='10px' />
          <Skeleton startColor='gray.500' endColor='orange.500' height='10px' />
        </Stack>
      ))}
    </Box>
  );
}
