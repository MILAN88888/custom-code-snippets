import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorBoundary from "./components/ErrorBoundary";
import MainLayout from "./components/MainLayout";
import { HashRouter } from "react-router-dom";
import { theme } from "./theme/theme";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HashRouter>
        <ChakraProvider theme={theme}>
          <MainLayout />
        </ChakraProvider>
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;
