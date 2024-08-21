import React from "react";
import { __ } from "@wordpress/i18n";
import { Box, Text, Stack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Menus: React.FC = () => {
  const menus = [
    {
      route: "/",
      label: __("All Snippets", "custom-code-snippets")
    },
    {
      route: "/snippet/add",
      label: __("Add New", "custom-code-snippets")
    }
  ];

  return (
    <Stack gap="36px" ml="100px" direction="row" alignItems="center">
      {menus.map((menu) => (
        <Box
          as={NavLink}
          to={menu.route}
          key={menu.route}
          display="flex"
          alignItems="center"
          height="80px"
          _focus={{ boxShadow: "none" }}
          _hover={{ textDecoration: "none", boxShadow: "sm" }}
          sx={{
            "&.active": {
              fontWeight: "bold",
              color: "#2563eb",
              borderBottom: "3px solid #2563eb"
            }
          }}
        >
          <Text fontWeight="400" fontSize="14px" lineHeight="6px">
            {menu.label}
          </Text>
        </Box>
      ))}
    </Stack>
  );
};

export default Menus;
