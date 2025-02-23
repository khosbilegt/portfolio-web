import { Chip, Flex, Input, Stack } from "@mantine/core";
import { BlogDefinition } from "../types";
import BlogList from "../components/BlogList";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Tag } from "../../../types/types";
import { useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";

export const BlogExplorer = () => {
  const [searchText, setSearchText] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const { data: tagData } = useQuery(["tags"], async () => {
    const response = await fetch(`${portfolioManagerURL}/api/page/tags`);
    return response.json();
  });

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
    console.log(selectedTags);
  }, [selectedTags]);

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
                    return prev.filter((id) => id !== tag.id);
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
      <BlogList blogs={BLOGS} />
    </Stack>
  );
};

const BLOGS: BlogDefinition[] = [
  {
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1455612693675-112974d4880b?q=80&w=900&h=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundImageAlt: "",
    title: "Smart Home Features Buyers Want Now",
    tag: "Market",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    publishedAt: "Dec 4th, 2024",
  },
  {
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?q=80&w=900&h=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundImageAlt: "",
    title: "Luxury Market: Beyond the Basics",
    tag: "Investing",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    publishedAt: "Nov 25th, 2024",
  },
  {
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1445699269025-bcc2c8f3faee?q=80&w=900&h=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundImageAlt: "",
    title: "First-Time Buyer's Guide to Mortgages",
    tag: "Tips",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    publishedAt: "Nov 19th, 2024",
  },
  {
    backgroundImageUrl:
      "https://images.unsplash.com/photo-1445699269025-bcc2c8f3faee?q=80&w=900&h=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    backgroundImageAlt: "",
    title: "First-Time Buyer's Guide to Mortgages",
    tag: "Tips",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    publishedAt: "Nov 19th, 2024",
  },
] as const;
