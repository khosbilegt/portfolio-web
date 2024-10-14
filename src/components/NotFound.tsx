import { Button, Flex, Image, Stack, Text, Title } from "@mantine/core";
import { Moon } from "../assets/image";
import { useNavigate } from "react-router-dom";
import "./StarBackground.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Flex
      style={{
        top: "0",
        left: "0",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        background: "#25245D",
        color: "#fff",
      }}
      justify="flex-start"
      align="center"
    >
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <Stack
        style={{ width: "50%", height: "100%", zIndex: 1 }}
        align="center"
        justify="center"
      >
        <Text>Oh no,</Text>
        <Text style={{ fontSize: "1.5rem" }}>
          You're at the wrong coordinates!
        </Text>
        <Title order={1} style={{ fontSize: "15rem", color: "#F8D092" }}>
          404
        </Title>
        <Button onClick={() => navigate("/")}>Back to Earth</Button>
      </Stack>
      <Stack
        style={{ width: "50%", height: "100%", zIndex: 1 }}
        justify="center"
        align="center"
      >
        <Image src={Moon} style={{ width: "70%" }} />
      </Stack>
    </Flex>
  );
}

export default NotFound;
