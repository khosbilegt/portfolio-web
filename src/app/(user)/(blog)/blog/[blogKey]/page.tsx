"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { portfolioManagerURL } from "@/app/variables";
import { Button, Flex, Stack, Title } from "@mantine/core";
import Prism from "prismjs";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-go";
import "prismjs/components/prism-markdown";

import "./Blog.css";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Tag, PageDefinition } from "@/app/types";

function Blog() {
  const router = useRouter();
  const { blogKey } = useParams<{ blogKey: string }>();
  const queryClient = useQueryClient();

  const { data } = useQuery<PageDefinition>({
    queryKey: ["blog_by_key"],
    queryFn: async () => {
      const response = await fetch(
        `${portfolioManagerURL}/api/page/key/${blogKey}`
      );
      return response.json();
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["blog_by_key"] });
    Prism.highlightAll();
  }, [data]);

  return (
    <Flex justify={"center"}>
      <Stack maw={800} w={"80%"}>
        <Title order={1}>{data?.title}</Title>
        <Title order={3}>{data?.subtitle}</Title>
        {data && data?.tags?.length > 0 && (
          <Flex gap={5} wrap={"wrap"}>
            {data.tags.map((tag: Tag) => (
              <Button
                aria-label="Tag"
                key={tag.id}
                radius={20}
                onClick={() => {
                  router.push(`/project?tags=${tag.name}`);
                }}
              >
                {tag.name}
              </Button>
            ))}
          </Flex>
        )}
        {data && data.contents && (
          <div
            onLoad={() => Prism.highlightAll()}
            className="blog-viewer"
            dangerouslySetInnerHTML={{ __html: data.contents }}
          />
        )}
      </Stack>
    </Flex>
  );
}

export default Blog;
