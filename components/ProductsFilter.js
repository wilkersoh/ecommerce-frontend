import React from "react";

import Filter from "./Filter";
import SortBy from "./SortBy";
import ViewProductImage from "./ViewProductImage";
import PageSize from "./PageSize";
import { Grid, GridItem } from "@chakra-ui/react";

export default function ProductsFilter({ showFilterData }) {
  return (
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
          {showFilterData && Array.isArray(showFilterData)
            ? showFilterData[0].map((product) => (
                <ViewProductImage key={product.productID} product={product} />
              ))
            : null}
        </Grid>
      </Grid>
    </Grid>
  );
}
