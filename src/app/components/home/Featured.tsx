"use client";
import { useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "@/app/variables";
import { PageDefinition } from "@/app/types";
import { useEffect, useState } from "react";
import { Button, Flex, Stack } from "@mantine/core";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import BlogList from "../blog/BlogList";

function Featured() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<PageDefinition[]>([]);
  const { data } = useQuery({
    queryKey: ["featured"],
    queryFn: async () => {
      const response = await fetch(
        `${portfolioManagerURL}/api/page?tags=Featured`
      );
      return response.json();
    },
  });

  useEffect(() => {
    if (data) {
      const formattedData = data.map((blog: PageDefinition) => {
        return {
          ...blog,
          createDate: format(new Date(blog.createDate), "d MMMM, yyyy"),
          lastModifiedDate: format(new Date(blog.createDate), "d MMMM, yyyy"),
        };
      });
      setBlogs(formattedData);
    }
  }, [data]);

  return (
    <Stack
      w={{
        lg: "80%",
        md: "90%",
        base: "70%",
      }}
    >
      <BlogList blogs={blogs} />
      <Flex justify={"end"}>
        <Button
          w={200}
          onClick={() => {
            router.replace("/project");
          }}
        >
          See more
        </Button>
      </Flex>
    </Stack>
  );
}

export default Featured;
