import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useShop } from "../context/ShopContext";
import Cart from "../icons/Cart";
import MobileHeader from "./MobileHeader";

import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  Image,
  List,
  ListItem,
} from "@chakra-ui/react";
import GlobalSearch from "./GlobalSearch";

export default function Header({ ...props }) {
  const router = useRouter();
  const { user, logoutUser } = useAuth();
  const { cartItems } = useCart();
  const { shop } = useShop();

  return (
    <Flex as='header' direction='column' {...props}>
      <Flex
        alignItems='center'
        direction='column'
        py={2}
        bgColor='green.0'
        minH='45px'>
        <MobileHeader cartItems={cartItems} />
        <Box
          d={{ sm: "none", lg: "flex" }}
          maxW='1030px'
          px={3}
          w='full'
          fontFamily={"heading"}
          alignItems='center'
          fontWeight='900'
          justifyContent='space-between'>
          <NextLink href='/' passHref>
            <Link>
              <Image src={shop?.shop_icon.url} height='35px' width='35px' />
            </Link>
          </NextLink>
          <Flex fontSize='0.8em' alignItems='center'>
            <Flex alignItems='center'>
              {!user ? (
                <>
                  <NextLink href='/account/login' passHref>
                    <Link>Log in</Link>
                  </NextLink>
                  <Text px={3}>Or</Text>
                  <NextLink href='/account/register' passHref>
                    <Link>Create Account</Link>
                  </NextLink>
                </>
              ) : (
                <>
                  <NextLink href='/account/' passHref>
                    <Link>My Account</Link>
                  </NextLink>
                  <Box cursor='pointer' ml={3} onClick={logoutUser}>
                    Log out
                  </Box>
                </>
              )}
            </Flex>
            <NextLink href='/cart' passHref>
              <Link mx={6}>
                <Flex align='center'>
                  <Box transform='scaleX(-1)'>
                    <Box as={Cart} ml={{ sm: 2 }} w='20px' h='20px' />
                  </Box>
                  <Text>Cart {cartItems?.length}</Text>
                </Flex>
              </Link>
            </NextLink>
            <GlobalSearch maxW={"160px"} />
          </Flex>
        </Box>
      </Flex>
      <Box
        fontFamily='Source Sans Pro, sans-serif'
        textAlign='center'
        pb={{ sm: 10 }}
        pt={{ sm: 8 }}>
        <Heading as='h1'>
          <NextLink href='/' passHref>
            <Link>{shop?.name}</Link>
          </NextLink>
        </Heading>
        <List d='flex' mt={8} justifyContent='center'>
          <ListItem mr={6}>
            <NextLink href='/' passHref>
              <Link fontWeight='600'>Home</Link>
            </NextLink>
          </ListItem>
          <ListItem>
            <NextLink href='/products/all' passHref>
              <Link fontWeight='600'>Menu</Link>
            </NextLink>
          </ListItem>
        </List>
      </Box>
    </Flex>
  );
}
