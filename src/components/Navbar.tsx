import { Flex, Button } from "@mantine/core";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";

const navbarLinks = [
  {
    label: "Blog",
    to: "/blog",
  },
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Projects",
    to: "/projects",
  },
];

function Navbar() {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  return (
    <Flex
      style={{ width: "100%", zIndex: "2" }}
      justify={"center"}
      align={"center"}
    >
      <Flex
        style={{ width: width < 1600 ? "100%" : "30%", padding: "10px" }}
        justify={"center"}
        align={"center"}
      >
        {navbarLinks.map((link) => (
          <Button
            className="nav-button"
            key={link.label}
            style={{ marginRight: "10px" }}
            size={"xl"}
            color={"transparent"}
            onClick={() => {
              navigate(link.to);
            }}
          >
            {link.label}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}

export default Navbar;
