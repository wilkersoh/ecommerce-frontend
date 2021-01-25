import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import { API_URL, fromImageToUrl } from "../../utils/urls";
import fetch from "isomorphic-unfetch";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Text,
  Link,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

export default function Category({ products, slug }) {
  console.log("product ss: ", products);

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
      <Box>
        {products?.map((product) => (
          <NextLink
            key={product.id}
            href={`/categories/product/${product.slug}`}>
            <Link>
              <Box>
                {product.images.map((image) => (
                  <Box key={image.id}>
                    <Image
                      src={fromImageToUrl(image)}
                      width={200}
                      height={200}
                    />
                  </Box>
                ))}
                <Text>{product.brand}</Text>
              </Box>
            </Link>
          </NextLink>
        ))}
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const res = await fetch(`${API_URL}/products?category.slug=${slug}`);
  const productsWithPrivate = await res.json();
  const products = productsWithPrivate.map((product) => {
    const { carts, orders, ...rest } = product;
    return rest;
  });

  return {
    props: {
      products,
      slug: slug,
    },
  };
}
