import { MantineProvider } from "@mantine/core";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";

function Provider() {
  const queryClient = new QueryClient();

  return (
    <MantineProvider defaultColorScheme="dark">
      <Notifications />
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default Provider;
