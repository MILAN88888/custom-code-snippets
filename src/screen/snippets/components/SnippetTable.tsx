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
import React, { useEffect, useState } from "react";
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
import SnippetPagination from "./SnippetPagination";
import { SnippetParams } from "./../../../types/index";

const SnippetTable: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const currentDate = new Date();

  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )
    .toISOString()
    .split("T")[0];

  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  )
    .toISOString()
    .split("T")[0];
  const [params, setParams] = useState<SnippetParams>({
    searchByItem: "",
    startDate: startDate,
    endDate: endDate,
    offset: 1,
    limit: 10
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["snippets", params],
    queryFn: getSnippets
  });

  const statusMutation = useMutation({
    mutationFn: updateStatusSnippets,
    onSuccess: (res: any) => {
      if (res === false) {
        toast({
          title: __("Update failed!!", "custom-code-snippets"),
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
      queryClient.invalidateQueries({ queryKey: ["snippets", params] });
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
      queryClient.invalidateQueries({ queryKey: ["snippets", params] });
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

  const paginationProps = {
    params,
    setParams,
    totalPages: data ? Math.ceil(Number(data.total_count) / params.limit) : 10
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
      {isLoading ? (
        <Stack
          direction="row"
          height="300px"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="sm" />
        </Stack>
      ) : (
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
              {data.results && data.results.length > 0 ? (
                data.results.map((snippet: any, index: number) => (
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
      )}
      <Stack
        p={4}
        bg="white"
        borderRadius="md"
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
        direction="column"
        justifyItems="flex-end"
      >
        {data ? <SnippetPagination {...paginationProps} /> : ""}
      </Stack>
    </Stack>
  );
};

export default SnippetTable;
