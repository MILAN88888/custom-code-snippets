import React from "react";
import { __ } from "@wordpress/i18n";
import { HStack, Box } from "@chakra-ui/react";

const Menus: React.FC = () => {
  const menus = [
    {
      route: "/",
      label: __("Snippets", "custom-code-snippets")
    },
    {
      route: "/add-new",
      label: __("Add New", "custom-code-snippets")
    }
  ];

  return (
    <HStack gap="32px" ml="100px">
      {menus.map((menu) => (
        <Box key={menu.route}>{menu.label}</Box>
      ))}
    </HStack>
  );
};

export default Menus;
