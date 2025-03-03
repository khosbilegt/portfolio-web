import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Flex, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Tag } from "../../../types/types";
import { notifications } from "@mantine/notifications";
import PageContentEditor from "../components/PageContentEditor";

function PageEditor() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [tagDefinitions, setTagDefinitions] = useState<{ [key: string]: Tag }>(
    {}
  );
  const [tagSelectValue, setTagSelectValue] = useState<string | null>(null);
  const [tagOptions, setTagOptions] = useState<string[]>([]);

  const form = useForm({
    initialValues: {
      id: 0,
      key: "",
      name: "",
      title: "",
      subtitle: "",
      thumbnail: "",
      createDate: "",
      lastModifiedDate: "",
    },
  });

  const { data: pageData } = useQuery(["page_editor"], async () => {
    const response = await fetch(`${portfolioManagerURL}/api/page/${id}`);
    return response.json();
  });

  const { data: tagData } = useQuery(["tags"], async () => {
    const response = await fetch(`${portfolioManagerURL}/api/page/tags`);
    return response.json();
  });

  const { data: updatePageData, mutate: updatePage } = useMutation(
    ["update_page"],
    async (values: any) => {
      const response = await fetch(`${portfolioManagerURL}/api/page/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });
      return response
        .json()
        .then((data) => {
          notifications.show({
            title: "Success",
            message: "Page updated",
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
    }
  );

  const { data: addTagData, mutate: addTag } = useMutation(
    ["add_page_tag"],
    async (tagId: number) => {
      const response = await fetch(
        `${portfolioManagerURL}/api/page/${id}/tag/${tagId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
    }
  );

  const { data: removeTagData, mutate: removeTag } = useMutation(
    ["remove_page_tag"],
    async (tagId: number) => {
      const response = await fetch(
        `${portfolioManagerURL}/api/page/${id}/tag/${tagId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
    }
  );

  useEffect(() => {
    if (pageData) {
      form.setValues(pageData);
    }
  }, [pageData]);

  useEffect(() => {
    const tempTagOptions: string[] = [];
    const tempTagDefinitions: { [key: string]: Tag } = {};
    tagData?.map((tag: Tag) => {
      tempTagOptions.push(tag.name);
      tempTagDefinitions[tag.name] = tag;
    });
    setTagOptions(tempTagOptions);
    setTagDefinitions(tempTagDefinitions);
  }, [tagData]);

  useEffect(() => {
    queryClient.invalidateQueries(["page_editor"]);
  }, [removeTagData, addTagData, updatePageData]);

  return (
    <Stack>
      <Flex gap={50}>
        <form
          onSubmit={form.onSubmit((values) => {
            updatePage(values);
          })}
          style={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <TextInput label="Name" {...form.getInputProps("name")} />
          <TextInput label="Key" {...form.getInputProps("key")} />
          <TextInput label="Title" {...form.getInputProps("title")} />
          <TextInput label="Subtitle" {...form.getInputProps("subtitle")} />
          <TextInput label="Thumbnail" {...form.getInputProps("thumbnail")} />
          <Button type="submit">Save Content</Button>
        </form>
        <Stack maw={400} gap={10}>
          <Select
            label="Tags"
            searchable
            multiple
            data={tagOptions}
            value={tagSelectValue}
            onChange={(value: string | null) => {
              if (value) {
                const tag: Tag = tagDefinitions[value];
                setTagSelectValue(null);
                addTag(tag.id);
              }
            }}
          />
          <Flex gap={5} wrap={"wrap"}>
            {pageData?.tags?.map((tag: Tag, index: number) => {
              return (
                <Button
                  key={index}
                  onClick={() => removeTag(tag.id)}
                  size="compact-md"
                  variant="outline"
                >
                  {tag.name}
                </Button>
              );
            })}
          </Flex>
        </Stack>
      </Flex>
      <PageContentEditor pageId={pageData?.id} content={pageData?.contents} />
    </Stack>
  );
}

export default PageEditor;
