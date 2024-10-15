import {
  Button,
  Card,
  Flex,
  Stack,
  Text,
  Timeline,
  Title,
} from "@mantine/core";

const experience = [
  {
    name: "Digital Solutions LLC",
    position: "Game Developer",
    duration: "June 2022 - November 2022",
    description:
      "I spent 6 months at a start-up Game Development company with a focus on Web3.0 and VR Technologies, working on Mongolia's 1st Metaverse and have implemented multiple features.",
    projects: [
      {
        title: "Media Streaming",
        blurb:
          "Implemented a Media Streaming tool that is synchronized across all instances of a multiplayer game with over 5,000 users.",
      },
    ],
  },
  {
    name: "Unitel LLC",
    position: "Full-Stack Developer",
    duration: "May 2023 - Present",
  },
];

function Skills() {
  return (
    <Stack style={{ width: "100%" }} align="center">
      <Card
        padding={"none"}
        radius={"lg"}
        style={{
          background: "#159097",
          transition: "200ms",
          width: "60%",
          color: "#fff",
          padding: "15px",
        }}
      >
        <Title order={1} style={{ textAlign: "center", width: "100%" }}>
          Skills
        </Title>
        <Stack style={{ width: "100%" }} align="center">
          <Title order={3}>Professional Experience</Title>
          <Timeline style={{ width: "60%" }}>
            {experience.map((exp) => (
              <Timeline.Item
                key={exp.name}
                title={exp.name}
                style={{ color: "#fff" }}
              >
                <Text size="lg" style={{ color: "#fff" }}>
                  {exp?.position}
                </Text>
                <Text size="md" style={{ color: "#bbbbbb" }}>
                  {exp?.duration}
                </Text>
                <Text>{exp?.description}</Text>
                <Flex style={{ padding: "15px" }}>
                  {exp?.projects?.map((project) => (
                    <Card
                      style={{
                        maxWidth: "300px",
                        background: "#25245D",
                        color: "#aaaaaa",
                      }}
                      padding={"sm"}
                    >
                      <Text size="md">{project?.title}</Text>
                      <Text size="sm">{project?.blurb}</Text>
                      <Button style={{ background: "transparent" }}>
                        See more
                      </Button>
                    </Card>
                  ))}
                </Flex>
              </Timeline.Item>
            ))}
          </Timeline>
        </Stack>
      </Card>
    </Stack>
  );
}

export default Skills;
