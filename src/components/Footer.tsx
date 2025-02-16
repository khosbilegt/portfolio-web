"use client";

import {
  Alert,
  Anchor,
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  Image,
  Text,
} from "@mantine/core";
import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconBrandX,
  IconBrandYoutubeFilled,
  IconHeartHandshake,
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
    {links.map((link) => (
      <Anchor
        c="dimmed"
        className={classes.link}
        display="block"
        fz="sm"
        href={link.href}
        key={link.href}
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
            title="Blocks"
            links={[
              { title: "Banners", href: "#" },
              { title: "Features", href: "#" },
              { title: "Footers", href: "#" },
              { title: "Headers", href: "#" },
              { title: "Heros", href: "#" },
              { title: "Navbars", href: "#" },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 6, md: 3 }}>
          <LinkGroup
            title="Components"
            links={[
              { title: "Accordion", href: "#" },
              { title: "AutoScrollView", href: "#" },
              { title: "Carousel", href: "#" },
              { title: "Jumbo Title", href: "#" },
              { title: "Ratings", href: "#" },
              { title: "Stats", href: "#" },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 6, md: 3 }}>
          <LinkGroup
            title="Company"
            links={[
              { title: "About", href: "#" },
              { title: "Blog", href: "#" },
              { title: "Careers", href: "#" },
              { title: "Press", href: "#" },
              { title: "Privacy Policy", href: "#" },
              { title: "Terms of Service", href: "#" },
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
                href: "#",
              },
              {
                title: (
                  <Flex align="center" gap={4}>
                    <IconBrandLinkedinFilled size={16} /> LinkedIn
                  </Flex>
                ),
                href: "#",
              },
              {
                title: (
                  <Flex align="center" gap={4}>
                    <IconBrandX size={16} /> X
                  </Flex>
                ),
                href: "#",
              },
              {
                title: (
                  <Flex align="center" gap={4}>
                    <IconBrandYoutubeFilled size={16} /> YouTube
                  </Flex>
                ),
                href: "#",
              },
            ]}
          />
        </Grid.Col>
      </Grid>
      <Divider my="xl" />
      <Flex justify={{ sm: "space-between" }} wrap="wrap" gap="xl">
        <Box maw={{ sm: 300 }}>
          <Flex align="center">
            <Image
              component={"img"}
              src="/logo-light.png"
              width={138}
              height={23}
              alt="Titanium"
              darkHidden
            />
            <Image
              component={"img"}
              src="/logo-dark.png"
              width={138}
              height={23}
              alt="Titanium"
              lightHidden
            />
          </Flex>
          <Text mt="xs" size="xs" c="dimmed">
            © 2024 Titanium, Inc. All rights reserved.
          </Text>
        </Box>
        <Anchor component={"a"} href="#" maw={{ sm: 300 }} underline="never">
          <Alert bg="var(--mantine-color-body)" radius="md">
            <Flex gap="xs">
              <IconHeartHandshake
                color="var(--mantine-color-text)"
                size={24}
                style={{ flexShrink: 0 }}
              />
              <Text fz="sm">
                <strong>Join our affiliate program.</strong> Earn 30% commission
                on every sale.
              </Text>
            </Flex>
          </Alert>
        </Anchor>
      </Flex>
    </Container>
  </Container>
);
