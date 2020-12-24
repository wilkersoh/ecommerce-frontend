import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import styles from "../styles/Home.module.css";
import { fromImageToUrl, API_URL } from "../utils/urls";
import { twoDecimals } from "../utils/format";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {products.map((product) => (
        <div key={product.name} className={styles.product}>
          <NextLink href={`/products/${product.slug}`}>
            <a>
              <div className={styles.product__Row}>
                <div className={styles.product__ColImg}>
                  <Image
                    src={fromImageToUrl(product.image)}
                    width={500}
                    height={500}
                  />
                </div>
                <div className={styles.product__Col}>
                  {product.name} ${twoDecimals(product.price)}
                </div>
              </div>
            </a>
          </NextLink>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  // Fetch products
  const product_res = await fetch(`${API_URL}/products/`);
  const products = await product_res.json();
  // Return the products
  return {
    props: {
      products,
    },
  };
}
