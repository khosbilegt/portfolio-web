import { useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";
import {
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
import { Block } from "../../../types/types";
import { useDisclosure } from "@mantine/hooks";

function BlockTable() {
  const pageSize = 10;
  const [definition, setDefinition] = useState<string>("");
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [tableData, setTableData] = useState<TableData>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditOpen, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [isDeleteOpen, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  const { data } = useQuery(["block"], async () => {
    const response = await fetch(`${portfolioManagerURL}/api/page/block`);
    return response.json();
  });

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
            size="compact-sm"
            onClick={() => {
              setSelectedBlock(block);
              console.log(block);
              try {
                setDefinition(JSON.stringify(block.definition));
              } catch (error) {
                console.error(error);
                setDefinition("");
              }
              openEdit();
            }}
          >
            Edit
          </Button>
          <Button
            size="compact-sm"
            bg={"red"}
            onClick={() => {
              setSelectedBlock(block);
              try {
                setDefinition(JSON.stringify(block.definition));
              } catch (error) {
                console.error(error);
                setDefinition("");
              }
              openDelete();
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
      <Modal opened={isEditOpen} onClose={closeEdit} title="Edit">
        <Stack>
          <TextInput
            label="Name"
            value={selectedBlock?.name}
            onChange={(e) =>
              setSelectedBlock({
                ...selectedBlock,
                name: e.currentTarget.value,
                id: selectedBlock?.id ?? 0,
                definition: selectedBlock?.definition ?? {},
              })
            }
          />
          <JsonInput
            label="Definition"
            validationError="Invalid JSON"
            value={definition}
            onChange={(e) => setDefinition(e)}
            autosize
            formatOnBlur
            minRows={4}
          />
          <Button>Edit</Button>
        </Stack>
      </Modal>
      <Modal opened={isDeleteOpen} onClose={closeDelete} title="Delete">
        <Text>
          Are you sure you want to delete this block? This action cannot be
          undone.
        </Text>
        <Flex justify={"end"}>
          <Button bg="red">Delete</Button>
        </Flex>
      </Modal>
      <Table data={tableData} striped />
      <Pagination total={totalPages} onChange={(e) => setPage(e)} />
    </Stack>
  );
}

export default BlockTable;
