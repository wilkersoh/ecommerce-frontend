import React, { useState } from "react";
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
  CircularProgressLabel,
} from "@chakra-ui/react";

export default function FilterList({ filterLists, setSearchValue }) {
  const [onlyFirstFilter, setOnlyFirstFilter] = useState(true);
  const { brands, types, tags } = filterLists;
  const [brandsTitle, typesTitle, tagsTitle] = Object.keys(filterLists); // ["brands", "types", "tags"]

  const handleCheckbox = (title, e) => {
    if (e.target.value) {
      if (onlyFirstFilter) setOnlyFirstFilter(false);
      const spaceValue = e.target.value.replace("_", " ");

      setSearchValue((prevState) => {
        const clonePrev = JSON.parse(JSON.stringify(prevState));

        if (onlyFirstFilter) {
          const resetValue = {
            brands: [],
            tags: [],
            types: [],
            [title]: [spaceValue],
          };

          return resetValue;
        }

        if (clonePrev[title].includes(spaceValue)) {
          // remove value
          const index = clonePrev[title].indexOf(spaceValue);
          clonePrev[title].splice(index, 1);
          return clonePrev;
        }

        clonePrev[title].push(spaceValue);
        return clonePrev;
      });
    }
  };

  return (
    <Box>
      {[
        [brands, brandsTitle],
        [types, typesTitle],
        [tags, tagsTitle],
      ].map((values, i) => (
        <Listing
          key={i}
          items={values[0]}
          title={values[1]}
          onClick={handleCheckbox}
        />
      ))}
    </Box>
  );
}

const Listing = ({ title, items, onClick }) => {
  return (
    <Box
      minH={"100px"}
      maxH='280px'
      overflow='auto'
      py={3}
      borderBottom='1px solid #aaaaaa'>
      <Button
        mb={2}
        size='sm'
        variant='none'
        className='button_none-focus'
        // leftIcon={<ChevronDownIcon />}
        px={0}>
        <Heading as='h3' fontSize='1.1em' textTransform='capitalize'>
          {title}
        </Heading>
      </Button>
      {Object.keys(items || "").length ? (
        Object.entries(items).map(([name, number], i) => (
          <List key={i} spacing={3} maxHeight='140px' overflow='auto'>
            <ListItem ml={1}>
              <CheckboxGroup fontSize='0.8em' colorScheme='green'>
                <VStack align='stretch'>
                  <Checkbox
                    value={name}
                    onClick={(e) => onClick(title, e)}
                    // onClick={(e) => handleCheckbox(title, e)}
                  >
                    {name.replace("_", " ")} ({number})
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
            </ListItem>
          </List>
        ))
      ) : (
        <Box></Box>
        // <Box>Not included {title}</Box>
      )}
    </Box>
  );
};
