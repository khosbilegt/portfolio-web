"use client";
import Prism from "prismjs";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-go";
import "prismjs/components/prism-markdown";
import { PageDefinition, Tag } from "@/app/types";
import { Button, Flex, Stack, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

function PageContent({ data }: { data: PageDefinition }) {
  const router = useRouter();

  return (
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
  );
}

export default PageContent;
