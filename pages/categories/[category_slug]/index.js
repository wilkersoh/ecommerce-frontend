import React from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import fetch from "isomorphic-unfetch";
import { API_URL } from "../../../utils/urls";
import ReactMarkdown from "react-markdown";
import App from "../../../components/App";
import Filter from "../../../components/Filter";
import PageNav from "../../../components/PageNav";
import ViewProductImage from "../../../components/ViewProductImage";
import PageSize from "../../../components/PageSize";
import SortBy from "../../../components/SortBy";

import { Box, Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CategoryProducts({
  products,
  totalProductLength,
  category_slug,
  page,
  pageSize,
}) {
  const router = useRouter();
  const lastPage = Math.ceil(totalProductLength / pageSize); // num is pageSize
  const { data, error } = useSWR(
    `${API_URL}/products/getFilterList?category_slug=${category_slug}`,
    fetcher
  );

  const initialValues = {
    brand: router.query.brand || "ALL",
    type: router.query.type || "ALL",
    tag: router.query.tag || "ALL",
  };

  console.log("data :>> ", data);
  console.log("error :>> ", error);

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
          {!data ? (
            <Button isLoading={true}></Button>
          ) : (
            <Filter filterLists={data} />
          )}
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
          templateColumns={{ sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={6}>
          {products?.map((product) => (
            <ViewProductImage key={product.id} product={product} />
          ))}
        </Grid>
      </Grid>

      <Flex mt={10}>
        <Button
          colorScheme='teal'
          isDisabled={page === 1}
          onClick={() =>
            router.push(
              `/categories/${router.query.category_slug}?page=${page - 1}`
            )
          }>
          Previous
        </Button>
        <Button
          colorScheme='teal'
          isDisabled={page >= lastPage}
          onClick={() =>
            router.push(
              `/categories/${router.query.category_slug}?page=${page + 1}`
            )
          }>
          Next
        </Button>
      </Flex>
    </App>
  );
}

export async function getServerSideProps(context) {
  // variable page is customise created.
  const { category_slug, page = 1, pageSize = 3 } = context.query;

  /**
    context.query > {
      category_slug: 'name',
      page: '2',
      gf_[xxx]: 313112(searchNumValue)
    }
    Filter Bar
      1. gf_193556 - available
      2. gf_193200 - vendor
      3. gf_193211 - product_type [hanvet done it]
      4. gf_193231 - tag

      Select *, count(*) from CategoryItems

      想辦法 拿到 被checked的 id
      endpoint - categories?queryString 這個是filterCategory了
      endpoint - products?queryString 這個才是ilterProduct
      問題是 我要怎樣 filter 當前Category裡products的item

      single - products?categories.id=2
      multitple - categories.id=2&categories.id=1
      correct endpoint - products?categories.id=2&brand.id=1
      * 我要當前頁面出現的
      SELECT COUNT(ProductID), CategoryID as Category
      FROM Products
      GROUP BY Category

      - listing的totalCount > endpoint: /products/count?brand.id=1
      - listing的totalCount with categories > endpoint: products/count?categories.id=2&brand.id=2
      - category的全部ID > endpoint:  products?categories.id=1&categories.id=2
      - brand 的全部ID > endpoint: products?categories.id=1&categories.id=2&brand.id=2
      - type 的全部ID
      - tag 的全部ID > endpoint: products?categories.id=1&brand.id=1&tag.id=2

      /categories/[category_slug]
      * 從 category model query
      1.
      - Entity Categories where = [category_slug]
      - Loop all product items to get array ids pass to next logic 這個ids 是當前頁面的所有products
      - pass to frontend products array

      2.
      - Entities Products whereIn(id, ids).

      knex.select(knex.raw(brand, count(*) as total_brand)).from(products).whereIn(id, [ids])

      * 從 product model query
      cannnot get categories[]

   */

  /**
    _start= which next paganition item you would to start, if input number 2, then next page will show number 3

    * 1 = pageSize
    _limit = pageSize too

   */
  const start = +page === 1 ? 0 : (+page - 1) * pageSize;

  // get total product item number
  const res_products_length = fetch(
    `${API_URL}/products/count?categories.category_slug=${category_slug}`
  );

  const res_product = fetch(
    `${API_URL}/products?categories.category_slug=${category_slug}&_start=${start}&_limit=${pageSize}`
  );

  const [promise_product, promise_num] = await Promise.all([
    res_product,
    res_products_length,
  ]);

  const products = await promise_product.json();
  const totalProductLength = await promise_num.json();

  return {
    props: {
      products,
      totalProductLength,
      category_slug,
      page: +page, // plus is turn string type into number type
      pageSize,
    },
  };
}

/**


    /**
        1. get filter via query category_slug
        2.
     */

// return knex
//   .select(knex.raw("brand, count(*) as total_brand"))
//   .from("products")
//   .groupBy("brand");

// return knex
//   .select("name")
//   .from("products")
//   .whereIn("category.id", subquery);
/*
    SELECT *
    FROM cars
    WHERE (@make is NULL OR @make = make)
    AND (@model is NULL OR @model = model)
    AND (@minPrice is NULL OR @minPrice < price)
    LIMIT 3 OFFSET 6


*/
