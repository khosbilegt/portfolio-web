"use client";

import {
  ActionIcon,
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { portfolioManagerURL } from "@/app/variables";
import { useEffect } from "react";
import { HeaderLink } from "@/app/(user)/layout";
import { useRouter } from "next/navigation";

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
      Koso.B
    </Text>
  ),
  links = [],
  onMenuToggle,
  isMenuOpen,
  h = 60,
  radius = 30,
  ...containerProps
}: Header01Props) {
  const router = useRouter();
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
      queryClient.invalidateQueries({ queryKey: ["user_info_header"] });
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
            aria-label="Toggle navigation"
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
              <Button
                aria-label={`Navigate to ${link.label}`}
                variant="transparent"
                key={link.href}
                className={classes.link}
                onClick={() => router.push(link.href)}
                fw={400}
                size="md"
                p={0}
                td="none"
              >
                {link.label}
              </Button>
            ))}
            <ActionIcon variant="subtle" onClick={() => toggleColorScheme()}>
              {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
            </ActionIcon>
          </Flex>
        </motion.div>
        {data?.username ? (
          <Menu>
            <Menu.Target>
              <Button radius="xl" aria-label="Open user menu">
                {data.username}
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>User Actions</Menu.Label>
              <Menu.Item
                leftSection={<IconUser />}
                onClick={() => router.push("/admin")}
              >
                Admin ({data.role === "admin" ? "Admin" : "Guest"} Mode)
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                leftSection={<IconLogout />}
                color="red"
                onClick={() => {
                  localStorage.removeItem("token");
                  queryClient.invalidateQueries({
                    queryKey: ["user_info_header"],
                  });
                }}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Button
            aria-label="Login"
            onClick={() => router.push("/login")}
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
