import { AnchorCardDefinition } from "../features/blog/types";
import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { useNavigate } from "react-router";
import { Tag } from "../types/types";
import { motion } from "motion/react";
import classes from "./AnchorCard.module.css";

function AnchorCard({
  title,
  subtitle,
  thumbnail,
  href,
  href_type,
  tags,
  create_date,
  index = 1,
}: AnchorCardDefinition & { index?: number }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 * index, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "var(--mantine-shadow-xl)" }}
        transition={{ type: "spring" }}
        style={{ borderRadius: "var(--mantine-radius-lg)" }}
      >
        <Card
          radius="lg"
          p="xl"
          className={classes["anchor-card"]}
          onClick={() => {
            if (href_type === "internal") {
              navigate(href);
            } else {
              window.open(href, "_blank");
            }
          }}
        >
          <Stack>
            <Box pos="relative" w="100%" style={{ aspectRatio: "9/6" }}>
              <Image
                component={"img"}
                radius="lg"
                src={thumbnail}
                alt={title + " thumbnail"}
              />
            </Box>
            <Group mb="xs">
              <Flex wrap={"wrap"} gap={5} w={"100%"}>
                {tags?.map((tag: Tag, index) => (
                  <Button key={index} size="compact-sm">
                    {tag.name}
                  </Button>
                ))}
              </Flex>
              <Text fz="sm" c="dimmed">
                {create_date}
              </Text>
            </Group>
            <Text fz="xl" fw="bold" style={{ textWrap: "balance" }} lh={1.3}>
              {title}
            </Text>
            <Text>{subtitle}</Text>
          </Stack>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default AnchorCard;
