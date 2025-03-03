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
  Menu,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconArrowRight,
  IconLogout,
  IconMoon,
  IconSun,
  IconUser,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import classes from "./Header.module.css";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { portfolioManagerURL } from "../app/Variables";
import { useEffect } from "react";

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
  links = HEADER_LINKS,
  onMenuToggle,
  isMenuOpen,
  h = 60,
  radius = 30,
  ...containerProps
}: Header01Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const { data } = useQuery({
    queryKey: ["user_info_header"],
    queryFn: async () => {
      const token: string | null = localStorage.getItem("token");
      if (token && token?.length > 0) {
        const response = await fetch(`${portfolioManagerURL}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.json();
      } else {
        return {};
      }
    },
  });

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      queryClient.invalidateQueries(["user_info_header"]);
    }
  }, [data]);

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
        {data?.username ? (
          <Menu>
            <Menu.Target>
              <Button radius="xl">{data.username}</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>User Actions</Menu.Label>
              <Menu.Item
                leftSection={<IconUser />}
                onClick={() => navigate("/admin")}
              >
                Admin ({data.role === "admin" ? "Admin" : "Guest"} Mode)
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                leftSection={<IconLogout />}
                color="red"
                onClick={() => {
                  localStorage.removeItem("token");
                  queryClient.invalidateQueries(["user_info_header"]);
                }}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Button
            onClick={() => navigate("/user")}
            className={classes.cta}
            radius="xl"
            rightSection={<IconArrowRight size={16} />}
            style={{ flexShrink: 0 }}
          >
            Login
          </Button>
        )}
      </Flex>
    </Container>
  );
}

export default Header;
