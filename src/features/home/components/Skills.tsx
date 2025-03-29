import { Anchor, Card, Flex, Grid, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";

function Skills() {
  const skillsBlockId = 13;

  const { data } = useQuery({
    queryKey: ["hats"],
    queryFn: async () => {
      const response = await fetch(
        `${portfolioManagerURL}/api/page/block/${skillsBlockId}`
      );
      return response.json();
    },
  });

  return (
    <Stack w={"60%"} align="center">
      <Flex w={"100%"} justify={"center"} gap={20} wrap={"wrap"}>
        {data?.definition?.data?.map((category: any, index: number) => {
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
                  {category?.items?.map((item: any, index: number) => (
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
