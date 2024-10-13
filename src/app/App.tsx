import { createTheme, MantineProvider } from "@mantine/core";
import "./App.css";
import "@mantine/core/styles.css";
import Router from "./Router";

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  );
}

export default App;
