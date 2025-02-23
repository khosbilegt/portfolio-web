import { Stack } from "@mantine/core";
import { Footer } from "../components/Footer";
import { useDisclosure } from "@mantine/hooks";
import Header from "../components/Header";
import CallButton from "../features/call/CallButton";
import CallModal from "../features/call/CallModal";

function Layout({ children }: { children: React.ReactNode }) {
  const [isCallModalOpen, { open: openCallModal, close: closeCallModal }] =
    useDisclosure(false);

  return (
    <Stack w={"100%"} justify="start" mt={0} style={{ padding: "5px" }}>
      <Header />
      {children}
      {/* <CallButton open={openCallModal} /> */}
      <CallModal isOpen={isCallModalOpen} onClose={closeCallModal} />
      <Footer />
    </Stack>
  );
}

export default Layout;
