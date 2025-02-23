import {
  ActionIcon,
  Anchor,
  Burger,
  Button,
  Container,
  ContainerProps,
  Flex,
  Group,
  MantineBreakpoint,
  MantineRadius,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { IconArrowRight, IconMoon, IconSun } from "@tabler/icons-react";
import { motion } from "motion/react";
import classes from "./Header.module.css";
import { useNavigate } from "react-router";

export type HeaderLink = {
  label: string;
  href: string;
};

const HEADER_LINKS: HeaderLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/project" },
  { label: "Blog", href: "/blog" },
];

type Header01Props = ContainerProps & {
  logo?: React.ReactNode;
  links?: HeaderLink[];
  callToActionTitle?: string;
  callToActionUrl?: string;
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
  breakpoint?: MantineBreakpoint;
  radius?: MantineRadius | number;
};

function Header({
  style,
  breakpoint = "xs",
  logo = (
    <Text fw="bold" fz={24} mx="xs">
      Khosbilegt.B
    </Text>
  ),
  callToActionTitle = "Download CV",
  callToActionUrl = "#",
  links = HEADER_LINKS,
  onMenuToggle,
  isMenuOpen,
  h = 60,
  radius = 30,
  ...containerProps
}: Header01Props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const navigate = useNavigate();

  return (
    <Container
      className={classes.container}
      component="header"
      style={{ borderRadius: radius, ...style }}
      w={{ base: "100%", [breakpoint]: "fit-content" }}
      h={h}
      {...containerProps}
    >
      <Flex
        justify="space-between"
        align="center"
        h="100%"
        style={{ overflow: "hidden" }}
        gap="xs"
        wrap="nowrap"
      >
        <Group gap={0} style={{ flexShrink: 0 }}>
          <Burger
            size="sm"
            opened={isMenuOpen}
            onClick={onMenuToggle}
            hiddenFrom={breakpoint}
          />
          {logo}
        </Group>
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "fit-content", opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <Flex
            flex={1}
            justify="center"
            px="lg"
            h="100%"
            align="center"
            wrap="nowrap"
            visibleFrom={breakpoint}
            gap="lg"
            className={classes["link-container"]}
            style={{ overflow: "hidden" }}
          >
            {links.map((link) => (
              <Anchor
                key={link.href}
                className={classes.link}
                onClick={() => navigate(link.href)}
                td="none"
              >
                {link.label}
              </Anchor>
            ))}
            <ActionIcon variant="subtle" onClick={() => toggleColorScheme()}>
              {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
            </ActionIcon>
          </Flex>
        </motion.div>
        <Button
          onClick={() => navigate(callToActionUrl)}
          className={classes.cta}
          radius="xl"
          rightSection={<IconArrowRight size={16} />}
          style={{ flexShrink: 0 }}
        >
          {callToActionTitle}
        </Button>
      </Flex>
    </Container>
  );
}

export default Header;
