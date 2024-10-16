import { Button, Card, Flex, Image, Stack, Text, Title } from "@mantine/core";
import { Flying } from "../../../assets/image";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

const fontFamily = "IBM Plex Mono, monospace";

function SkillCard({
  minWidth: minWidth,
  maxWidth: maxWidth,
}: {
  minWidth: string;
  maxWidth: string;
}) {
  const navigate = useNavigate();
  const [isHovered, setHovered] = useState(false);
  const { width: windowWidth } = useWindowDimensions();

  return (
    <Card
      radius={"lg"}
      padding={"none"}
      style={{
        background: "transparent",
        display: "flex",
        alignItems: "center",
        maxWidth: maxWidth,
        minWidth: minWidth,
        transition: "200ms",
        boxShadow: isHovered ? "0 0 10px 0 #ffcc33" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          width: "100%",
        }}
      >
        <Stack
          style={{
            background: "#159097",
          }}
        >
          <Text
            style={{
              paddingLeft: "5%",
              textAlign: "start",
              width: "100%",
              height: "25px",
              color: "#fff",
              background: "linear-gradient(-45deg, #159097 50%, #25245D 0)",
              fontFamily: fontFamily,
            }}
          >
            Skills
          </Text>
          <Stack
            justify="space-between"
            style={{ height: "90%", padding: "10px" }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, ease: "easeOut", duration: 4 }}
            >
              <Image
                fit="contain"
                style={{
                  height: "275px",
                  aspectRatio: "1/1",
                }}
                src={Flying}
                alt="Flying"
              />
            </motion.div>
            <Stack
              align="flex-start"
              style={{ width: "100%", padding: "25px" }}
            >
              <Title
                order={windowWidth < 596 ? 4 : 3}
                style={{ fontFamily: fontFamily, color: "#fff" }}
              >
                Hi,
              </Title>
              <Title
                order={windowWidth < 596 ? 2 : 1}
                style={{ fontFamily: fontFamily, color: "#fff" }}
              >
                I'm Khosoo.
              </Title>
              <Text size="md" style={{ color: "#fff" }}>
                I'm a Software Developer with over 3 years of experience.
              </Text>
              <Text size="md" style={{ color: "#fff" }}>
                I specialize in the research of obscure technologies and
                full-stack services based on them.
              </Text>
            </Stack>
            <Flex justify={"flex-end"} style={{ padding: "15px" }}>
              <Button
                style={{
                  width: "150px",
                  background: "#25245D",
                }}
                onClick={() => navigate("/skills")}
              >
                Read More
              </Button>
            </Flex>
          </Stack>
        </Stack>
      </motion.div>
    </Card>
  );
}

export default SkillCard;
