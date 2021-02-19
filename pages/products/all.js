import React from "react";
import App from "../../components/App";
import PageNavWithoutNested from "../../components/PageNavWithoutNested";
import PaginationControl from "../../components/PaginationControl";
import ViewProductImage from "../../components/ViewProductImage";
import Filter from "../../components/Filter";
import PageSize from "../../components/PageSize";
import SortBy from "../../components/SortBy";
import { FilterProvider, useFilter } from "../../context/FilterContext";

import { Box, Heading, Grid, GridItem } from "@chakra-ui/react";
import { API_URL } from "../../utils/urls";

const All = () => {
  const { showFilterData, setTotalProductLength } = useFilter();

  return (
    <App>
      <PageNavWithoutNested />

      <Heading as='h1' mb={4}>
        Products
      </Heading>

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
  return (
    <FilterProvider>
      <All {...props} />
    </FilterProvider>
  );
};

export default FilterProviderComponent;

export async function getServerSideProps(context) {
  // variable page is customise created.

  // get total product item number
  const res_products_length = fetch(`${API_URL}/products/count`);

  const res_product = fetch(`${API_URL}/products`);

  const [promise_product, promise_productLength] = await Promise.all([
    res_product,
    res_products_length,
  ]);

  const products = await promise_product.json();
  const initialTotalProductLength = await promise_productLength.json();

  return {
    props: {
      products,
      initialTotalProductLength,
    },
  };
}
