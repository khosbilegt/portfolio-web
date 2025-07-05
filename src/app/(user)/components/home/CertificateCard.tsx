"use client";

import { Badge, Box, Card, Group, Image, Stack, Text } from "@mantine/core";
import { motion } from "motion/react";

function CertificateCard({
  backgroundImageUrl,
  backgroundImageAlt,
  backgroundImageSizes,
  title,
  tag,
  description,
  publishedAt,
  url,
  index = 1,
}: {
  backgroundImageUrl: string;
  backgroundImageAlt: string;
  backgroundImageSizes: string;
  title: string;
  tag: string;
  url: string;
  description: string;
  publishedAt: string;
  index?: number;
}) {
  return (
    <motion.div
      style={{height: "100%"}}
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 * index, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: "var(--mantine-shadow-xl)" }}
        transition={{ type: "spring" }}
        style={{ borderRadius: "var(--mantine-radius-lg)", height: "100%" }}
      >
        <Card radius="lg" p="xl" onClick={() => window.open(url)} h={"100%"} >
          <Box
            h={"100%"}
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
            <Badge variant="light">{tag}</Badge>
            <Text fz="sm" c="dimmed">
              {publishedAt}
            </Text>
          </Group>
          <Text fz="xl" fw="bold" style={{ textWrap: "balance" }} lh={1.3}>
            {title}
          </Text>
          <Text>{description}</Text>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default CertificateCard;
