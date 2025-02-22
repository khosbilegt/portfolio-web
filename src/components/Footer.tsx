"use client";

import { Anchor, Box, Container, Flex, Grid, Text } from "@mantine/core";
import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconBrandYoutubeFilled,
} from "@tabler/icons-react";
import type { ReactNode } from "react";
import classes from "./Footer.module.css";

type LinkItem = {
  title: ReactNode;
  href: string;
};

type LinkGroupItem = {
  title: string;
  links: LinkItem[];
};

const LinkGroup = ({ title, links }: LinkGroupItem) => (
  <Box>
    <Text fw="bold">{title}</Text>
    {links.map((link, index) => (
      <Anchor
        c="dimmed"
        className={classes.link}
        display="block"
        fz="sm"
        href={link.href}
        key={index}
        py={4}
        underline="never"
      >
        {link.title}
      </Anchor>
    ))}
  </Box>
);

export const Footer = () => (
  <Container component="footer" className={classes.container} fluid w={"100%"}>
    <Container
      size="xl"
      px={0}
      py={{
        base: "xl",
        sm: "calc(var(--mantine-spacing-xl) * 2)",
      }}
    >
      <Grid>
        <Grid.Col span={{ base: 6, md: 3 }}>
          <LinkGroup
            title="Home"
            links={[
              { title: "Hero", href: "/#hero" },
              { title: "Experience", href: "/#experience" },
              { title: "Education", href: "/#education" },
              { title: "Certification", href: "/#certificate" },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 6, md: 3 }}>
          <LinkGroup
            title="Navigation"
            links={[
              { title: "Home", href: "/" },
              { title: "Projects", href: "/project" },
              { title: "Blog", href: "/blog" },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 6, md: 3 }}>
          <LinkGroup
            title="Social"
            links={[
              {
                title: (
                  <Flex align="center" gap={4}>
                    <IconBrandGithubFilled size={16} /> Github
                  </Flex>
                ),
                href: "https://github.com/khosbilegt/",
              },
              {
                title: (
                  <Flex align="center" gap={4}>
                    <IconBrandLinkedinFilled size={16} /> LinkedIn
                  </Flex>
                ),
                href: "https://www.linkedin.com/in/khosbilegt-bilegsaikhan-82929424b/",
              },
              {
                title: (
                  <Flex align="center" gap={4}>
                    <IconBrandYoutubeFilled size={16} /> YouTube
                  </Flex>
                ),
                href: "https://www.youtube.com/@khosbilegtbilegsaikhan7542",
              },
            ]}
          />
        </Grid.Col>
      </Grid>
      <Flex justify={{ sm: "space-between" }} wrap="wrap" gap="xl">
        <Box maw={{ sm: 300 }}>
          <Text mt="xs" size="xs" c="dimmed">
            © 2025 Khosbilegt.B All rights reserved.
          </Text>
        </Box>
      </Flex>
    </Container>
  </Container>
);
