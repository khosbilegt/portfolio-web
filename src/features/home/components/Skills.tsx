import { Anchor, Card, Flex, Grid, Stack, Text, Title } from "@mantine/core";

const data = [
  {
    name: "Front-End",
    items: [
      { name: "React", icon: "react" },
      { name: "Angular", icon: "angular", color: "red" },
      { name: "Ant Design", icon: "antdesign" },
      { name: "Mantine", icon: "mantine" },
      { name: "Flutter", icon: "flutter" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
    ],
  },
  {
    name: "Back-End",
    items: [
      { name: "Spring Boot", icon: "spring" },
      { name: "Quarkus", icon: "quarkus" },
      { name: "Django", icon: "python" },
      { name: "Nodejs", icon: "nodedotjs" },
      { name: "Go", icon: "go" },
      { name: "PostgreSQL", icon: "postgresql" },
    ],
  },
  {
    name: "DevOps",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Linux", icon: "linux" },
      { name: "Gitlab CI/CD", icon: "gitlab" },
      { name: "Prometheus", icon: "prometheus" },
      { name: "Grafana", icon: "grafana" },
    ],
  },
];

function Skills() {
  return (
    <Stack w={"60%"} align="center">
      <Flex w={"100%"} justify={"center"} gap={20} wrap={"wrap"}>
        {data.map((category, index) => {
          return (
            <Card
              key={index}
              w={{
                md: "300px",
                base: "100%",
              }}
            >
              <Stack align="center">
                <Title order={3}>{category?.name}</Title>
                <Grid>
                  {category?.items?.map((item, index) => (
                    <Grid.Col
                      key={index}
                      span={6}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={`https://cdn.simpleicons.org/${item?.icon}${
                          item?.color ? "/" + item?.color : ""
                        }`}
                        alt={item?.name}
                        width={40}
                        height={40}
                      />
                      <Text>{item?.name}</Text>
                    </Grid.Col>
                  ))}
                </Grid>
              </Stack>
            </Card>
          );
        })}
      </Flex>
      <Text>
        For details, visit my{" "}
        <Anchor href="http://roadmap.sh/">roadmap.sh</Anchor> profile:{" "}
        <Anchor href="https://roadmap.sh/u/khosbilegt">
          https://roadmap.sh/u/khosbilegt
        </Anchor>
      </Text>
    </Stack>
  );
}

export default Skills;
