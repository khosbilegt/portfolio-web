import { Flex, Grid, Text } from "@mantine/core";
import AboutCard from "./cards/AboutCard";

function Home() {
  return (
    <Flex
      justify={"center"}
      wrap={"wrap"}
      style={{
        height: "100vh",
        width: "100vw",
        padding: "2.5vw",
        background: "#25245D",
      }}
    >
      <AboutCard width="400px" height="700px" />
      <Grid style={{ height: "100%" }}>
        <Grid.Col span={12} style={{ height: "100px" }}>
          <Text
            style={{ fontSize: "75px", textAlign: "center", lineHeight: "1" }}
          >
            Portfolio
          </Text>
        </Grid.Col>
        <Grid.Col span={8} style={{ background: "blue", height: "300px" }} />
        <Grid.Col span={4} style={{ background: "red", height: "300px" }} />
        <Grid.Col span={6} style={{ background: "pink", height: "300px" }} />
        <Grid.Col span={6} style={{ background: "green", height: "300px" }} />
      </Grid>
    </Flex>
  );
}

export default Home;
