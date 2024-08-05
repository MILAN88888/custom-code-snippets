import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    primary: {
      50: "#fafafc",
      100: "#e8eefd",
      200: "#b9cdf9",
      300: "#8aabf4",
      400: "#5c8af0",
      500: "#2563eb",
      600: "#134fd2",
      700: "#0f3ea3",
      800: "#0b2c75",
      900: "#061a46"
    },
    dark: {
      500: "#222222"
    }
  },
  styles: {
    global: {
      ".wp-admin #custom-code-snippets": {
        ml: "-20px"
      },
      ".ba-modal-open": {
        "#adminmenuwrap": {
          zIndex: 999
        }
      }
    }
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "base"
      }
    },
    Heading: {
      baseStyle: {
        margin: 0
      }
    },
    Text: {
      baseStyle: {
        margin: 0
      }
    }
  }
});
