/**
 * all default in github
  https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/
*/

// theme.js
import { extendTheme } from "@chakra-ui/react";
// Global style overrides
import styles from "./styles";

// Foundational style overrides
import breakpoints from "./foundations/breakpoints";
import colors from "./foundations/colors";

// Component style overrides
import Link from "./components/link";
import Heading from "./components/heading";

const overrides = {
  styles,
  breakpoints,
  colors,
  components: {
    Link,
    Heading,
  },
};

export default extendTheme(overrides);
