import React from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Button,
  VStack,
  Checkbox,
  CheckboxGroup,
  ListItem,
  List,
} from "@chakra-ui/react";

export default function FilterList() {
  return (
    <Box d={{ sm: "none", md: "block" }}>
      {new Array(3).fill().map((item, i) => (
        <Box
          maxH='280px'
          overflow='auto'
          key={i}
          py={3}
          borderBottom='1px solid #aaaaaa'>
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
                  <Checkbox value='naruto'>Naruto</Checkbox>
                  <Checkbox value='sasuke'>Sasuke</Checkbox>
                  <Checkbox value='kakashi'>kakashi</Checkbox>
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
  );
}
