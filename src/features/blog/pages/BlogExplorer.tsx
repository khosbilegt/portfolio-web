import { Button, Chip, Flex, Input, Stack } from "@mantine/core";
import { PageDefinition } from "../types";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Tag } from "../../../types/types";
import { useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";
import { format } from "date-fns";
import { motion } from "motion/react";
import BlogList from "../components/BlogList";

export const BlogExplorer = ({ defaultTags }: { defaultTags: number[] }) => {
  const [searchText, setSearchText] = useState("");
  const [blogs, setBlogs] = useState<PageDefinition[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<PageDefinition[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>(defaultTags);
  const [tagLimitEnabled, setTagLimitEnabled] = useState(true);

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

  const renderTag = (tag: Tag, index: number) => {
    return (
      <motion.div
        initial={{ opacity: 0.0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.02 * index,
          ease: "easeInOut",
        }}
      >
        <Chip
          key={index}
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
      </motion.div>
    );
  };

  useEffect(() => {
    const tempTags: Tag[] = [];
    tagData?.map((tag: Tag) => {
      if (tag.type !== "system") {
        tempTags.push({
          id: tag.id,
          name: tag.name,
          type: tag.type,
        });
      }
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
        align={"center"}
      >
        {tags?.map((tag: Tag, index: number) => {
          if (tagLimitEnabled) {
            if (index < 5) {
              return renderTag(tag, index);
            }
          } else {
            return renderTag(tag, index);
          }
        })}
        {tags?.length > 5 && (
          <Button
            variant="transparent"
            onClick={() => setTagLimitEnabled(!tagLimitEnabled)}
          >
            See more
          </Button>
        )}
      </Flex>
      <BlogList blogs={filteredBlogs} />
    </Stack>
  );
};
