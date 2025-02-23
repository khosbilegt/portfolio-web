import { Chip, Flex, Input, Stack } from "@mantine/core";
import { PageDefinition } from "../types";
import BlogList from "../components/BlogList";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Tag } from "../../../types/types";
import { useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";
import { format } from "date-fns";

export const BlogExplorer = ({ defaultTags }: { defaultTags: number[] }) => {
  const [searchText, setSearchText] = useState("");
  const [blogs, setBlogs] = useState<PageDefinition[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<PageDefinition[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>(defaultTags);

  const { data: tagData } = useQuery(["tags"], async () => {
    const response = await fetch(`${portfolioManagerURL}/api/page/tags`);
    return response.json();
  });

  const { data: blogData } = useQuery(["blogs"], async () => {
    const response = await fetch(`${portfolioManagerURL}/api/page`);
    return response.json();
  });

  const conductSearch = () => {
    const filteredBySearch = blogs.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(searchText.toLowerCase()) ||
        blog.subtitle.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    const filteredByTags = filteredBySearch.filter((blog) => {
      return selectedTags.every((tagId) =>
        blog.tags.some((tag) => tag.id === tagId)
      );
    });
    setFilteredBlogs(filteredByTags);
  };

  useEffect(() => {
    const tempTags = tagData?.map((tag: Tag) => {
      return {
        id: tag.id,
        name: tag.name,
      };
    });
    setTags(tempTags);
  }, [tagData]);

  useEffect(() => {
    conductSearch();
  }, [selectedTags, searchText, blogs]);

  useEffect(() => {
    const tempBlogs: PageDefinition[] = [];
    blogData?.forEach((blog: PageDefinition) => {
      const tempBlog: PageDefinition = {
        id: blog.id,
        key: blog.key,
        name: blog.name,
        title: blog.title,
        subtitle: blog.subtitle,
        thumbnail: blog.thumbnail,
        createDate: format(new Date(blog.createDate), "d MMMM, yyyy"),
        lastModifiedDate: format(
          new Date(blog.lastModifiedDate),
          "d MMMM, yyyy"
        ),
        tags: blog.tags,
        contents: [],
      };
      tempBlogs.push(tempBlog);
    });
    setBlogs(tempBlogs);
    setFilteredBlogs(tempBlogs);
  }, [blogData]);

  return (
    <Stack align="center">
      <Stack w={{ base: "100%", md: "40%" }}>
        <Input
          w={"100%"}
          placeholder="Search"
          leftSection={<IconSearch size={15} />}
          value={searchText}
          onChange={(e) => setSearchText(e.currentTarget.value)}
        />
      </Stack>
      <Flex
        w={{ base: "100%", md: "40%" }}
        wrap={"wrap"}
        gap={5}
        rowGap={10}
        justify={"center"}
      >
        {tags?.map((tag: Tag) => {
          return (
            <Chip
              key={tag.id}
              onClick={() => {
                setSelectedTags((prev) => {
                  if (prev.includes(tag.id)) {
                    if (defaultTags.includes(tag.id)) {
                      return prev;
                    } else {
                      return prev.filter((id) => id !== tag.id);
                    }
                  } else {
                    return [...prev, tag.id];
                  }
                });
              }}
            >
              {tag.name}
            </Chip>
          );
        })}
      </Flex>
      <BlogList blogs={filteredBlogs} />
    </Stack>
  );
};
