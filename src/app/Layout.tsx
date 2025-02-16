import { Stack } from "@mantine/core";
import Header from "../components/Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack w={"100vw"} justify="start" mt={0} style={{ padding: "5px" }}>
      <Header />
      {children}
    </Stack>
  );
}

export default Layout;
