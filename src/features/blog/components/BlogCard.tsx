import { Badge, Box, Card, Group, Image, Stack, Text } from "@mantine/core";
import { motion } from "motion/react";
import classes from "./BlogCard.module.css";
import { useNavigate } from "react-router";
import { BlogDefinition } from "../types";

const BlogCard = ({
  backgroundImageUrl,
  backgroundImageAlt,
  backgroundImageSizes,
  title,
  tag,
  description,
  publishedAt,
  index = 1,
}: BlogDefinition & {
  index?: number;
}) => {
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
          className={classes["blog-card"]}
          onClick={() => navigate(`/blog/${title}`)}
        >
          <Stack>
            <Box pos="relative" w="100%" style={{ aspectRatio: "9/6" }}>
              <Image
                component={"img"}
                radius="lg"
                src={backgroundImageUrl}
                alt={backgroundImageAlt}
                sizes={backgroundImageSizes}
              />
            </Box>
            <Group mb="xs">
              <Badge variant="light">{tag}</Badge>
              <Text fz="sm" c="dimmed">
                {publishedAt}
              </Text>
            </Group>
            <Text fz="xl" fw="bold" style={{ textWrap: "balance" }} lh={1.3}>
              {title}
            </Text>
            <Text>{description}</Text>
          </Stack>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default BlogCard;
