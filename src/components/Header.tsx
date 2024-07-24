import React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Tag,
  Tooltip
} from "@chakra-ui/react";
import { __ } from "@wordpress/i18n";

const Header = () => {
  return (
    <Box
      position={{
        sm: "sticky"
      }}
      zIndex={1}
      height="70px"
      padding="18px 25px 18px 25px"
      bg="gray.100"
    >
      <Stack direction="row" minH="70px" justify="space-between">
        <Box height={"35px"}>
          <HStack gap={"16px"}>
            <Image
              src={"./../../images/icon.svg"}
              width="29.67px"
              height="27.24px"
              top="3.65px"
              left="1.95px"
            />
            <Heading fontWeight="600" size="16px" lineHeight="24px">
              {__("Custom Code Snippets", "custom-code-snippets")}
            </Heading>
          </HStack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Header;
