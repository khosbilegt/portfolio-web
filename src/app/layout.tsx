import Providers from "./providers";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";
// app/layout.js
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en" {...mantineHtmlProps}>
        <head>
          <title>Khosbilegt.B - Portfolio</title>
          <meta
            name="description"
            content="Khosbilegt.B - Personal Portfolio"
          />
          <ColorSchemeScript />
        </head>
        <body>{children}</body>
      </html>
    </Providers>
  );
}
