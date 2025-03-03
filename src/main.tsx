import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
import Provider from "./app/Provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider />
  </StrictMode>
);
