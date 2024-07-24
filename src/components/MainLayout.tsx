import { Box, Container, Stack, VStack } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";

const MainLayout: React.FC = () => {
  return (
    <Box minH="100vh">
      <Stack gap="16px" direction="column">
        <Header />
        <Box bg="gray.100" minH="100vh">Body</Box>
      </Stack>
    </Box>
  );
};

export default MainLayout;
