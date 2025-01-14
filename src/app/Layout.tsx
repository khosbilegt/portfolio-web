import {
  AppShell,
  Burger,
  Flex,
  Stack,
  NavLink,
  Avatar,
  Text,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Blog from "../features/blog/Blog";
import Playground from "../features/playground/Playground";
import Home from "../features/dashboard/Home";
import { AvatarImage } from "../assets";

const pages = [
  {
    title: "About",
    name: "about",
    link: "/",
    children: [
      {
        title: "Education",
        hash: "education",
      },
      {
        title: "Experience",
        hash: "experience",
      },
    ],
  },
  {
    title: "Projects",
    name: "projects",
    link: "/projects",
  },
  {
    title: "Blog",
    name: "blog",
    link: "/blog",
  },
  {
    title: "Playground",
    name: "playground",
    link: "/playground",
  },
];

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [opened, { toggle }] = useDisclosure();

  const renderContent = (name: string) => {
    switch (name) {
      case "projects":
        return <Blog />;
      case "blog":
        return <Blog />;
      case "playground":
        return <Playground />;
      default:
        return <Home />;
    }
  };

  useEffect(() => {
    pages?.forEach((page, index) => {
      if (location.pathname?.startsWith(page?.link)) {
        setActiveIndex(index);
      }
    });
  }, [location.pathname]);

  return (
    <AppShell
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack gap={2} align="center">
          <Avatar src={AvatarImage} size={"xl"} />
          <Text>Khosbilegt.B</Text>
          <Text size="sm" c="gray.6">
            Software Developer
          </Text>
        </Stack>
        <Stack gap={0} mt={7}>
          {pages.map((page, index) =>
            page?.children === undefined || page?.children?.length === 0 ? (
              <NavLink
                key={index}
                href={page.link}
                label={page.title}
                style={{ borderRadius: 3 }}
                active={index === activeIndex}
              />
            ) : (
              <NavLink
                key={index}
                href={page.link}
                label={page.title}
                style={{ borderRadius: 3 }}
                active={index === activeIndex}
              >
                <Stack gap={3} mt={5}>
                  {page.children?.map((child, childIndex) => (
                    <Button
                      variant="light"
                      key={childIndex}
                      bg={"transparent"}
                      style={{ borderRadius: 3 }}
                      onClick={() => navigate(page.link + "#" + child.hash)}
                    >
                      {child.title}
                    </Button>
                  ))}
                </Stack>
              </NavLink>
            )
          )}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Flex>{renderContent(pages[activeIndex]?.name)}</Flex>
      </AppShell.Main>
    </AppShell>
  );
}

export default Layout;
