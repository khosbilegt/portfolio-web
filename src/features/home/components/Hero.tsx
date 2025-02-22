import { JumboTitle } from "../../../components/JumboTitle";
import { Badge, Button, Container, Flex, Stack, Text } from "@mantine/core";
import { motion } from "motion/react";
import classes from "./Hero.module.css";

export const Hero = () => (
  <Container
    bg="var(--mantine-color-body)"
    h={"90vh"}
    px={0}
    py={{
      base: "calc(var(--mantine-spacing-lg) * 4)",
      xs: "calc(var(--mantine-spacing-lg) * 5)",
      lg: "calc(var(--mantine-spacing-lg) * 6)",
    }}
    fluid
    style={{ display: "flex" }}
  >
    <Container size="md" px={0} style={{ alignSelf: "center" }}>
      <Stack align="center" gap="xs">
        <motion.div
          initial={{ opacity: 0.0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          <Badge variant="light" size="xl" mb="lg">
            Last updated: February 16, 2025
          </Badge>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <JumboTitle
            order={1}
            fz="lg"
            ta="center"
            style={{ textWrap: "balance" }}
            mb="sm"
          >
            Full-Stack Developer
          </JumboTitle>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <Text
            c="dimmed"
            fz="xl"
            ta="center"
            mb="xl"
            style={{ textWrap: "balance" }}
          >
            Delivering reliable and innovative solutions tailored to meet your
            unique needs. Empowering businesses with cutting-edge technology and
            exceptional service.
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <Flex gap={"md"}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                component={"a"}
                href="#"
                radius="xl"
                size="xl"
                className={classes.cta}
              >
                Browse
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                component={"a"}
                href="#"
                radius="xl"
                size="xl"
                variant="subtle"
              >
                About me
              </Button>
            </motion.div>
          </Flex>
        </motion.div>
      </Stack>
    </Container>
  </Container>
);
