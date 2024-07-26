import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  // グローバルに適用されるスタイル
  styles: {
    global: {
      body: {
        backgroundColor: "gray.100",
        color: "gray.800"
      }
    }
  },
  // アプリケーション全体で使う基本となる色
  colors: {
    brand: {
      // gradient: "linear-gradient(to right, rgba(66, 153, 225, 1), rgba(128, 90, 213, 1))",
      // gradientHover: "linear-gradient(to right, rgba(66, 153, 225, 0.8), rgba(128, 90, 213, 0.8))",
      gradient: 'linear-gradient(90deg, rgba(85, 85, 85, 1) 0%, rgba(0, 0, 0, 1) 100%)',
      gradientHover: "linear-gradient(90deg, rgba(85, 85, 85, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%)",
    }
  },
  // ボタンのスタイル
  components: {
    Button: {
      baseStyle: {
        bg: "brand.gradient",
        color: "white",
      },
      variants: {
        custom: {
          bg: "brand.gradient",
          color: "white",
          _hover: {
            bg: "brand.gradientHover",
            transform: "translateY(-2px)",
            boxShadow: "md",
          }
        }
      }
    }  
  }
});

export default theme
