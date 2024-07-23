import React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Box>Custom Code Snippets</Box>
    </ChakraProvider>
  );
};

export default App;
