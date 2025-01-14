import { MantineProvider } from "@mantine/core";
import App from "./App";

function Provider() {
  return (
    <MantineProvider>
      <App />
    </MantineProvider>
  );
}

export default Provider;
