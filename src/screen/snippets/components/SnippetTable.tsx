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
  useToast
} from "@chakra-ui/react";
import { __ } from "@wordpress/i18n";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSnippets, updateStatusSnippets } from "./../../../api/api";
import { RiDeleteBinFill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

const SnippetTable: React.FC = () => {
  const toast = useToast();
  type statusToggerProp = {
    id: number;
    active: string;
  };
  const params = {};
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["snippets", params],
    queryFn: getSnippets
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
        if (res["active"]) {
          toast({
            title: __("Activated successfully!!", "custom-code-snippets"),
            status: "success",
            duration: 3000,
            isClosable: true
          });
        } else {
          toast({
            title: __("Deactivated successfully!!", "custom-code-snippets"),
            status: "success",
            duration: 3000,
            isClosable: true
          });
        }
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

  const statusToggler = ({ id, active }: statusToggerProp) => {
    statusMutation.mutate({ id, active: active === "1" ? false : true });
  };

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
            {/* <Th>{__("Type", "custom-code-snippets")}</Th> */}
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
                        isChecked={snippet.active === "1" ? true : false}
                        onChange={() =>
                          statusToggler({
                            id: snippet.id,
                            active: snippet.active
                          })
                        }
                      />
                      <BiEdit style={{ fontSize: "16px" }} />
                      <RiDeleteBinFill style={{ fontSize: "16px" }} />
                    </Stack>
                  </Stack>
                </Td>
                {/* <Td>{snippet.type}</Td> */}
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
