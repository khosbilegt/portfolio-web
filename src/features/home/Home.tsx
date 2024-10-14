import { Flex, Grid, Notification, Text } from "@mantine/core";
import SkillCard from "./cards/SkillCard";
import ProjectCard from "./cards/ProjectCard";
import ContactCard from "./cards/ContactCard";
import AboutCard from "./cards/AboutCard";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useState } from "react";
import { motion } from "framer-motion";

function Home() {
  const { width } = useWindowDimensions();
  const [isAttributionVisible, setAttributionVisible] = useState(true);

  return (
    <Flex gap={0}>
      <Flex
        justify={"center"}
        align={"center"}
        wrap={"wrap"}
        gap={"lg"}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          zIndex: 1,
          marginTop: width < 1024 ? "36px" : "-80px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SkillCard
            minWidth={width < 576 ? "80%" : width < 900 ? "60%" : "400px"}
            maxWidth={width < 576 ? "80%" : width < 900 ? "60%" : "400px"}
            height="700px"
          />
        </motion.div>
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
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
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
            </motion.div>
          </Grid.Col>
          <Grid.Col
            span={{
              base: 12,
              md: 6,
            }}
            style={{ height: "300px", maxWidth: "1000px" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <ProjectCard height="275px" />
            </motion.div>
          </Grid.Col>
          <Grid.Col
            span={{
              base: 12,
              md: 6,
            }}
            style={{ height: "300px", maxWidth: "1000px" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.25, ease: "easeOut" }}
            >
              <ContactCard height="275px" />
            </motion.div>
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
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <AboutCard height={"325px"} screenWidth={width} />
            </motion.div>
          </Grid.Col>
        </Grid>
      </Flex>
      <Notification
        title="Attribution"
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          transition: "200ms",
          zIndex: isAttributionVisible ? 2 : -1,
          opacity: isAttributionVisible ? 1 : 0,
        }}
        onClose={() => setAttributionVisible(false)}
      >
        The astronaut pictures you see are from{" "}
        <span>
          <a href="https://www.freepik.com/">freepik.com</a>
        </span>{" "}
        artist{" "}
        <span>
          <a href="https://www.freepik.com/author/catalyststuff">
            @catalyststuff
          </a>
        </span>
        .
      </Notification>
    </Flex>
  );
}

export default Home;
