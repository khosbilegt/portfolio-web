import { Stack, Title } from "@mantine/core";
import { motion } from "motion/react";

function HomeCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <Stack gap={"md"} align="center">
        <Title>{title}</Title>
        {children}
      </Stack>
    </motion.div>
  );
}

export default HomeCard;
