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
    body: "Source Sans Pro, sans-serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace",
  },
};

// 3. Extend the theme
export const theme = extendTheme(customise);
