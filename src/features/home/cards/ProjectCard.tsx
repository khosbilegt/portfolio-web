import { Button, Card, Flex, Image, Stack, Text } from "@mantine/core";
import { Cape } from "../../../assets/image";
import { useState } from "react";

function ProjectCard({ height }: { height: string }) {
  const [isHovered, setHovered] = useState(false);

  return (
    <Card
      padding={"none"}
      radius={"lg"}
      style={{
        background: "#F8D092",
        boxShadow: isHovered ? "0 0 10px 0 #ffcc33" : "none",
        transition: "200ms",
        height: height,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Text
        style={{
          paddingLeft: "5%",
          textAlign: "start",
          width: "100%",
          height: "25px",
          color: "#fff",
          background: "linear-gradient(-45deg, #F8D092 60%, #571C56 0)",
        }}
      >
        Projects
      </Text>
      <Stack
        gap={5}
        style={{ height: "100%", padding: "15px" }}
        justify="space-between"
      >
        <Flex
          align={"center"}
          justify={"space-around"}
          style={{ height: "75%" }}
        >
          <Image
            src={Cape}
            fit={"contain"}
            style={{ height: "100%", aspectRatio: "1/1" }}
          />
          <Stack>
            <Text>Completed: 5</Text>
            <Text>In Progress: 3</Text>
            <Text>Deferred: 3</Text>
          </Stack>
        </Flex>
        <Flex justify={"flex-end"}>
          <Button
            style={{
              marginBottom: "15px",
              width: "150px",
              background: "#25245D",
            }}
          >
            Read More
          </Button>
        </Flex>
      </Stack>
    </Card>
  );
}

export default ProjectCard;
