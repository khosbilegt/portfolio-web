"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { portfolioManagerURL } from "@/app/variables";
import {
  ActionIcon,
  Button,
  Flex,
  JsonInput,
  Modal,
  Pagination,
  Stack,
  Table,
  TableData,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Block } from "@/app/types";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

function BlockTable() {
  const pageSize = 10;
  const queryClient = useQueryClient();
  const [tableData, setTableData] = useState<TableData>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "delete">(
    "edit"
  );

  const blockForm = useForm({
    mode: "controlled",
    initialValues: {
      id: -1,
      name: "",
      definition: "",
    },
    validate: {
      definition: (value: any) => {
        try {
          JSON.parse(value);
        } catch (e) {
          return "Invalid JSON";
        }
      },
    },
  });

  const { data } = useQuery({
    queryKey: ["block"],
    queryFn: async () => {
      const response = await fetch(`${portfolioManagerURL}/api/page/block`);
      return response.json();
    },
  });

  const { data: createBlockData, mutate: createBlock } = useMutation({
    mutationKey: ["create_block"],
    mutationFn: async (values: any) => {
      const payload: any = {
        name: values.name,
        definition: JSON.parse(values.definition),
      };
      const response = await fetch(`${portfolioManagerURL}/api/page/block`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response && response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response
        .json()
        .then((data) => {
          notifications.show({
            title: "Success",
            message: "Block created",
            color: "green",
          });
          return data;
        })
        .catch((error) => {
          notifications.show({
            title: "Error",
            message: error.toString(),
            color: "red",
          });
        });
    },
  });

  const { data: deleteBlockData, mutate: deleteBlock } = useMutation({
    mutationKey: ["delete_block"],
    mutationFn: async (id: number) => {
      const response = await fetch(
        `${portfolioManagerURL}/api/page/block/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response && response.status > 299 && response.status < 200) {
        throw new Error(response.statusText);
      }
      if (response.status === 204) {
        return { id };
      }
      return response
        .json()
        .then((data) => {
          notifications.show({
            title: "Success",
            message: "Block deleted",
            color: "green",
          });
          return data;
        })
        .catch((error) => {
          notifications.show({
            title: "Error",
            message: error.toString(),
            color: "red",
          });
        });
    },
  });

  const { data: editBlockData, mutate: editBlock } = useMutation({
    mutationKey: ["edit_block"],
    mutationFn: async (values: any) => {
      const payload: any = {
        name: values.name,
        definition: JSON.parse(values.definition),
      };
      const response = await fetch(
        `${portfolioManagerURL}/api/page/block/${values.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response && response.status > 299 && response.status < 200) {
        throw new Error(response.statusText);
      }
      return response
        .json()
        .then((data) => {
          notifications.show({
            title: "Success",
            message: "Block updated",
            color: "green",
          });
          return data;
        })
        .catch((error) => {
          notifications.show({
            title: "Error",
            message: error.toString(),
            color: "red",
          });
        });
    },
  });

  useEffect(() => {
    closeModal();
    queryClient.invalidateQueries({ queryKey: ["block"] });
  }, [createBlockData, deleteBlockData, editBlockData]);

  useEffect(() => {
    setTotalPages(Math.ceil(data?.length / pageSize));
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const includedData = data?.slice(start, end);
    setTableData({
      head: ["ID", "Name", "Actions"],
      body: includedData?.map((block: Block) => [
        block.id,
        block.name,
        <Flex gap={10}>
          <Button
            aria-label="Edit"
            size="compact-sm"
            onClick={() => {
              blockForm.setValues({
                id: block.id,
                name: block.name,
                definition: JSON.stringify(block.definition, null, 2),
              });
              setModalMode("edit");
              openModal();
            }}
          >
            Edit
          </Button>
          <Button
            aria-label="Delete"
            size="compact-sm"
            bg={"red"}
            onClick={() => {
              blockForm.setValues({
                id: block.id,
              });
              setModalMode("delete");
              openModal();
            }}
          >
            Delete
          </Button>
        </Flex>,
      ]),
    });
  }, [data, page, pageSize]);

  return (
    <Stack justify="center" align="center">
      <Modal
        opened={isModalOpen}
        onClose={closeModal}
        title={modalMode.toUpperCase()}
      >
        {(modalMode === "edit" || modalMode === "create") && (
          <form
            onSubmit={blockForm.onSubmit((values) => {
              if (modalMode === "edit") {
                editBlock(values);
              } else {
                createBlock(values);
              }
            })}
          >
            <TextInput label="Name" {...blockForm.getInputProps("name")} />
            <JsonInput
              minRows={4}
              formatOnBlur
              autosize
              label="Definition"
              {...blockForm.getInputProps("definition")}
            />
            <Button type="submit" w={"100%"} mt={10} aria-label="Submit">
              Submit
            </Button>
          </form>
        )}
        {modalMode === "delete" && (
          <Stack>
            <Text>
              Are you sure you want to delete this block? This action cannot be
              undone.
            </Text>
            <Flex justify={"end"}>
              <Button
                aria-label="Delete"
                bg="red"
                onClick={() => {
                  deleteBlock(blockForm.values.id);
                }}
              >
                Delete
              </Button>
            </Flex>
          </Stack>
        )}
      </Modal>
      <Flex justify={"end"} w={"100%"}>
        <ActionIcon
          onClick={() => {
            setModalMode("create");
            openModal();
          }}
        >
          <IconPlus />
        </ActionIcon>
      </Flex>
      <Table data={tableData} striped />
      <Pagination total={totalPages} onChange={(e) => setPage(e)} />
    </Stack>
  );
}

export default BlockTable;
