import React from "react";
import {
  Box,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Heading,
  Icon,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import FilterList from "./FilterList";

export default function Filter({ filterLists }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => onClose();

  return (
    <Box>
      <Box d={{ sm: "block", md: "none" }}>
        <Button
          onClick={onOpen}
          w='full'
          bg='black'
          _hover={{ bgColor: "rgba(0,0,0,0.85)" }}
          _active={{ bgColor: "black" }}>
          <Box color='white' d='flex' w='full' alignItems='center'>
            <HamburgerIcon color='white' />
            <Heading ml={2} fontSize='1em'>
              Filter By
            </Heading>
          </Box>
        </Button>
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent px={4}>
            <Box
              onClick={handleClose}
              d='flex'
              justifyContent='flex-end'
              alignItems='center'
              minH='50px'>
              <Box mr={3}>
                <Icon as={CloseIcon} w={7} h={7} />
              </Box>
            </Box>

            <FilterList />
          </DrawerContent>
        </Drawer>
      </Box>

      <FilterList />
    </Box>
  );
}
