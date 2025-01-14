import { MantineProvider } from "@mantine/core";
import App from "./App";
import "@mantine/core/styles.css";

function Provider() {
  return (
    <MantineProvider>
      <App />
    </MantineProvider>
  );
}

export default Provider;
