import {
  Stack,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Spinner,
  Center,
  Text,
  Button,
  Checkbox
} from "@chakra-ui/react";
import { __ } from "@wordpress/i18n";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSnippets } from "./../../../api/api";

const SnippetTable: React.FC = () => {
  const params = {};

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["snippets", params],
    queryFn: getSnippets
  });

  if (isLoading) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center>
        <Text color="red.500">
          {__("Failed to load snippets: ", "custom-code-snippets")}{" "}
          {error.message}
        </Text>
      </Center>
    );
  }
  console.log("data", data);

  return (
    <Stack>
      <Table>
        <Thead>
          <Tr>
            <Th><Checkbox name="select" value="all" /></Th>
            <Th>{__("Title", "custom-code-snippets")}</Th>
            <Th>{__("Type", "custom-code-snippets")}</Th>
            <Th>{__("Description", "custom-code-snippets")}</Th>
            <Th>{__("Tags", "custom-code-snippets")}</Th>
            <Th>{__("Date", "custom-code-snippets")}</Th>
            <Th>{__("Priority", "custom-code-snippets")}</Th>
            <Th>{__("Action", "custom-code-snippets")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data && data.length > 0 ? (
            data.map((snippet: any, index: number) => (
              <Tr key={index}>
                <Td><Checkbox data-id={data.id} /></Td>
                <Td>{snippet.title}</Td>
                <Td>{snippet.type}</Td>
                <Td>{snippet.description}</Td>
                <Td>{snippet.tags}</Td>
                <Td>{new Date(snippet.date).toLocaleDateString()}</Td>
                <Td>{snippet.priority}</Td>
                <Td>
                  <Button size="sm" colorScheme="blue">
                    {__("Edit", "custom-code-snippets")}
                  </Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={8}>
                <Center>
                  <Text>{__("No snippets found", "custom-code-snippets")}</Text>
                </Center>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Stack>
  );
};

export default SnippetTable;
