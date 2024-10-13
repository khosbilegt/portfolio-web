import { Button, Card, Flex, List, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const projectCounter = [
  {
    type: "Completed",
    count: 5,
  },
  {
    type: "In Progress",
    count: 3,
  },
  {
    type: "Deferred",
    count: 3,
  },
];

function ProjectCard({ height }: { height: string }) {
  const navigate = useNavigate();
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
          background: "linear-gradient(-45deg, #F8D092 70%, #25245D 5px)",
        }}
      >
        Projects
      </Text>
      <Stack
        gap={5}
        style={{ height: "100%", padding: "15px" }}
        justify="space-between"
      >
        <Text>What have I made so far?</Text>
        <List style={{ padding: "15px" }}>
          {projectCounter.map((project) => (
            <List.Item key={project.type}>
              {project.type}: {project.count}
            </List.Item>
          ))}
        </List>
        <Flex justify={"flex-end"}>
          <Button
            style={{
              marginBottom: "15px",
              width: "150px",
              background: "#25245D",
            }}
            onClick={() => navigate("/projects")}
          >
            Read More
          </Button>
        </Flex>
      </Stack>
    </Card>
  );
}

export default ProjectCard;
