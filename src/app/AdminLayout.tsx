import {
  Anchor,
  AppShell,
  Breadcrumbs,
  Flex,
  NavLink,
  Text,
} from "@mantine/core";
import { useParams } from "react-router";

const navbarItems = [
  { title: "Dashboard", href: "/admin" },
  { title: "Blocks", href: "/admin/block" },
  { title: "Pages", href: "/admin/page" },
];

function AdminLayout({
  breadcrumbItems,
  children,
}: {
  breadcrumbItems?: { title: string; href: string }[];
  children: React.ReactNode;
}) {
  const { id } = useParams();

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
      <AppShell.Main>
        <Breadcrumbs mb={10}>
          {breadcrumbItems?.map((item, index) => (
            <Anchor key={index} href={item.href}>
              {item.title}
            </Anchor>
          ))}
          {id && <Text>{id}</Text>}
        </Breadcrumbs>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

export default AdminLayout;
