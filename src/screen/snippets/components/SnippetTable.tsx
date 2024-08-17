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
  Checkbox,
  Switch,
  useToast,
  Box
} from "@chakra-ui/react";
import { __ } from "@wordpress/i18n";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteSnippets,
  getSnippets,
  updateStatusSnippets
} from "./../../../api/api";
import { RiDeleteBinFill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import SnippetFilter from "./SnippetFilter";

const SnippetTable: React.FC = () => {
  const [params, setParams] = useState({
    searchByItem: "",
    startDate: "",
    endDate: ""
  });
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["snippets", params],
    queryFn: () => getSnippets(params),
    keepPreviousData: true // This keeps the previous data while the query is being re-fetched
  });

  const statusMutation = useMutation({
    mutationFn: updateStatusSnippets,
    onSuccess: (res: any) => {
      if (res === false) {
        toast({
          title: __("Update failed", "custom-code-snippets"),
          status: "error"
        });
      } else {
        toast({
          title: res.active
            ? __("Activated successfully!!", "custom-code-snippets")
            : __("Deactivated successfully!!", "custom-code-snippets"),
          status: "success",
          duration: 3000,
          isClosable: true
        });
      }
      queryClient.invalidateQueries(["snippets"]);
    },
    onError: (error) => {
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSnippets,
    onSuccess: (res: any) => {
      if (res === false) {
        toast({
          title: __("Deletion failed!!", "custom-code-snippets"),
          status: "error"
        });
      } else {
        toast({
          title: __("Deleted successfully!!", "custom-code-snippets"),
          status: "success",
          duration: 3000,
          isClosable: true
        });
      }
      queryClient.invalidateQueries(["snippets"]);
    },
    onError: (error) => {
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
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

  const statusToggler = ({ id, active }: { id: number; active: string }) => {
    statusMutation.mutate({ id, active: active === "1" ? false : true });
  };

  const deleteSnippet = (id: number) => {
    deleteMutation.mutate([id]);
  };

  const editSnippet = (id: number) => {
    navigate(`/snippet/edit/${id}`);
  };

  return (
    <Stack direction="column" gap="2px">
      <Stack
        p={4}
        bg="white"
        borderRadius="md"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      >
        <SnippetFilter params={params} setParams={setParams} />
      </Stack>
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
              <Th>{__("Description", "custom-code-snippets")}</Th>
              <Th>{__("Tags", "custom-code-snippets")}</Th>
              <Th>{__("Updated At", "custom-code-snippets")}</Th>
              <Th>{__("Priority", "custom-code-snippets")}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data && data.length > 0 ? (
              data.map((snippet: any, index: number) => (
                <Tr key={index}>
                  <Td width="50px">
                    <Checkbox data-id={snippet.id} />
                  </Td>
                  <Td>
                    <Stack direction="column">
                      <Text>{snippet.title}</Text>
                      <Stack direction="row" gap="24px">
                        <Switch
                          size="sm"
                          isChecked={snippet.active === "1"}
                          onChange={() =>
                            statusToggler({
                              id: snippet.id,
                              active: snippet.active
                            })
                          }
                        />
                        <BiEdit
                          onClick={() => editSnippet(snippet.id)}
                          cursor="pointer"
                          style={{ fontSize: "16px" }}
                        />
                        <RiDeleteBinFill
                          onClick={() => deleteSnippet(snippet.id)}
                          cursor="pointer"
                          style={{ fontSize: "16px" }}
                        />
                      </Stack>
                    </Stack>
                  </Td>
                  <Td>{snippet.description}</Td>
                  <Td>{snippet.tags}</Td>
                  <Td>{snippet.updated_at}</Td>
                  <Td>{snippet.priority}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={8}>
                  <Center>
                    <Text>
                      {__("No snippets found", "custom-code-snippets")}
                    </Text>
                  </Center>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Stack>
      <Stack
        p={4}
        bg="white"
        borderRadius="md"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      >
        <Box>pagination</Box>
      </Stack>
    </Stack>
  );
};

export default SnippetTable;
