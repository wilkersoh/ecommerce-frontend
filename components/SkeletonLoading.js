import React from "react";

import { Skeleton, Stack } from "@chakra-ui/react";

export default function SkeletonLoading() {
  return (
    <Stack spacing='14px' mt={4}>
      <Skeleton height='20px' startColor='gray.500' endColor='orange.500' />
      <Skeleton height='20px' startColor='gray.500' endColor='orange.500' />
      <Skeleton height='20px' startColor='gray.500' endColor='orange.500' />
      <Skeleton height='20px' startColor='gray.500' endColor='orange.500' />
      <Skeleton height='20px' startColor='gray.500' endColor='orange.500' />
    </Stack>
  );
}
