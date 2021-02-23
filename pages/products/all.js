import React from "react";
import App from "../../components/App";
import PageNavWithoutNested from "../../components/PageNavWithoutNested";
import PaginationControl from "../../components/PaginationControl";
import { FilterProvider, useFilter } from "../../context/FilterContext";
import { Heading } from "@chakra-ui/react";
import ProductsFilter from "../../components/ProductsFilter";

import { API_URL } from "../../utils/urls";

const All = () => {
  const { showFilterData } = useFilter();

  return (
    <App>
      <PageNavWithoutNested />

      <Heading as='h1' mb={4}>
        Products
      </Heading>

      <ProductsFilter showFilterData={showFilterData} />

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

  const res_product = fetch(`${API_URL}/products`);

  const [promise_product] = await Promise.all([res_product]);

  const products = await promise_product.json();

  return {
    props: {
      products,
    },
  };
}
