import React from "react";
import { useRouter } from "next/router";
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
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

export default function Category({
  products,
  totalProductLength,
  slug,
  page,
  pageSize,
}) {
  const router = useRouter();

  const lastPage = Math.ceil(totalProductLength / pageSize); // num is pageSize

  return (
    <Box className='blue'>
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
      <Flex>
        <Button
          colorScheme='teal'
          isDisabled={page === 1}
          onClick={() =>
            router.push(`/categories/${router.query.slug}?page=${page - 1}`)
          }>
          Previous
        </Button>
        <Button
          colorScheme='teal'
          isDisabled={page >= lastPage}
          onClick={() =>
            router.push(`/categories/${router.query.slug}?page=${page + 1}`)
          }>
          Next
        </Button>
      </Flex>
      <Flex className='green'>
        {products?.map((product) => (
          <Box key={product.id}>
            <NextLink href={`/categories/product/${product.slug}`}>
              <Link>
                <Box>
                  {product.images.map((image, i) => {
                    if (i >= 2) return;
                    return (
                      <Box key={image.id}>
                        <Image
                          src={fromImageToUrl(image)}
                          width={200}
                          height={200}
                        />
                      </Box>
                    );
                  })}
                  <Text>{product.brand}</Text>
                </Box>
              </Link>
            </NextLink>
          </Box>
        ))}
        <Spacer />
      </Flex>
    </Box>
  );
}

export async function getServerSideProps(context) {
  // variable page is customise created.
  const { slug, page = 1, pageSize = 2 } = context.query;

  /**
    _start= which next paganition item you would to start, if input number 2, then next page will show number 3

    * 1 = pageSize
    _limit = pageSize too

   */
  const start = +page === 1 ? 0 : (+page - 1) * pageSize;

  // get total product item number
  const res_products_length = fetch(
    `${API_URL}/products/count?category.slug=${slug}`
  );
  const res_product = fetch(
    `${API_URL}/products?category.slug=${slug}&_start=${start}&_limit=${pageSize}`
  );

  const [promise_product, promise_num] = await Promise.all([
    res_product,
    res_products_length,
  ]);

  const products = await promise_product.json();
  const totalProductLength = await promise_num.json();

  return {
    props: {
      products,
      totalProductLength,
      slug: slug,
      page: +page, // plus is turn string type into number type
      pageSize,
    },
  };
}
