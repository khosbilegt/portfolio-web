"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { portfolioManagerURL } from "@/app/variables";
import { useEffect, useState } from "react";
import {
  Modal,
  Stack,
  Table,
  TableData,
  TextInput,
  Button,
  Flex,
  Text,
  Pagination,
  Badge,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Tag } from "@/app/types";
import { notifications } from "@mantine/notifications";
import { IconPlus } from "@tabler/icons-react";

function TagTable() {
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
  const { data } = useQuery({
    queryKey: ["tag_table"],
    queryFn: async () => {
      const response = await fetch(`${portfolioManagerURL}/api/page/tags`);
      return response.json();
    },
  });

  const tagForm = useForm({
    initialValues: {
      id: -1,
      name: "",
      type: "",
      color: "",
    },
  });

  const { data: createData, mutate: createTag } = useMutation({
    mutationKey: ["create_tag"],
    mutationFn: async (values: any) => {
      const response = await fetch(`${portfolioManagerURL}/api/page/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });
      if (response && response.status > 299 && response.status < 200) {
        throw new Error(response.statusText);
      }
      return response
        .json()
        .then((data) => {
          notifications.show({
            title: "Success",
            message: "Tag created",
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

  const { data: updateData, mutate: updateTag } = useMutation({
    mutationKey: ["update_tag"],
    mutationFn: async (values: any) => {
      const response = await fetch(
        `${portfolioManagerURL}/api/page/tags/${values.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(values),
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
            message: "Tag updated",
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

  const { data: deleteData, mutate: deleteTag } = useMutation({
    mutationKey: ["delete_tag"],
    mutationFn: async (id: number) => {
      const response = await fetch(
        `${portfolioManagerURL}/api/page/tags/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 204) {
        return {
          id,
        };
      }
      if (response && response.status > 299 && response.status < 200) {
        throw new Error(response.statusText);
      }
      return response
        .json()
        .then((data) => {
          notifications.show({
            title: "Success",
            message: "Tag deleted",
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
    queryClient.invalidateQueries({ queryKey: ["tag_table"] });
    closeModal();
  }, [createData, deleteData, updateData]);

  useEffect(() => {
    setTotalPages(Math.ceil(data?.length / pageSize));
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const includedData = data?.slice(start, end);
    setTableData({
      head: ["ID", "Name", "Type", "Actions"],
      body: includedData?.map((tag: Tag) => [
        tag.id,
        tag.name,
        <Badge>{tag.type}</Badge>,
        <Flex gap={10}>
          <Button
            aria-label="Edit"
            size="compact-sm"
            onClick={() => {
              tagForm.setValues({
                id: tag.id,
                name: tag.name,
                type: tag.type,
                color: tag.color,
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
              tagForm.setValues({
                id: tag.id,
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
    <Stack align="center">
      <Modal
        opened={isModalOpen}
        onClose={closeModal}
        title={modalMode.toUpperCase()}
      >
        {modalMode === "delete" && (
          <Stack>
            <Text>
              Are you sure you want to delete this block? This action cannot be
              undone.
            </Text>
            <Flex justify={"end"}>
              <Button
                aria-label="Cancel"
                bg="red"
                onClick={() => {
                  deleteTag(tagForm.values.id);
                }}
              >
                Delete
              </Button>
            </Flex>
          </Stack>
        )}
        {(modalMode === "create" || modalMode === "edit") && (
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
            onSubmit={tagForm.onSubmit((values) => {
              if (modalMode === "edit") {
                updateTag(values);
              } else {
                createTag(values);
              }
            })}
          >
            <TextInput label="Name" {...tagForm.getInputProps("name")} />
            <TextInput label="Type" {...tagForm.getInputProps("type")} />
            <TextInput label="Color" {...tagForm.getInputProps("color")} />
            <Button type="submit" w={"100%"} mt={10} aria-label="Submit">
              Submit
            </Button>
          </form>
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

export default TagTable;
