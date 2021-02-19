import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

export default function PageNavWithoutNested() {
  const router = useRouter();
  const { ...mainQuery } = router.query;
  // console.log("mainQuery :>> ", mainQuery);
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
        {!Object.keys(mainQuery).length ? (
          <BreadcrumbItem>
            <BreadcrumbLink
              _hover={{ color: "green.1" }}
              isCurrentPage={true}
              _focus={{ outline: "none" }}
              fontSize='0.75em'>
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          Object.entries(mainQuery).map(([slugKey, path], i) => (
            <BreadcrumbItem key={slugKey}>
              <NextLink href={"/#"} passHref>
                <BreadcrumbLink
                  _hover={{ color: "green.1" }}
                  _focus={{ outline: "none" }}
                  isCurrentPage={true}
                  fontSize='0.75em'>
                  {path}
                </BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
          ))
        )}
      </Breadcrumb>
    </>
  );
}
