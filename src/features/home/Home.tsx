import { Flex, Grid } from "@mantine/core";
import AboutCard from "./cards/AboutCard";

function Home() {
  return (
    <Flex style={{ height: "100vh", width: "100vw", background: "grey" }}>
      <AboutCard style={{ width: "50%" }} />
      <Grid style={{ width: "50%", height: "100%" }}>
        <Grid.Col span={12} style={{ background: "green", height: "100px" }} />
        <Grid.Col span={8} style={{ background: "blue", height: "400px" }} />
        <Grid.Col span={4} style={{ background: "red", height: "400px" }} />
        <Grid.Col span={6} style={{ background: "pink", height: "400px" }} />
        <Grid.Col span={6} style={{ background: "green", height: "400px" }} />
      </Grid>
    </Flex>
  );
}

export default Home;
