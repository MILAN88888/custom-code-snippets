import { Box, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { __ } from "@wordpress/i18n";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CodeSnippetEditor from "./CodeMirrorEditor";

const AddNewForm = () => {
  const { handleSubmit } = useForm();

  const onSubmit = (data: any) => {};

  return (
    <Stack
      padding="20px 20px 40px 20px"
      height="100vh"
      borderRadius="8px"
      border="1px solid red.100"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" gap="16px">
          <Stack direction="row" gap="32px" justifyContent="flex-start">
            <Stack alignItems="left" justifyContent="flex-start" w="200px">
              <FormLabel>
                <Text fontWeight="600" fontSize="15px">
                  {__("Add Title", "custom-code-snippets")}
                </Text>
              </FormLabel>
            </Stack>
            <Box minW="900px">
              <Input type="text" />
            </Box>
          </Stack>
          <Stack direction="row" gap="32px">
            <Stack alignItems="left" justifyContent="flex-start" w="200px">
              <FormLabel>
                <Text fontWeight="600" fontSize="15px">
                  {__("Add Code Snippets", "custom-code-snippets")}
                </Text>
              </FormLabel>
            </Stack>
            <Box minW="900px">
              <CodeSnippetEditor />
            </Box>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default AddNewForm;
