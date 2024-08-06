import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
  Tooltip
} from "@chakra-ui/react";
import { __ } from "@wordpress/i18n";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { InfoIcon } from "@chakra-ui/icons";
import CodeSnippetEditor from "./CodeMirrorEditor";

const AddNewForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      title: "",
      codeSnippet: "",
      priority: 10,
      description: "",
      tags: ""
    }
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
  };

  return (
    <Stack
      padding="20px 20px 40px 20px"
      height="100vh"
      borderRadius="8px"
      border="1px solid red.100"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" gap="32px">
          <Stack direction="row" gap="32px" justifyContent="flex-start">
            <Stack alignItems="left" justifyContent="flex-start" w="250px">
              <FormLabel>
                <Stack direction="row" gap="8px" alignItems="center">
                  <Text fontWeight="600" fontSize="15px">
                    {__("Add Title", "custom-code-snippets")}
                  </Text>
                  <Tooltip
                    label={__(
                      "Title for the code snippets which help to identify.",
                      "easy-mail-smtp"
                    )}
                    placement="top"
                  >
                    <InfoIcon color="gray.600" />
                  </Tooltip>
                </Stack>
              </FormLabel>
            </Stack>
            <Box minW="900px">
              <FormControl isInvalid={!!errors.title}>
                <Input
                  placeholder={__("Enter the title", "custom-code-snippets")}
                  {...control.register("title", {
                    required: __("Title is required", "custom-code-snippets")
                  })}
                  type="text"
                />
                {errors.title && (
                  <FormErrorMessage>{errors.title.message}</FormErrorMessage>
                )}
              </FormControl>
            </Box>
          </Stack>
          <Stack direction="row" gap="32px">
            <Stack alignItems="left" justifyContent="flex-start" w="250px">
              <FormLabel>
                <Stack direction="row" gap="8px" alignItems="center">
                  <Text fontWeight="600" fontSize="15px">
                    {__("Add Code Snippets", "custom-code-snippets")}
                  </Text>
                  <Tooltip
                    label={__(
                      "The code snippets which enhance the functionality.",
                      "easy-mail-smtp"
                    )}
                    placement="top"
                  >
                    <InfoIcon color="gray.600" />
                  </Tooltip>
                </Stack>
              </FormLabel>
            </Stack>
            <Box minW="900px">
              <Controller
                name="codeSnippet"
                control={control}
                render={({ field }) => (
                  <CodeSnippetEditor
                    {...field}
                    height="500px"
                    theme="vs-dark"
                    language="php"
                    onChange={(value: string | undefined) =>
                      field.onChange(value ?? "")
                    }
                  />
                )}
              />
            </Box>
          </Stack>
          <Stack direction="row" gap="32px" justifyContent="flex-start">
            <Stack alignItems="left" justifyContent="flex-start" w="250px">
              <FormLabel>
                <Stack direction="row" gap="8px" alignItems="center">
                  <Text fontWeight="600" fontSize="15px">
                    {__("Priority", "custom-code-snippets")}
                  </Text>
                  <Tooltip
                    label={__(
                      "Set the priority. Low number has high priority.",
                      "easy-mail-smtp"
                    )}
                    placement="top"
                  >
                    <InfoIcon color="gray.600" />
                  </Tooltip>
                </Stack>
              </FormLabel>
            </Stack>
            <Box minW="900px">
              <FormControl isInvalid={!!errors.priority}>
                <Input
                  placeholder={__("Set the priority", "custom-code-snippets")}
                  {...control.register("priority", {
                    required: __("Priority is required", "custom-code-snippets")
                  })}
                  type="number"
                  min="0"
                  step="1"
                />
                {errors.priority && (
                  <FormErrorMessage>{errors.priority.message}</FormErrorMessage>
                )}
              </FormControl>
            </Box>
          </Stack>
          <Stack direction="row" gap="32px" justifyContent="flex-start">
            <Stack alignItems="left" justifyContent="flex-start" w="250px">
              <FormLabel>
                <Stack direction="row" gap="8px" alignItems="center">
                  <Text fontWeight="600" fontSize="15px">
                    {__("Description", "custom-code-snippets")}
                  </Text>
                  <Tooltip
                    label={__(
                      "Add description to identify the purpose of the code snippets for better understanding.",
                      "easy-mail-smtp"
                    )}
                    placement="top"
                  >
                    <InfoIcon color="gray.600" />
                  </Tooltip>
                </Stack>
              </FormLabel>
            </Stack>
            <Box minW="900px">
              <FormControl isInvalid={!!errors.description}>
                <Textarea
                  placeholder={__(
                    "Enter the description",
                    "custom-code-snippets"
                  )}
                  {...control.register("description", {
                    required: __(
                      "Description is required",
                      "custom-code-snippets"
                    )
                  })}
                  border="1px solid #8c8f94"
                ></Textarea>
                {errors.description && (
                  <FormErrorMessage>
                    {errors.description.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Box>
          </Stack>
          <Stack direction="row" gap="32px" justifyContent="flex-start">
            <Stack alignItems="left" justifyContent="flex-start" w="250px">
              <FormLabel>
                <Stack direction="row" gap="8px" alignItems="center">
                  <Text fontWeight="600" fontSize="15px">
                    {__("Tags", "custom-code-snippets")}
                  </Text>
                  <Tooltip
                    label={__(
                      "Add tags for sorting and filtering.",
                      "easy-mail-smtp"
                    )}
                    placement="top"
                  >
                    <InfoIcon color="gray.600" />
                  </Tooltip>
                </Stack>
              </FormLabel>
            </Stack>
            <Box minW="900px">
              <FormControl isInvalid={!!errors.tags}>
                <Input
                  placeholder={__(
                    "Enter the tags seperated by comma",
                    "custom-code-snippets"
                  )}
                  {...control.register("tags")}
                  type="text"
                />
              </FormControl>
            </Box>
          </Stack>
          <Stack direction="row" gap="32px">
            <Stack justifyContent="flex-start" w="250px"></Stack>
            <Stack gap="32px" direction="row">
              <Button
                h={50}
                bg="primary.500"
                color="white"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner />
                ) : (
                  __("Save and Active", "custom-code-snippets")
                )}
              </Button>
              <Button
                h={50}
                bg="primary.500"
                color="white"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner />
                ) : (
                  __("Save", "custom-code-snippets")
                )}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default AddNewForm;
