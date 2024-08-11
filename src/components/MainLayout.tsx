import { Box, Container, Stack, VStack } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import Router from "./router/Router";

const MainLayout: React.FC = () => {
  return (
    <Box minH="100vh">
      <Stack direction="column">
        <Header />
        <Box bg="white" minH="100vh" mt="80px">
          <Router />
        </Box>
      </Stack>
    </Box>
  );
};

export default MainLayout;
