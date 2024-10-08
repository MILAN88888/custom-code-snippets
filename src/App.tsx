import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorBoundary from "./components/ErrorBoundary";
import MainLayout from "./components/MainLayout";
import { HashRouter } from "react-router-dom";
import { theme } from "./theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <ErrorBoundary>
      <HashRouter>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <MainLayout />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ChakraProvider>
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;
