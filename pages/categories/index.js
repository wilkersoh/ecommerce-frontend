import App from "../../components/App";

import { Box } from "@chakra-ui/react";

export default function index() {
  return (
    <App>
      <Box>Listing of categories</Box>
    </App>
  );
}

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
