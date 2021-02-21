import React from "react";
import { useFilter } from "../context/FilterContext";
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
  const {
    updateSearchValue,
    filterLists,
    hanldeMoblieCheckbox,
    mobileCheckboxItems,
    updateTotalLength,
  } = useFilter();

  const { brands, types, tags } = filterLists;
  const [brandsTitle, typesTitle, tagsTitle] = Object.keys(filterLists); // ["brands", "types", "tags"]

  const handleCheckbox = (title, count, e) => {
    if (e.target.value) {
      const value = e.target.value;
      const spaceValue = value.replace("_", " ");

      updateSearchValue(title, spaceValue);
      updateTotalLength(+count, value);
      hanldeMoblieCheckbox(value);
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
          mobileCheckboxItems={mobileCheckboxItems}
        />
      ))}
    </Box>
  );
}

const Listing = ({ title, items, onClick, mobileCheckboxItems }) => {
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
        px={0}>
        <Heading as='h3' fontSize='1.1em' textTransform='capitalize'>
          {title}
        </Heading>
      </Button>
      {Object.keys(items || "").length ? (
        Object.entries(items).map(([name, number], i) => (
          <List key={i} spacing={3} maxHeight='140px' overflow='auto'>
            <ListItem ml={1}>
              <CheckboxGroup
                fontSize='0.8em'
                _focus={{ boxShadow: "0" }}
                colorScheme='green'
                value={mobileCheckboxItems}>
                <VStack align='stretch'>
                  <Checkbox
                    value={name}
                    onClick={(e) => onClick(title, number, e)}>
                    {name.replace("_", " ")} ({number})
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
            </ListItem>
          </List>
        ))
      ) : (
        <Box>No {title}</Box>
      )}
    </Box>
  );
};
