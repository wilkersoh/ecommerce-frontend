import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { API_URL, fromImageToUrl } from "../../utils/urls";
import { twoDecimals } from "../../utils/format";
import { Button } from "@chakra-ui/react";
import AddCart from "../../components/AddCart";
import BuyButton from "../../components/BuyButton";
import { useCart } from "../../context/CartContext";

const Product = ({ product }) => {
  const { cartItems, getCurrentCartItem } = useCart();
  const [currentProduct, setCurrentProduct] = useState({ quantity: 1 });

  useEffect(() => {
    const current = getCurrentCartItem(product.id);
    setCurrentProduct({ ...currentProduct, ...current });
  }, [cartItems, setCurrentProduct]);

  const checkStoreQuantity = (total, quantity) => {
    if (quantity > total) return true;
  };

  const addToInput = (valueToAdd) => {
    const quantity = currentProduct.quantity + valueToAdd;
    const isMax = checkStoreQuantity(product.store, quantity);
    setCurrentProduct({
      ...currentProduct,
      quantity: isMax ? product.store : quantity,
    });
  };

  const handleChange = (e) => {
    const quantity = Number(e.target.value);
    const isMax = checkStoreQuantity(product.store, quantity);
    setCurrentProduct({
      ...currentProduct,
      quantity: isMax ? product.store : quantity,
    });
  };

  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading... sorry for watiing...</div>;
  }

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
        <div>
          <Button
            type='button'
            px={4}
            colorScheme='teal'
            onClick={() => addToInput(-1)}>
            -
          </Button>
          <input
            type='text'
            name={"quantity"}
            value={currentProduct.quantity}
            onChange={handleChange}></input>
          <Button
            type='button'
            px={4}
            colorScheme='teal'
            onClick={() => addToInput(+1)}>
            +
          </Button>
        </div>

        <div>In Store - {product.store}</div>
      </div>
      <AddCart product={product} quantity={currentProduct.quantity}>
        Add To Cart
      </AddCart>
      <p>${twoDecimals(product.price * parseInt(1))}</p>
      <BuyButton
        productID={product.id}
        quantity={currentProduct.quantity}
        colorScheme='blue'
        px={4}>
        Buy Item
      </BuyButton>
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
    revalidate: 3,
  };
}

export async function getStaticPaths() {
  // Retrieve all the possbile paths
  let products = [];
  const products_res = await fetch(`${API_URL}/products/`);
  products = await products_res.json();
  // Return them to Nextjs context
  return {
    paths: products.map((product) => ({
      params: { slug: String(product.slug) },
    })),
    fallback: true, // Tells to nextjs to show a 404 if the param is not found
  };
}

export default Product;
