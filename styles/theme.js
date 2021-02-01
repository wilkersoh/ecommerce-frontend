// 1. Import the utilities
import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";
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
  colors: {
    ...chakraTheme.colors,
    green: {
      0: "#c9d6cc",
      ...chakraTheme.colors.green,
    },
  },
};

// 3. Extend the theme
export const customTheme = extendTheme(customise);
