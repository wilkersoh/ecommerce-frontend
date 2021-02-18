import React, { useEffect } from "react";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import ReactMarkdown from "react-markdown";
import { FilterProvider, useFilter } from "../../../context/FilterContext";
import App from "../../../components/App";
import Filter from "../../../components/Filter";
import PageNav from "../../../components/PageNav";
import ViewProductImage from "../../../components/ViewProductImage";
import PageSize from "../../../components/PageSize";
import SortBy from "../../../components/SortBy";
import { API_URL } from "../../../utils/urls";

import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import PaginationControl from "../../../components/PaginationControl";

const CategoryProducts = ({ products, initialTotalProductLength }) => {
  const router = useRouter();
  const { showFilterData, setTotalProductLength } = useFilter();

  useEffect(() => {
    setTotalProductLength({ init: initialTotalProductLength, total: null });
  }, []);

  // if (!showFilterData) {
  //   return (
  //     <App>
  //       <PageNav routeQuery={router.query} />
  //     </App>
  //   );
  // }
  console.log("showFilterData :>> ", showFilterData);
  return (
    <App>
      <PageNav routeQuery={router.query} />

      {products[0]?.categories[0].meta_title && (
        <>
          <Box as='header' mb={4}>
            <ReactMarkdown
              children={products[0]?.categories[0].meta_description}
            />
          </Box>
        </>
      )}

      <Grid gridTemplateColumns={{ md: "20% 1fr" }} gap={{ md: 4 }}>
        <GridItem rowSpan={3}>
          <Filter />
        </GridItem>

        <Grid
          mt={{ sm: 3, md: 0 }}
          mb={{ sm: 4, md: 2 }}
          columnGap={{ sm: 2, md: 6 }}
          gridTemplateColumns={{
            sm: "repeat(4, 1fr)",
            md: "repeat(5, 1fr)",
          }}>
          <GridItem gridColumn={{ sm: "1 / 2", md: "3 / 4" }}>
            <PageSize />
          </GridItem>
          <GridItem gridColumn={{ sm: "2 / -1", md: "4 / -1" }}>
            <SortBy />
          </GridItem>
        </Grid>
        <Grid
          templateRows={{
            sm: "minmax(343px, auto)",
            md: "minmax(420px, 1fr)",
          }}>
          <Grid
            templateColumns={{ sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            gap={6}>
            {showFilterData?.map((product) => (
              <ViewProductImage key={product.productID} product={product} />
            ))}
          </Grid>
        </Grid>
      </Grid>
      <PaginationControl />
    </App>
  );
};

const FilterProviderComponent = (props) => {
  const { category_slug } = props;
  return (
    <FilterProvider category_slug={category_slug}>
      <CategoryProducts {...props} />
    </FilterProvider>
  );
};

export default FilterProviderComponent;

export async function getServerSideProps(context) {
  // variable page is customise created.
  const { category_slug } = context.query;
  /**
    _start= which next paganition item you would to start, if input number 2, then next page will show number 3

    * 1 = pageSize
    _limit = pageSize too

   */

  // get total product item number
  const res_products_length = fetch(
    `${API_URL}/products/count?categories.category_slug=${category_slug}`
  );

  const res_product = fetch(
    `${API_URL}/products?categories.category_slug=${category_slug}`
  );

  const [promise_product, promise_productLength] = await Promise.all([
    res_product,
    res_products_length,
  ]);

  const products = await promise_product.json();
  const initialTotalProductLength = await promise_productLength.json();

  return {
    props: {
      products,
      category_slug,
      initialTotalProductLength,
    },
  };
}
