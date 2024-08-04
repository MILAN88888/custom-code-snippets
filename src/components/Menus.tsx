import React from "react";
import { __ } from "@wordpress/i18n";
import { HStack, Box, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Menus: React.FC = () => {
  const menus = [
    {
      route: "/",
      label: __("All Snippets", "custom-code-snippets")
    },
    {
      route: "/add-new",
      label: __("Add New", "custom-code-snippets")
    }
  ];

  return (
    <HStack gap="32px" ml="100px">
      {menus.map((menu) => (
        <Box
          as={NavLink}
          to={menu.route}
          key={menu.route}
          style={({ isActive }: any) => ({
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "#2b6cb0" : "inherit"
          })}
          _focus={{
            boxShadow: "none"
          }}
        >
          <Text fontWeight="600" letterSpacing="0.5px">
            {menu.label}
          </Text>
        </Box>
      ))}
    </HStack>
  );
};

export default Menus;
