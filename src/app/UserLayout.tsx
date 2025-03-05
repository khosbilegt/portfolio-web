import { Drawer, Stack } from "@mantine/core";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import { useDisclosure } from "@mantine/hooks";
import Sidebar from "../components/Sidebar";
// import CallButton from "../features/call/CallButton";

export type HeaderLink = {
  label: string;
  href: string;
};

const HEADER_LINKS: HeaderLink[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/project" },
  { label: "Blog", href: "/blog" },
];

function UserLayout({ children }: { children: React.ReactNode }) {
  // const [isCallModalOpen, { open: openCallModal, close: closeCallModal }] =
  // useDisclosure(false);
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
      {/* <CallButton open={openCallModal} /> */}
      {/* <CallModal isOpen={isCallModalOpen} onClose={closeCallModal} /> */}
      <Footer />
    </Stack>
  );
}

export default UserLayout;
