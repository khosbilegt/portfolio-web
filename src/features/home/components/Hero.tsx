import { JumboTitle } from "../../../components/JumboTitle";
import {
  Badge,
  Button,
  Container,
  Flex,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { motion } from "motion/react";
import classes from "./Hero.module.css";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { portfolioManagerURL } from "../../../app/Variables";
import { Helmet } from "react-helmet";

export const Hero = () => {
  const navigate = useNavigate();
  const heroBlockId = 5;
  const cvBlockId = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["hero"],
    queryFn: async () => {
      const response = await fetch(
        `${portfolioManagerURL}/api/page/block/${heroBlockId}`
      );
      return response.json();
    },
  });

  const { data: cvData } = useQuery(["cv"], async () => {
    const response = await fetch(
      `${portfolioManagerURL}/api/page/block/${cvBlockId}`
    );
    return response.json();
  });

  return (
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
      <Helmet>
        <title>Khosbilegt.B - Portfolio</title>
        <meta name="description" content={data?.definition.blurb} />
      </Helmet>
      <Container size="md" px={0} style={{ alignSelf: "center" }}>
        <Stack align="center" gap="xs">
          <motion.div
            initial={{ opacity: 0.0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
          >
            <Badge variant="light" size="xl" mb="lg">
              Last updated: {data?.definition?.last_modified}
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
              {data?.definition?.title}
            </JumboTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            {isLoading ? (
              <Skeleton height={40} width="80%" />
            ) : (
              <Text fz="xl" ta="center" mb="xl" style={{ textWrap: "balance" }}>
                {data?.definition.blurb}
              </Text>
            )}
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
                  aria-label="Scroll to experiences"
                  radius="xl"
                  size="xl"
                  className={classes.cta}
                  onClick={() => navigate("#featured")}
                >
                  Browse
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button
                  aria-label="Download resume"
                  radius="xl"
                  size="xl"
                  variant="subtle"
                  onClick={() => {
                    window.open(cvData?.definition.url);
                  }}
                >
                  Download CV
                </Button>
              </motion.div>
            </Flex>
          </motion.div>
        </Stack>
      </Container>
    </Container>
  );
};
