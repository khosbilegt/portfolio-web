import { Flex, Grid, Text } from "@mantine/core";
import AboutCard from "./cards/AboutCard";
import "./Home.css";

function Home() {
  return (
    <Flex
      className="bg-animation"
      style={{
        background: "#25245D",
        zIndex: 0,
      }}
    >
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="stars4"></div>
      <Flex
        justify={"center"}
        align={"center"}
        wrap={"wrap"}
        gap={"lg"}
        style={{
          padding: "2.5vw",
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <AboutCard width="400px" height="700px" />
        <Grid style={{ height: "700px" }}>
          <Grid.Col span={12} style={{ height: "100px" }}>
            <Text
              style={{
                fontSize: "50px",
                textAlign: "center",
                color: "#D3D3D3",
                lineHeight: "1",
              }}
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
    </Flex>
  );
}

export default Home;
