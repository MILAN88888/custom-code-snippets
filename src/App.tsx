import React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import ErrorBoundary from "./components/ErrorBoundary";
import MainLayout from "./components/MainLayout";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ChakraProvider>
        <MainLayout />
      </ChakraProvider>
    </ErrorBoundary>
  );
};

export default App;
