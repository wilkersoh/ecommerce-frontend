import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Link,
  List,
  ListItem,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
  Heading,
  Icon,
  Checkbox,
  CheckboxGroup,
  VStack,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";

export default function Filter(quantities, category, brands, tags) {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => onClose();

  return (
    <>
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
          <Box overflow='auto'>
            {new Array(6).fill().map((item, i) => (
              <Box key={i} py={3} borderBottom='1px solid #aaaaaa'>
                <Button
                  mb={2}
                  size='sm'
                  variant='none'
                  className='button_none-focus'
                  px={0}
                  leftIcon={<ChevronDownIcon />}>
                  <Heading as='h3' fontSize='1.1em'>
                    Category
                  </Heading>
                </Button>
                <List spacing={3} maxHeight='140px' overflow='auto'>
                  <ListItem>
                    <CheckboxGroup
                      fontSize='0.8em'
                      colorScheme='green'
                      defaultValue={["naruto", "kakashi"]}>
                      <VStack align='stretch'>
                        <Checkbox value='naruto'>Naruto</Checkbox>
                        <Checkbox value='sasuke'>Sasuke</Checkbox>
                        <Checkbox value='kakashi'>kakashi</Checkbox>
                      </VStack>
                    </CheckboxGroup>
                  </ListItem>
                </List>
              </Box>
            ))}
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
}
