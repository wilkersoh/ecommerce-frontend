import React from "react";
import NextLink from "next/link";

import Facebook from "../icons/Facebook";
import Instagram from "../icons/Instagram";
import Visa from "../icons/Visa";
import Master from "../icons/Master";
import { Box, Link, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { useShop } from "../context/ShopContext";

const linkLists = [
  { name: "Search", path: "/search" },
  { name: "Legal Notice", path: "/policies/legal-notice" },
  { name: "Privacy Policy", path: "/policies/privacy-policy" },
  { name: "Refund Policy", path: "/policies/refund-policy" },
  { name: "Shipping Policy", path: "/policies/shipping-policy" },
  { name: "Terms of Service", path: "/policies/terms-of-service" },
];

export default function Footer() {
  const { shop } = useShop();

  return (
    <Box
      as='footer'
      d={{ lg: "flex" }}
      mx='auto'
      maxW='1030px'
      width='full'
      flexDir='column'
      borderTop='1px solid rgba(0, 0, 0, 0.2)'
      textAlign='center'
      mt={6}
      py={6}>
      <Box d={{ lg: "flex" }} justifyContent='center'>
        <Links />
        <FollowUs />
      </Box>
      <Payments shop={shop} />
    </Box>
  );
}

const Links = () => (
  <Box mt={3} mr={{ lg: 48 }}>
    <Heading as='h4' fontSize='0.94em' mb={3}>
      Links
    </Heading>
    <List fontSize='0.85em'>
      {linkLists.map(({ name, path }) => (
        <ListItem key={name}>
          <NextLink href={path} passHref>
            <Link lineHeight='1.8' aria-label={name}>
              {name}
            </Link>
          </NextLink>
        </ListItem>
      ))}
    </List>
  </Box>
);

const FollowUs = () => (
  <Box mt={3}>
    <Heading as='h4' fontSize='0.94em' mb={2}>
      Follow Us
    </Heading>
    <Box alignSelf='center'>
      <Box
        as={Facebook}
        _first={{ mr: 4 }}
        d='inline-block'
        w='20px'
        h='20px'
      />
      <Box as={Instagram} d='inline-block' w='20px' h='20px' />
    </Box>
  </Box>
);

const Payments = ({ shop }) => (
  <Box mt={3}>
    <Text mt={6} as='h4' fontSize='0.94em' mb={2}>
      Copyright &copy; {shop?.name}
    </Text>
    <List>
      {[Visa, Master].map((card) => (
        <ListItem d='inline-block' m='7.5px'>
          <Box as={card} w='12' h='12' />
        </ListItem>
      ))}
    </List>
  </Box>
);
