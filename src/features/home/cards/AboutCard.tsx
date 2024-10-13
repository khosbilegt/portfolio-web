import { Card, Image, Text } from "@mantine/core";
import React from "react";

function AboutCard({ style }: { style: React.CSSProperties }) {
  return (
    <Card
      radius={"lg"}
      padding={"none"}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        background: "#85A3A5",
      }}
    >
      <Text
        style={{
          paddingLeft: "30px",
          textAlign: "start",
          width: "100%",
          height: "25px",
          background: "linear-gradient(-45deg, #85A3A5 70%, #fff 0)",
        }}
      >
        About me
      </Text>
      <Image
        style={{ width: "75%", aspectRatio: "1/1", borderRadius: "1000px" }}
        src={
          "https://media.istockphoto.com/id/871752462/vector/default-gray-placeholder-man.jpg?s=612x612&w=0&k=20&c=4aUt99MQYO4dyo-rPImH2kszYe1EcuROC6f2iMQmn8o="
        }
      />
    </Card>
  );
}

export default AboutCard;
