import { Button, Card, Flex, Image, Stack, Text, Title } from "@mantine/core";
import { Astronaut } from "../../../assets/image";
import { useState } from "react";

const fontFamily = "IBM Plex Mono, monospace";

function AboutCard({ width, height }: { width: string; height: string }) {
  const [isHovered, setHovered] = useState(false);

  return (
    <Card
      className="card"
      radius={"lg"}
      padding={"none"}
      style={{
        display: "flex",
        alignItems: "center",
        background: "#159097",
        minHeight: height,
        height: height,
        minWidth: width,
        width: width,
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
          background: "linear-gradient(-45deg, #159097 70%, #571C56 0)",
          fontFamily: fontFamily,
        }}
      >
        About me
      </Text>
      <Stack justify="space-between" style={{ height: "90%", padding: "10px" }}>
        <Image
          style={{ height: "50%", aspectRatio: "1/1", borderRadius: "1000px" }}
          src={Astronaut}
        />
        <Stack align="flex-start" style={{ width: "100%", padding: "25px" }}>
          <Title order={3} style={{ fontFamily: fontFamily, color: "#fff" }}>
            Hi,
          </Title>
          <Title order={1} style={{ fontFamily: fontFamily, color: "#fff" }}>
            I'm Khosoo.
          </Title>
          <Text size="lg" style={{ color: "#fff" }}>
            I specialize in the research of obscure technologies and back-end
            services based on them.
          </Text>
        </Stack>
        <Flex justify={"flex-end"}>
          <Button
            style={{
              margin: "15px",
              width: "150px",
              background: "#25245D",
            }}
          >
            Read More
          </Button>
        </Flex>
      </Stack>
    </Card>
  );
}

export default AboutCard;
