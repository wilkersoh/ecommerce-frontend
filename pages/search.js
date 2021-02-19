import React, { useState, useRef, useEffect } from "react";
import App from "../components/App";
import { useRouter } from "next/router";
import Image from "next/image";
import useSWR from "swr";
import Pagination from "material-ui-flat-pagination";
import { API_URL } from "../utils/urls";
import noAuthFetcher from "../utils/noAuthFetcher";
import { twoDecimals } from "../utils/format";

import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  InputGroup,
  InputRightElement,
  Input,
  Text,
} from "@chakra-ui/react";

export default function search() {
  const router = useRouter();
  const [searchStatus, setSearchStatus] = useState({
    status: false,
    value: null,
    offset: 0,
  });

  useEffect(() => {
    const { q } = router.query;
    if (!q) return;
    setSearchStatus({ ...searchStatus, status: true, value: q });
  }, []);

  const inputRef = useRef();

  const { data } = useSWR(
    searchStatus.status
      ? `${API_URL}/search?q=${searchStatus.value}&offset=${searchStatus.offset}`
      : null,
    noAuthFetcher,
    {
      dedupingInterval: 1000,
    }
  );

  const handleGlobalSearch = (e) => {
    const value = e.target.value;
    if (value.length < 3)
      return setSearchStatus({ ...searchStatus, status: false });
    setSearchStatus({ status: true, offset: 0, value });
  };

  const onSearchButton = () => {
    const value = inputRef.current.value;
    console.log("value :>> ", value);
    setSearchStatus({ status: true, offset: 0, value });
  };

  const onClickPagination = (value) =>
    setSearchStatus({ ...searchStatus, offset: value });

  if (!data) {
    return (
      <App>
        <Box h='200px'>
          <Heading fontSize='1.64706em'>
            Search for products on our site
          </Heading>

          <InputGroup w={{ sm: "full", md: "500px" }} size='md' mt={8}>
            <Input
              ref={inputRef}
              onChange={handleGlobalSearch}
              placeholder='Search'
              _focus={{ borderColor: "green.1" }}
            />
            <InputRightElement
              onClick={onSearchButton}
              cursor='pointer'
              h='full'
              w='50px'
              bgColor='green.1'
              children={<Search2Icon color='white' />}
            />
          </InputGroup>
        </Box>
      </App>
    );
  }

  return (
    <App>
      <Box h='200px'>
        <Heading fontSize='1.64706em'>
          Search for{" "}
          {searchStatus.value ? `"${searchStatus.value}"` : "products"} on our
          site
        </Heading>

        <InputGroup w={{ sm: "full", md: "500px" }} size='md' mt={8}>
          <Input
            ref={inputRef}
            onChange={handleGlobalSearch}
            placeholder='Search'
            _focus={{ borderColor: "green.1" }}
          />
          <InputRightElement
            onClick={onSearchButton}
            cursor='pointer'
            h='full'
            w='50px'
            bgColor='green.1'
            children={<Search2Icon color='white' />}
          />
        </InputGroup>
      </Box>
      <Box as='section' d={searchStatus.status ? "block" : "none"}>
        {data[0]?.map((product) => (
          <Box key={product.productID} d='flex' mb={4}>
            <Box w={{ sm: "20%" }} mr={6}>
              <Image
                src={product.images.split(",")[0]}
                width={200}
                height={200}
                layout='responsive'
              />
            </Box>
            <Box w={{ sm: "80%" }}>
              <Heading as='h2' fontSize='1.29em' color='green.1'>
                {product.productName}
              </Heading>
              <Box fontSize='17px'>
                <Text as='h3' mt={3} fontWeight='400'>
                  RM {twoDecimals(product.price)}
                </Text>
                <Text>{product.content}</Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <Paginate
        totalLength={data[1][0].totalLength}
        onClick={onClickPagination}
        offsetValue={searchStatus.offset}
      />
    </App>
  );
}

const Paginate = ({ totalLength, onClick, offsetValue }) => {
  if (!totalLength) return <Box></Box>;

  return (
    <Pagination
      limit={2}
      offset={offsetValue}
      total={totalLength}
      size={"medium"}
      currentPageColor='inherit'
      reduced={true}
      onClick={(e, offset) => onClick(offset)}
    />
  );
};
