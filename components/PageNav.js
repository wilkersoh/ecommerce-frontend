import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

/**
      page step - Home > category_slug > product_slug
      - url > categories/[category_slug]
      - url > categories/[category_slug]/product/[product_slug]
*/

const pageHref = (slug, query) => {
  let href = "";

  switch (slug) {
    case "category_slug":
      href = `/categories/${query["category_slug"]}`;
      break;
    case "product_slug":
      href = `/categories/${query["category_slug"]}/product/${query["product_slug"]}`;
      break;
    default:
      href = "/";
  }

  return href;
};

export default function PageNav() {
  const router = useRouter();
  const { page, ...mainQuery } = router.query;

  return (
    <>
      <Breadcrumb
        textTransform={"capitalize"}
        fontWeight={700}
        spacing='3px'
        fontFamily={"Source Sans Pro, sans-serif"}
        separator={<ChevronRightIcon color='gray.500' />}>
        <BreadcrumbItem>
          <NextLink href='/' passHref>
            <BreadcrumbLink
              _focus={{ outline: "none" }}
              _hover={{ color: "green.1" }}
              fontSize='0.75em'>
              Home
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        {Object.entries(mainQuery).map(([slugKey, path], i, array) => (
          <BreadcrumbItem key={slugKey}>
            <NextLink href={pageHref(slugKey, mainQuery)} passHref>
              <BreadcrumbLink
                _hover={{ color: "green.1" }}
                isCurrentPage={array.length === +i + 1}
                _focus={{ outline: "none" }}
                fontSize='0.75em'>
                {path}
              </BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </>
  );
}
