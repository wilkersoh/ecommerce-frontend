import React, { useState } from "react";
import NextLink from "next/link";
import { useAuth } from "../context/AuthContext";
import GlobalSearch from "./GlobalSearch";
import Cart from "../icons/Cart";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";

const menuLists = [
  { name: "home", path: "/" },
  { name: "list", path: "/products/all" },
  { name: "log in", path: "/account/login" },
  { name: "create account", path: "/account/register" },
];

export default function MobileHeader({ cartItems }) {
  const { user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);

  const onMenuClick = () => setOpen(!open);

  return (
    <Box
      d={{ sm: "flex", lg: "none" }}
      flexDirection='column'
      alignItems='center'
      w='full'>
      <Flex
        maxW='1030px'
        px={3}
        w='full'
        fontFamily={"body"}
        fontWeight='900'
        alignItems='center'
        justifyContent='space-between'>
        <Button
          px={0}
          onClick={onMenuClick}
          aria-label='Mobile Navigation'
          leftIcon={open ? <CloseIcon /> : <HamburgerIcon />}
          bgColor='transparent'
          transition={"ease-in-out 350ms"}
          border='1px solid green.0'
          _active={{ bg: "teal" }}
          _hover={{ bg: "transparent", border: "1px solid green.0" }}
          _focus={{ outline: "none", borderColor: "1px solid green.0" }}
          variant='ghost'>
          <Text mt={1}>Menu</Text>
        </Button>
        <NextLink href='/cart' passHref>
          <Link>
            <Flex align='center' fontFamily={"heading"}>
              <Box
                transform='scaleX(-1)'
                as={Cart}
                mr={{ sm: 1 }}
                w='25px'
                h='25px'
              />
              <Text pt={1}>
                Cart {cartItems?.length ? `(${cartItems.length})` : null}
              </Text>
            </Flex>
          </Link>
        </NextLink>
      </Flex>
      <Box
        height={open ? "245px" : 0}
        overflow='hidden'
        bgColor='green.0'
        transition={"850ms cubic-bezier(0, 0.55, 0.45, 1)"}
        w='full'>
        <List fontFamily='heading'>
          {menuLists.map((list, i) => (
            <ListItem
              key={list.name}
              fontSize='0.8em'
              fontWeight='700'
              textTransform='uppercase'
              borderTop='1px solid rgba(0, 0, 0, 0.2)'>
              {i == 2 && user ? (
                <NextLink href='#' passHref>
                  <Link
                    d='block'
                    p={3}
                    _active={{ textDecor: "none" }}
                    _focus={{ outline: "none" }}>
                    <Box onClick={logoutUser}>log out</Box>
                  </Link>
                </NextLink>
              ) : (
                <NextLink href={list.path} passHref>
                  <Link
                    d='block'
                    p={3}
                    _active={{ textDecor: "none" }}
                    _focus={{ outline: "none" }}>
                    {list.name}
                  </Link>
                </NextLink>
              )}
            </ListItem>
          ))}
          <ListItem p={3} borderTop='1px solid rgba(0, 0, 0, 0.2)'>
            <GlobalSearch />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
