import { Button, Card, Flex, Image, Stack, Text, Title } from "@mantine/core";
import { Flying } from "../../../assets/image";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const fontFamily = "IBM Plex Mono, monospace";

function SkillCard({ width, height }: { width: string; height: string }) {
  const navigate = useNavigate();
  const [isHovered, setHovered] = useState(false);

  return (
    <Card
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
        transition: "200ms",
        boxShadow: isHovered ? "0 0 10px 0 #ffcc33" : "none",
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
          background: "linear-gradient(-45deg, #159097 70%, #25245D 0)",
          fontFamily: fontFamily,
        }}
      >
        Skills
      </Text>
      <Stack justify="space-between" style={{ height: "90%", padding: "10px" }}>
        <Image
          style={{ height: "50%", aspectRatio: "1/1", borderRadius: "1000px" }}
          src={Flying}
        />
        <Stack align="flex-start" style={{ width: "100%", padding: "25px" }}>
          <Title order={3} style={{ fontFamily: fontFamily, color: "#fff" }}>
            Hi,
          </Title>
          <Title order={1} style={{ fontFamily: fontFamily, color: "#fff" }}>
            I'm Khosoo.
          </Title>
          <Text size="lg" style={{ color: "#fff" }}>
            I specialize in the research of obscure technologies and full-stack
            services based on them.
          </Text>
        </Stack>
        <Flex justify={"flex-end"}>
          <Button
            style={{
              marginBottom: "15px",
              width: "150px",
              background: "#25245D",
            }}
            onClick={() => navigate("/skills")}
          >
            Read More
          </Button>
        </Flex>
      </Stack>
    </Card>
  );
}

export default SkillCard;
