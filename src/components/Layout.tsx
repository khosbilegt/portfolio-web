import { Stack } from "@mantine/core";
import Navbar from "./Navbar";
import useWindowDimensions from "../hooks/useWindowDimensions";
import "./StarBackground.css";

function Layout({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();

  return (
    <Stack
      style={{
        zIndex: 0,
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        background: "#25245D",
        position: width < 1024 ? "relative" : "fixed",
      }}
      gap={0}
    >
      <Navbar />
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      {children}
    </Stack>
  );
}

export default Layout;
