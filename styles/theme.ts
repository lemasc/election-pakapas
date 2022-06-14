import { extendTheme, ThemeConfig } from "@chakra-ui/react";
const config: ThemeConfig = {
  initialColorMode: "system",
};

export const theme = extendTheme(
  {
    fonts: {
      body: "Anakotmai, system-ui, sans-serif",
      heading: "Anakotmai, system-ui, sans-serif",
    },
    components: {
      Button: {
        baseStyle: {
          fontWeight: "normal",
        },
      },
    },
  },
  config
);
