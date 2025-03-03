import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";
import { useEffect, useState } from "react";
import {
  ActionIcon,
  Button,
  Flex,
  Modal,
  Pagination,
  Stack,
  Table,
  TableData,
  Text,
  TextInput,
} from "@mantine/core";
import { PageDefinition } from "../../../types/types";
import { useNavigate } from "react-router";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

function PageTable() {
  const pageSize = 10;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tableData, setTableData] = useState<TableData>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalMode, setModalMode] = useState<"create" | "delete">("create");
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const pageForm = useForm({
    mode: "controlled",
    initialValues: {
      id: -1,
      key: "",
      name: "",
      title: "",
      subtitle: "",
      thumbnail: "",
      createDate: "",
      lastModifiedDate: "",
      tags: [],
      contents: [],
    },
  });

  const { data: pageData } = useQuery(["page_table"], async () => {
    const response = await fetch(`${portfolioManagerURL}/api/page`);
    return response.json();
  });

  const {
    data: createPageData,
    mutate: createPage,
    isError: isCreateError,
    error: createError,
  } = useMutation(["create_page"], async (values: PageDefinition) => {
    const response = await fetch(`${portfolioManagerURL}/api/page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(values),
    });
    if (response.status < 200 && response.status >= 300) {
      throw new Error(response.statusText);
    }
    return response.json();
  });

  const {
    data: deleteData,
    mutate: deletePage,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation(async (id: number) => {
    const response = await fetch(`${portfolioManagerURL}/api/page/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status < 200 && response.status >= 300) {
      throw new Error(response.statusText);
    }
    if (response.status === 204) {
      return { id };
    }
    return response.json();
  });

  useEffect(() => {
    queryClient.invalidateQueries(["page_table"]);
    closeModal();
  }, [createPageData, deleteData]);

  useEffect(() => {
    if (isCreateError) {
      notifications.show({
        title: "Error",
        message: createError ? createError.toString() : "An error occurred",
        color: "red",
      });
    }
    if (isDeleteError) {
      notifications.show({
        title: "Error",
        message: deleteError ? deleteError.toString() : "An error occurred",
        color: "red",
      });
    }
  }, [isCreateError, createError, isDeleteError, deleteError]);

  useEffect(() => {
    setTotalPages(Math.ceil(pageData?.length / pageSize));
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const includedData = pageData?.slice(start, end);
    setTableData({
      head: ["ID", "Name", "Key", "Title", "Actions"],
      body: includedData?.map((pageDefinition: PageDefinition) => [
        pageDefinition.id,
        pageDefinition.name,
        pageDefinition.key,
        pageDefinition.title,
        <Flex gap={10}>
          <Button
            size="compact-sm"
            onClick={() => {
              navigate(`/admin/page/${pageDefinition.id}`);
            }}
          >
            Edit
          </Button>
          <Button
            size="compact-sm"
            bg={"red"}
            onClick={() => {
              pageForm.setValues({
                id: pageDefinition.id,
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
  }, [pageData, page, pageSize]);

  return (
    <Stack justify="center" align="center">
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
                bg="red"
                onClick={() => {
                  deletePage(pageForm.values.id);
                }}
              >
                Delete
              </Button>
            </Flex>
          </Stack>
        )}
        {modalMode === "create" && (
          <form
            onSubmit={pageForm.onSubmit((values) => {
              createPage(values);
            })}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <TextInput label="Name" {...pageForm.getInputProps("name")} />
            <TextInput label="Key" {...pageForm.getInputProps("key")} />
            <TextInput label="Title" {...pageForm.getInputProps("title")} />
            <TextInput
              label="Subtitle"
              {...pageForm.getInputProps("subtitle")}
            />
            <Button type="submit" w={"100%"} mt={10}>
              Submit
            </Button>
          </form>
        )}
      </Modal>
      <Flex w={"100%"} justify={"flex-end"}>
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

export default PageTable;
