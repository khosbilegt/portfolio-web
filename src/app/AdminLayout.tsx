import { AppShell } from "@mantine/core";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default AdminLayout;
