import Head from "next/head";
import Image from "next/image";
import { API_URL, fromImageToUrl } from "../../utils/urls";
import { twoDecimals } from "../../utils/format";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useNumberInput,
  HStack,
  Button,
  Input,
} from "@chakra-ui/react";
import BuyButton from "../../components/BuyButton";

const Product = ({ product }) => {
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 50,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ isReadOnly: true });

  return (
    <div>
      <Head>
        {product.meta_title && <title>{product.meta_title}</title>}
        {product.meta_description && (
          <meta name='description' content={product.meta_description} />
        )}
      </Head>
      <h3>{product.name}</h3>
      <Image src={fromImageToUrl(product.image)} width={500} height={500} />
      <h3>{product.name}</h3>
      <div>
        <p>Quantity</p>
        <HStack maxW='320px'>
          <Button {...inc}>+</Button>
          <Input {...input} />
          <Button {...dec}>-</Button>
        </HStack>
      </div>
      <p>
        ${twoDecimals(product.price * parseInt(input.value))}{" "}
        <BuyButton product={product} quantity={input} />
      </p>
      <p>{product.content}</p>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const product_res = await fetch(`${API_URL}/products/?slug=${slug}`); // question mark is query slug, to find the slug in the json
  const found = await product_res.json();

  return {
    props: {
      product: found[0],
    },
  };
}

export async function getStaticPaths() {
  // Retrieve all the possbile paths
  const products_res = await fetch(`${API_URL}/products/`);
  const products = await products_res.json();
  // Return them to Nextjs context
  return {
    paths: products.map((product) => ({
      params: { slug: String(product.slug) },
    })),
    fallback: false, // Tels to nextjs to show a 404 if the param is not found
  };
}

export default Product;
