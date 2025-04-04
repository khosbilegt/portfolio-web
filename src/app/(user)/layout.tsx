"use client";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Stack } from "@mantine/core";
import Sidebar from "./components/generic/Sidebar";
import Header from "./components/generic/Header";
import { Footer } from "./components/generic/Footer";

export type HeaderLink = {
  label: string;
  href: string;
};

const HEADER_LINKS: HeaderLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/project" },
  { label: "Blog", href: "/blog" },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, { open: openMenu, close: closeMenu }] =
    useDisclosure(false);

  return (
    <Stack w={"100%"} justify="start" mt={0} style={{ padding: "5px" }}>
      <Header onMenuToggle={() => openMenu()} links={HEADER_LINKS} />
      <Drawer
        size={"60%"}
        opened={isMenuOpen}
        onClose={closeMenu}
        title={"Menu"}
        children={<Sidebar links={HEADER_LINKS} />}
      />
      {children}
      <Footer />
    </Stack>
  );
}
