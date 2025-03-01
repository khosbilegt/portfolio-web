import { AppShell, Flex, NavLink, Text } from "@mantine/core";

const navbarItems = [
  { title: "Dashboard", href: "/admin" },
  { title: "Blocks", href: "/admin/block" },
  { title: "Pages", href: "/admin/page" },
];

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      navbar={{ width: 200, breakpoint: "sm" }}
      header={{ height: "50px" }}
      padding="md"
    >
      <AppShell.Header>
        <Flex align="center" justify="center" h={"100%"}>
          <Text c={"dimmed"}>
            You are currently viewing this page as a guest. You do not have the
            permission to edit content.
          </Text>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p={5}>
        <Text fw="bold" fz={24} mx="xs">
          Admin Panel
        </Text>
        {navbarItems.map((item, index) => (
          <NavLink key={index} href={item.href} label={item.title} />
        ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default AdminLayout;
