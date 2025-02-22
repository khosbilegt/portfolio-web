import { MantineProvider } from "@mantine/core";
import App from "./App";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Provider() {
  const queryClient = new QueryClient();

  return (
    <MantineProvider defaultColorScheme="dark">
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default Provider;
