import { AppShell, Burger, Flex, Stack, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const pages = [
  {
    title: "About",
    link: "/",
  },
  {
    title: "Projects",
    link: "/projects",
  },
  {
    title: "Blog",
    link: "/blog",
  },
  {
    title: "Playground",
    link: "/playground",
  },
];

function Dashboard() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [opened, { toggle }] = useDisclosure();

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
        <Stack gap={0}>
          {pages.map((page, index) => (
            <NavLink
              key={index}
              href={page.link}
              label={page.title}
              style={{ borderRadius: 3 }}
              rightSection={
                <IconChevronRight
                  size="0.8rem"
                  stroke={1.5}
                  className="mantine-rotate-rtl"
                />
              }
              variant="filled"
              active={index === activeIndex}
            />
          ))}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Flex></Flex>
      </AppShell.Main>
    </AppShell>
  );
}

export default Dashboard;
