import React from "react";
import fetch from "isomorphic-unfetch";
import ReactMarkdown from "react-markdown";
import { FilterProvider, useFilter } from "../../../context/FilterContext";
import App from "../../../components/App";
import PageNav from "../../../components/PageNav";
import { API_URL } from "../../../utils/urls";
import PaginationControl from "../../../components/PaginationControl";
import ProductsFilter from "../../../components/ProductsFilter";

import { Box } from "@chakra-ui/react";

const CategoryProducts = ({ products }) => {
  const { showFilterData } = useFilter();

  return (
    <App>
      <PageNav />

      {products[0]?.categories[0].meta_title && (
        <>
          <Box as='header' mb={4}>
            <ReactMarkdown
              children={products[0]?.categories[0].meta_description}
            />
          </Box>
        </>
      )}

      <ProductsFilter showFilterData={showFilterData} />
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
  const { category_slug } = context.query;

  const res_product = fetch(
    `${API_URL}/products?categories.category_slug=${category_slug}&_limit=1`
  );

  const [promise_product] = await Promise.all([res_product]);

  const products = await promise_product.json();
  return {
    props: {
      products,
      category_slug,
    },
  };
}
