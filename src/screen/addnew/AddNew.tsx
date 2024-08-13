import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { __ } from "@wordpress/i18n";
import React from "react";
import AddNewForm from "./components/AddNewForm";
import { useParams } from "react-router-dom";

const AddNew: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const editProps = id ? { id: id } : {};
  return (
    <Stack
      width="100%"
      padding="20px 40px 40px 60px"
      bg="primary.50"
      height="100vh"
      borderRadius="8px"
      mb="20px"
    >
      <Box height="76px" gap="16px">
        <Stack
          height="60px"
          padding="10px 0px 10px 0px"
          gap="24px"
          direction="column"
        >
          <Heading
            fontWeight="600"
            size="18px"
            lineHeight="6px"
            color="dark.500"
          >
            {id
              ? __("Edit Custom Code Snippets", "custom-code-snippets")
              : __("Add New Custom Code Snippets", "custom-code-snippets")}
          </Heading>
          <Text
            fontWeight="400"
            size="14px"
            lineHeight="8px"
            color="primary.400"
          >
            {id
              ? __(
                  "Easily edit Custom Code Snippets to your library to enhance your functionality.",
                  "custom-code-snippets"
                )
              : __(
                  "Easily Add New Custom Code Snippets to your library to enhance your functionality.",
                  "custom-code-snippets"
                )}
          </Text>
          <AddNewForm {...editProps} />
        </Stack>
      </Box>
    </Stack>
  );
};

export default AddNew;
