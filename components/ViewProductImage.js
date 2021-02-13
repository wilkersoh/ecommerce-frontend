import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import Image from "next/image";
import AddCart from "./AddCart";
import { fromImageToUrl } from "../utils/urls";
import { twoDecimals } from "../utils/format";
import { ViewIcon } from "@chakra-ui/icons";
import { Box, Link, Text, GridItem } from "@chakra-ui/react";

export default function ViewProductImage({ product }) {
  const router = useRouter();

  return (
    <GridItem key={product.id} className='category_product-hover'>
      {product.out_of_stock && (
        <Box p={4} bgColor='gray.400'>
          <Text>Sold Out</Text>
        </Box>
      )}
      <Box overflow='hidden' position='relative'>
        <ViewEye />
        <NextLink
          href={`/categories/${router.query.category_slug}/product/${product.product_slug}`}>
          <Link>
            <Box>
              {product.images.map((image, i) => {
                if (i >= 2) return;
                return !i ? (
                  <Box key={image.id}>
                    <Image
                      src={fromImageToUrl(image)}
                      alt={product.name}
                      height={330}
                      width={330}
                      layout='responsive'
                    />
                  </Box>
                ) : (
                  <HoverImage key={image.id} image={image} />
                );
              })}
            </Box>
            <DetailCard product={product} />
          </Link>
        </NextLink>
      </Box>
    </GridItem>
  );
}

const DetailCard = ({ product }) => {
  const { brand, name, price, quantity_in_store, id, categories } = product;
  console.log("product 11:>> ", product);
  return (
    <Box
      textAlign='center'
      className='category_product-hover-button-show'
      bg='white'
      position='relative'
      transition='350ms ease-in-out'
      transform='translateY(0px)'
      zIndex={1}
      py={4}>
      <Box mb={4}>
        <Text className='h4' color={"gray.1"} fontSize='0.8em' fontWeight='300'>
          {brand?.name}
        </Text>
        <Text
          py={1}
          className='h4'
          fontWeight='500'
          fontSize='0.9em'
          color={"gray.0"}>
          {name}
        </Text>
        <Text as='span' className='h4' fontSize='1.15em' fontWeight='600'>
          RM {twoDecimals(price)}
        </Text>
      </Box>
      <Box position='absolute' d='flex' w='full' bottom={"-45px"}>
        <Box mx='auto'>
          <AddCart
            productID={id}
            quantityInStore={quantity_in_store}
            category_slug={categories[0].category_slug}
          />
        </Box>
      </Box>
    </Box>
  );
};

const HoverImage = ({ image }) => (
  <Box
    className='category_product-hover-image-show'
    position='absolute'
    d='none'
    top={0}
    bottom={0}
    left={0}
    right={0}
    opacity={0}
    zIndex={-1}>
    <Image
      src={fromImageToUrl(image)}
      layout='responsive'
      height={330}
      width={330}
    />
  </Box>
);

const ViewEye = () => (
  <Box
    className='category_product-hover-eye-show'
    opacity={0}
    cursor='pointer'
    transition='ease-in-out 350ms'
    position='absolute'
    right={2}
    top={3}
    w={10}
    h={10}
    borderRadius={"100%"}
    bgColor='white'
    d='flex'
    zIndex={2}>
    <ViewIcon m='auto' />
  </Box>
);
