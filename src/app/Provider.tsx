import { MantineProvider } from "@mantine/core";
import App from "./App";
import "@mantine/core/styles.css";

function Provider() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <App />
    </MantineProvider>
  );
}

export default Provider;
