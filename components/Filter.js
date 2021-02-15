import React from "react";
import FilterList from "./FilterList";
import { API_URL } from "../utils/urls";
import { useFilter } from "../context/FilterContext";
import FilterSkeleton from "./FilterSkeleton";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
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

export default function Filter() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { filterLists } = useFilter();
  const handleClose = () => onClose();

  if (!Object.keys(filterLists).length) return <FilterSkeleton />;

  return (
    <Box>
      <Box d={{ sm: "block", md: "none" }}>
        <Button
          onClick={onOpen}
          w='full'
          bg='black'
          h='40px'
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
      <Box d={{ sm: "none", md: "block" }}>
        <FilterList />
      </Box>
    </Box>
  );
}
