"use client";

import { Stack, Title } from "@mantine/core";
import { motion } from "motion/react";
import { forwardRef } from "react";

const HomeCard = forwardRef<
  HTMLDivElement,
  { title: string; sectionId: string; children: React.ReactNode }
>(({ title, sectionId, children }, ref) => {
  return (
    <section id={sectionId}>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <Stack gap={"md"} align="center" ref={ref}>
          <Title>{title}</Title>
          {children}
        </Stack>
      </motion.div>
    </section>
  );
});

export default HomeCard;
