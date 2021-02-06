import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useShop } from "../context/ShopContext";
import Cart from "../icons/Cart";
import MobileHeader from "./MobileHeader";

import { Search2Icon } from "@chakra-ui/icons";
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

export default function Header({ ...props }) {
  const router = useRouter();
  const { user, logoutUser } = useAuth();
  const { cartItems } = useCart();
  const { shop } = useShop();

  const isHome = router.pathname === "/";
  const goBack = (event) => {
    event.preventDefault();
    router.back();
  };

  if (!user) {
    return (
      <Flex as='header' direction='column' {...props}>
        <Box>
          <NextLink href='/'>
            <Link>
              <h1>The E-Commerce</h1>
            </Link>
          </NextLink>
        </Box>
        <Box>Cart</Box>
        <NextLink href='/account/login'>
          <Link>Login</Link>
        </NextLink>
        <Text px={4}>OR</Text>
        <NextLink href='/account/register'>
          <Link>Create account</Link>
        </NextLink>
      </Flex>
    );
  }

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
          <Flex>
            <Flex alignItems='center' mr={4}>
              <NextLink href='/account/login' passHref>
                <Link _hover={{ textDecor: "none" }}>Log in</Link>
              </NextLink>
              <Text px={3}>Or</Text>
              <NextLink href='/account/register' passHref>
                <Link>Create Account</Link>
              </NextLink>
            </Flex>
            <NextLink href='/cart' passHref>
              <Link>
                <Flex align='center'>
                  <Box transform='scaleX(-1)'>
                    <Box as={Cart} ml={{ sm: 2 }} w='20px' h='20px' />
                  </Box>
                  <Text>Cart {cartItems?.length}</Text>
                </Flex>
              </Link>
            </NextLink>
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
            <NextLink href='/categories' passHref>
              <Link fontWeight='600'>Menu</Link>
            </NextLink>
          </ListItem>
        </List>
      </Box>
    </Flex>
  );
}
