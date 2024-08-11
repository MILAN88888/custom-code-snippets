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
  Checkbox,
  Switch
} from "@chakra-ui/react";
import { __ } from "@wordpress/i18n";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getSnippets } from "./../../../api/api";
import { RiDeleteBinFill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

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
    <Stack
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
    >
      <Table>
        <Thead>
          <Tr>
            <Th>
              <Checkbox name="select" value="all" />
            </Th>
            <Th>{__("Title", "custom-code-snippets")}</Th>
            <Th>{__("Type", "custom-code-snippets")}</Th>
            <Th>{__("Description", "custom-code-snippets")}</Th>
            <Th>{__("Tags", "custom-code-snippets")}</Th>
            <Th>{__("Date", "custom-code-snippets")}</Th>
            <Th>{__("Priority", "custom-code-snippets")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data && data.length > 0 ? (
            data.map((snippet: any, index: number) => (
              <Tr key={index}>
                <Td width="50px">
                  <Checkbox data-id={data.id} />
                </Td>
                <Td>
                  <Stack direction="column">
                    <Text>{snippet.title}</Text>
                    <Stack direction="row" gap="24px">
                      <Switch size="sm" />
                      <BiEdit style={{ fontSize: "16px" }} />
                      <RiDeleteBinFill style={{ fontSize: "16px" }} />
                    </Stack>
                  </Stack>
                </Td>
                <Td>{snippet.type}</Td>
                <Td>{snippet.description}</Td>
                <Td>{snippet.tags}</Td>
                <Td>{new Date(snippet.date).toLocaleDateString()}</Td>
                <Td>{snippet.priority}</Td>
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
