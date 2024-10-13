import { Flex, Grid, Text } from "@mantine/core";
import SkillCard from "./cards/SkillCard";
import ProjectCard from "./cards/ProjectCard";
import ContactCard from "./cards/ContactCard";
import AboutCard from "./cards/AboutCard";
import useWindowDimensions from "../../hooks/useWindowDimensions";

function Home() {
  const { width } = useWindowDimensions();

  return (
    <Flex
      className="bg-animation"
      style={{
        background: "#25245D",
        zIndex: 0,
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        position: width < 1024 ? "relative" : "fixed",
      }}
    >
      <Flex
        justify={"center"}
        align={"center"}
        wrap={"wrap"}
        gap={"lg"}
        style={{
          width: "100%",
          height: "100%",
          zIndex: 1,
          marginTop: width < 1024 ? "36px" : "0",
        }}
      >
        <SkillCard
          minWidth={width < 576 ? "80%" : width < 900 ? "60%" : "400px"}
          maxWidth={width < 576 ? "80%" : width < 900 ? "60%" : "400px"}
          height="700px"
        />
        <Grid
          style={{
            height: width < 1024 ? "100%" : "700px",
            width: width < 576 ? "80%" : "60%",
            background: "#25245D",
            padding: "15px 0",
            paddingBottom: "50px",
          }}
        >
          <Grid.Col span={12} style={{ height: "100px", maxWidth: "2000px" }}>
            <Text
              style={{
                width: "100%",
                fontSize: "50px",
                textAlign: "center",
                color: "#fff",
                lineHeight: "1",
              }}
            >
              Portfolio
            </Text>
          </Grid.Col>
          <Grid.Col
            span={{
              base: 12,
              md: 6,
            }}
            style={{ height: "300px", maxWidth: "1000px" }}
          >
            <ProjectCard height="275px" />
          </Grid.Col>
          <Grid.Col
            span={{
              base: 12,
              md: 6,
            }}
            style={{ height: "300px", maxWidth: "1000px" }}
          >
            <ContactCard height="275px" />
          </Grid.Col>
          <Grid.Col
            offset={{
              base: 0,
              md: 0,
              lg: 2,
            }}
            span={{
              base: 12,
              md: 12,
              lg: 8,
            }}
            style={{
              maxWidth: "2000px",
            }}
          >
            <AboutCard
              height={width < 900 ? "400px" : "325px"}
              screenWidth={width}
            />
          </Grid.Col>
        </Grid>
      </Flex>
    </Flex>
  );
}

export default Home;
