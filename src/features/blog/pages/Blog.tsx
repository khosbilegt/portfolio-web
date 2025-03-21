import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { portfolioManagerURL } from "../../../app/Variables";
import { Button, Flex, Stack, Title } from "@mantine/core";
import { PageDefinition } from "../../../types/types";
import Prism from "prismjs";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-go";
import "prismjs/components/prism-markdown";

import "./Blog.css";
import { useEffect } from "react";

function Blog() {
  const navigate = useNavigate();
  const { key } = useParams<{ key: string }>();

  const { data } = useQuery<PageDefinition>(["blog_by_key"], async () => {
    const response = await fetch(`${portfolioManagerURL}/api/page/key/${key}`);
    return response.json();
  });

  useEffect(() => {
    Prism.highlightAll();
  }, [data]);

  return (
    <Flex justify={"center"}>
      <Stack maw={800} w={"80%"}>
        <Title order={1}>{data?.title}</Title>
        <Title order={3}>{data?.subtitle}</Title>
        {data && data?.tags?.length > 0 && (
          <Flex gap={5} wrap={"wrap"}>
            {data.tags.map((tag) => (
              <Button
                aria-label="Tag"
                key={tag.id}
                radius={20}
                onClick={() => {
                  navigate(`/project?tags=${tag.name}`);
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
