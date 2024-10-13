import { Flex, Grid, Text } from "@mantine/core";
import SkillCard from "./cards/SkillCard";
import "./Home.css";
import ProjectCard from "./cards/ProjectCard";
import ContactCard from "./cards/ContactCard";

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
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <SkillCard width="400px" height="700px" />
        <Grid style={{ height: "700px" }}>
          <Grid.Col span={12} style={{ height: "100px" }}>
            <Text
              style={{
                fontSize: "50px",
                textAlign: "center",
                color: "#fff",
                lineHeight: "1",
              }}
            >
              Portfolio
            </Text>
          </Grid.Col>
          <Grid.Col span={7} style={{ height: "300px" }}>
            <ProjectCard height="275px" />
          </Grid.Col>
          <Grid.Col span={5} style={{ height: "300px" }}>
            <ContactCard height="275px" />
          </Grid.Col>
          <Grid.Col span={6} style={{ background: "pink", height: "300px" }} />
          <Grid.Col span={6} style={{ background: "green", height: "300px" }} />
        </Grid>
      </Flex>
    </Flex>
  );
}

export default Home;
