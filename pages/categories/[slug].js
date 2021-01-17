import React from "react";
import NextLink from "next/link";
import { API_URL } from "../../utils/urls";
import fetch from "isomorphic-unfetch";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Text,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

export default function Category({ products, slug }) {
  console.log("product: ", products);

  return (
    <Box>
      <Breadcrumb
        textTransform={"capitalize"}
        fontWeight={700}
        spacing='1px'
        separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem>
          <NextLink href='/' passHref>
            <BreadcrumbLink _hover={{ color: "#59756f" }} fontSize='0.65em'>
              Home
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <Text as='h1'>{slug}</Text>
        <BreadcrumbItem isCurrentPage>
          <Text fontSize='0.75em'>{slug}</Text>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box>I am stamps</Box>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const res = await fetch(`${API_URL}/products?category.slug=${slug}`);
  const products = await res.json();

  return {
    props: {
      products,
      slug: slug,
    },
  };
}
