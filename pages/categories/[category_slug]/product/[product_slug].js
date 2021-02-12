import { useState } from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { API_URL } from "../../../../utils/urls";
import App from "../../../../components/App";
import PageNav from "../../../../components/PageNav";
import GroupProductImage from "../../../../components/GroupProductImage";
import { twoDecimals } from "../../../../utils/format";
import AddCart from "../../../../components/AddCart";
import { useCart } from "../../../../context/CartContext";

import {
  Box,
  Grid,
  Text,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const Product = ({ product }) => {
  const { cartItems, getCurrentCartItem } = useCart();
  const [currentProduct, setCurrentProduct] = useState({ quantity: 1 });
  const [quantity, setQuanity] = useState(1);

  const {
    meta_title,
    brand,
    name,
    images,
    quantity_in_store,
    id,
    price,
    content,
  } = product;

  const onChangeQuantity = (value) => {
    const precision = parseFloat(value).toFixed(0);
    setQuanity(precision);
  };

  // useEffect(() => {
  //   const current = getCurrentCartItem(product.id);
  //   console.log("current: ", current);
  //   setCurrentProduct({ ...currentProduct, ...current });
  // }, [cartItems, setCurrentProduct]);

  // if (router.isFallback) {
  //   return <div>Loading... sorry for watiing...</div>;
  // }

  return (
    <App>
      <Head>{meta_title && <title>{meta_title}</title>}</Head>
      <PageNav />

      <Grid templateColumns={{ md: "50% 50%" }} columnGap={4}>
        <GroupProductImage images={images} name={name} />

        <Box as='section' mt={4}>
          <Box mb={3}>
            <Heading as='h3' fontSize='1.2em'>
              {brand?.name}
            </Heading>
            <Heading as='h1'>{name}</Heading>
            <Heading
              as='h3'
              mt={2}
              color='green.1'
              fontSize='1.5em'
              fontWeight='700'>
              RM {twoDecimals(price)}
            </Heading>
          </Box>
          <Box>
            <Text>Quantity</Text>

            <NumberInput
              onChange={(valueString) => onChangeQuantity(valueString)}
              defaultValue={1}
              min={1}
              max={quantity_in_store}
              precision={0}
              step={1}
              keepWithinRange={false}
              clampValueOnBlur={false}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Box>In Store - {quantity_in_store}</Box>
          </Box>
          <AddCart
            productID={id}
            quantityInStore={quantity_in_store}
            quantity={quantity}
            w='full'
            variant='outline'
            mt={6}
            isDisabled={quantity > quantity_in_store ? true : false}
            _hover={{ bgColor: "transparent" }}
            className='h2'
            fontSize='0.9em'
          />
          <Box mt={6} mb={3}>
            <ReactMarkdown children={content} />
          </Box>
        </Box>
      </Grid>
    </App>
  );
};

export async function getStaticProps({
  params: { product_slug, category_slug },
}) {
  const product_res = await fetch(
    `${API_URL}/products/?product_slug=${product_slug}`
  ); // question mark is query slug, to find the slug in the json
  const found = await product_res.json();

  return {
    props: {
      product: found[0],
    },
    // revalidate: 3,
  };
}

export async function getStaticPaths() {
  // Retrieve all the possbile paths
  const products_res = await fetch(`${API_URL}/products/`);
  const products = await products_res.json();

  return {
    paths: !products.length
      ? []
      : products.map((product) => ({
          params: {
            product_slug: product.product_slug,
            category_slug: product.categories[0].category_slug,
          },
        })),
    fallback: false,
  };
}

export default Product;
