import React from "react";
import { Box, Heading, HStack, Image, Stack } from "@chakra-ui/react";
import { __ } from "@wordpress/i18n";
import Menus from "./Menus";

const Header = () => {
  return (
    <Stack
      width="100%"
      position="fixed"
      zIndex={1}
      padding="18px 25px 18px 25px"
      bg="white"
      height="80px"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
    >
      <Stack direction="row" justify="space-between" alignItems="center">
        <Box height="35px">
          <HStack gap="16px">
            <Image
              src={"./../../images/icon.svg"}
              width="29.67px"
              height="27.24px"
              top="3.65px"
              left="1.95px"
            />
            <Heading
              fontWeight="600"
              size="20px"
              lineHeight="8px"
              color="dark.500"
              letterSpacing="0.5px"
            >
              {__("Custom Code Snippets", "custom-code-snippets")}
            </Heading>
            <Menus />
          </HStack>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Header;
