import { useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";
import BlogList from "../../blog/components/BlogList";
import { useEffect, useState } from "react";
import { PageDefinition } from "../../../types/types";
import { Button, Flex, Stack } from "@mantine/core";
import { useNavigate } from "react-router";

function Featured() {
  const navigate = useNavigate();
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
      setBlogs(data);
    }
  }, [data]);

  return (
    <Stack>
      <BlogList blogs={blogs} />
      <Flex justify={"end"}>
        <Button
          w={200}
          onClick={() => {
            navigate("/project");
          }}
        >
          See more
        </Button>
      </Flex>
    </Stack>
  );
}

export default Featured;
