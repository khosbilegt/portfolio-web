import { Card, Text } from "@mantine/core";
import { useState } from "react";

function AboutCard({ height }: { height: string }) {
  const [isHovered, setHovered] = useState(false);

  return (
    <Card
      padding={"none"}
      radius={"lg"}
      style={{
        background: "#571C56",
        boxShadow: isHovered ? "0 0 10px 0 #ffcc33" : "none",
        transition: "200ms",
        height: height,
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
          background: "linear-gradient(-45deg, #571C56 80%, #25245D 0)",
        }}
      >
        About me
      </Text>
    </Card>
  );
}

export default AboutCard;
