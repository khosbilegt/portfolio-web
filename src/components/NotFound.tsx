import { Button, Flex, Image, Stack, Text, Title } from "@mantine/core";
import { Moon } from "../assets/image";
import { useNavigate } from "react-router-dom";
import "./StarBackground.css";
import useWindowDimensions from "../hooks/useWindowDimensions";

function NotFound() {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  return (
    <Flex
      style={{
        top: "0",
        left: "0",
        position: "fixed",
        width: "100%",
        minWidth: "100vw",
        height: "100%",
        minHeight: "100vh",
        maxHeight: "100vw",
        background: "#25245D",
        color: "#fff",
      }}
      justify="flex-start"
      align="center"
    >
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      {width < 1024 && (
        <Stack
          style={{
            width: "100%",
            height: "100%",
            zIndex: 1,
            textAlign: "center",
            padding: "25px",
          }}
          align="center"
          justify="center"
        >
          <Text style={{ fontSize: "1rem" }}>Oh no,</Text>
          <Text style={{ fontSize: "1.2rem" }}>
            You're at the wrong coordinates!
          </Text>
          <Title order={1} style={{ fontSize: "10rem", color: "#F8D092" }}>
            404
          </Title>
          <Button
            size="xl"
            onClick={() => navigate("/")}
            style={{ minHeight: "50px" }}
          >
            Back to Earth
          </Button>
          <Image src={Moon} style={{ height: "40%" }} fit="contain" />
        </Stack>
      )}
      {width >= 1024 && (
        <Flex>
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
      )}
    </Flex>
  );
}

export default NotFound;
