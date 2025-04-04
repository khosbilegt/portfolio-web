"use client";
import {
  Anchor,
  Badge,
  Box,
  Card,
  Group,
  Image,
  List,
  Stack,
  Text,
} from "@mantine/core";
import { motion } from "motion/react";

function OpenSourceCard({
  backgroundImageUrl,
  backgroundImageAlt,
  backgroundImageSizes,
  title,
  type,
  description,
  index = 0,
  details = [],
}: {
  backgroundImageUrl: string;
  backgroundImageAlt: string;
  backgroundImageSizes: string;
  title: string;
  type: string;
  description: string;
  index?: number;
  details?: any[];
}) {
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
        <Card radius="lg" p="xl">
          <Stack>
            <Box
              pos="relative"
              w="100%"
              style={{
                aspectRatio: "9/6",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                component={"img"}
                radius="lg"
                w={200}
                h={200}
                style={{ objectFit: "scale-down", objectPosition: "center" }}
                src={backgroundImageUrl}
                alt={backgroundImageAlt}
                sizes={backgroundImageSizes}
              />
            </Box>
            <Group mb="xs">
              <Badge variant="light">{type}</Badge>
            </Group>
            <Text fz="xl" fw="bold" style={{ textWrap: "balance" }} lh={1.3}>
              {title}
            </Text>
            <Text>{description}</Text>
            <List>
              {details.map((detail, index) => (
                <List.Item key={index}>
                  {detail?.description} Click{" "}
                  <Anchor href={detail?.url}>here</Anchor> for more.
                </List.Item>
              ))}
            </List>
          </Stack>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default OpenSourceCard;
