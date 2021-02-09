import React, { useEffect, useState } from "react";
import useSWR from "swr";
import FilterList from "./FilterList";
import { API_URL } from "../utils/urls";
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

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Filter({ category_slug }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterLists, setFilterList] = useState({});
  const { data, error } = useSWR(
    `${API_URL}/products/getFilterList?category_slug=${category_slug}`,
    fetcher
  );

  useEffect(() => {
    const result = (data || []).reduce(
      (acc, obj) => {
        if (!acc["types"][obj["type_name"]]) {
          if (obj["type_name"])
            acc["types"][obj["type_name"].replace(" ", "_")] = obj["typeCount"];
        }

        if (!acc["brands"][obj["brand_name"]]) {
          if (obj["brand_name"])
            acc["brands"][obj["brand_name"].replace(" ", "_")] =
              obj["brandCount"];
        }

        if (!acc["tags"][obj["tag_name"]]) {
          if (obj["tag_name"])
            acc["tags"][obj["tag_name"].replace(" ", "_")] = obj["tagCount"];
        }

        return acc;
      },
      { brands: {}, types: {}, tags: {} }
    );

    setFilterList(result);
  }, [data]);

  const handleClose = () => onClose();

  if (!data) return <FilterSkeleton />;

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
            {/* mobile filterList*/}
            <FilterList lists={filterLists} />
          </DrawerContent>
        </Drawer>
      </Box>
      <Box d={{ sm: "none", md: "block" }}>
        <FilterList lists={filterLists} />
      </Box>
    </Box>
  );
}
