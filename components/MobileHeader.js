import React, { useState } from "react";
import NextLink from "next/link";

import Cart from "../icons/Cart";
import { HamburgerIcon, Search2Icon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  List,
  ListItem,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";

const menuLists = [
  { name: "home", path: "/" },
  { name: "list", path: "/categories" },
  { name: "log in", path: "/account/login" },
  { name: "create account", path: "/account/register" },
];

export default function MobileHeader({ cartItems }) {
  const [open, setOpen] = useState(false);

  const onMenuClick = () => {
    setOpen(!open);
  };

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
          _hover={{ bg: "transparent", border: "1px solid #ffffff29" }}
          _focus={{ outline: "none" }}
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
              <Text pt={1}>Cart ({cartItems?.length})</Text>
            </Flex>
          </Link>
        </NextLink>
      </Flex>
      <Box
        height={open ? "245px" : 0}
        overflow='hidden'
        bgColor='green.0'
        transition={"ease-in-out 350ms"}
        w='full'>
        <List fontFamily='heading'>
          {menuLists.map((list) => (
            <ListItem
              key={list.name}
              fontSize='0.8em'
              fontWeight='700'
              textTransform='uppercase'
              borderTop='1px solid rgba(0, 0, 0, 0.2)'>
              <NextLink href={list.path} passHref>
                <Link
                  d='block'
                  p={3}
                  _active={{ textDecor: "none" }}
                  _focus={{ outline: "none" }}>
                  {list.name}
                </Link>
              </NextLink>
            </ListItem>
          ))}
          <ListItem p={3} borderTop='1px solid rgba(0, 0, 0, 0.2)'>
            <InputGroup bgColor='#fff' borderRadius='6px'>
              <InputLeftElement
                pointerEvents='none'
                color='#000'
                children={<Search2Icon color='gray.300' />}
              />
              <Input type='text' placeholder='Search' />
            </InputGroup>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
