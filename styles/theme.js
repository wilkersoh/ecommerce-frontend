// 1. Import the utilities
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const customise = {
  breakpoints: createBreakpoints({
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  }),
  fonts: {
    brand: "Work Sans, sans-serif",
    body: "PT Serif, sans-serif",
    heading: "Source Sans Pro, sans-serif",
  },
};

// 3. Extend the theme
export const theme = extendTheme(customise);
