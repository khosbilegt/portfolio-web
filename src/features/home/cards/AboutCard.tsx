import { Card, Flex, Image, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { Eating } from "../../../assets/image";
import "./AboutCard.css";

const lines = [
  {
    text: "Hello there!",
  },
  {
    text: "I'm a gamer, amateur author, fan of all Trading Card & Tabletop Games, metal enthusiast and a foodie.",
  },
  {
    text: "You can read my blogs & vlogs ",
    url: "/blog",
  },
];

function AboutCard({
  height,
  screenWidth,
}: {
  height: string;
  screenWidth: number;
}) {
  const [isHovered, setHovered] = useState(false);

  return (
    <Card
      padding={"none"}
      radius={"lg"}
      style={{
        background: "#571C56",
        boxShadow: isHovered ? "0 0 10px 0 #ffcc33" : "none",
        transition: "200ms",
        minHeight: height,
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
          background: "linear-gradient(-45deg, #571C56 50%, #25245D 0)",
        }}
      >
        About me
      </Text>
      <Flex justify={"center"}>
        <Image
          src={Eating}
          fit={"contain"}
          style={{
            width: screenWidth < 1024 ? "50%" : "40%",
          }}
        />
        <Stack className="speech-bubble" style={{ width: "60%" }}>
          {lines.map((line, index) => (
            <Text
              key={index}
              style={{ color: "#fff" }}
              size={screenWidth < 596 ? "xs" : "md"}
            >
              {line.text}
              {line.url && (
                <span>
                  <a href={line.url}>here.</a>
                </span>
              )}
            </Text>
          ))}
        </Stack>
      </Flex>
    </Card>
  );
}

export default AboutCard;
