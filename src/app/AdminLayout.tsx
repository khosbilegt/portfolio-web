import {
  Anchor,
  AppShell,
  Breadcrumbs,
  Button,
  Flex,
  NavLink,
  Stack,
  Text,
} from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { portfolioManagerURL } from "./Variables";
import { useEffect } from "react";

const navbarItems = [
  { title: "Dashboard", href: "/admin" },
  { title: "Tags", href: "/admin/tag" },
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["user_info_admin"],
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
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  }, [data]);

  return (
    <AppShell
      navbar={{ width: 200, breakpoint: "sm" }}
      header={{ height: "50px" }}
      padding="md"
    >
      <AppShell.Header>
        <Flex align="center" justify="center" h={"100%"}>
          <Text c={"dimmed"}>
            {data?.role === "admin"
              ? ""
              : "You are currently viewing this page as a guest. You do not have the permission to edit content."}
          </Text>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p={5}>
        <Stack justify="space-between" align="center" h={"100%"}>
          <Stack w={"100%"} gap={5}>
            {navbarItems.map((item, index) => (
              <NavLink key={index} href={item.href} label={item.title} />
            ))}
          </Stack>
          <Stack p={10}>
            <Button variant="outline" onClick={() => navigate("/")}>
              Return to User View
            </Button>
            <Button
              variant="outline"
              color="red"
              onClick={() => {
                localStorage.removeItem("token");
                queryClient.invalidateQueries(["user_info_admin"]);
              }}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
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
