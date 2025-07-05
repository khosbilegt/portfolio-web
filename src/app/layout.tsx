import Providers from "./providers";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import "@mantine/core/styles.css";
import "./index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <title>Koso.B - Portfolio</title>
        <meta name="description" content="Koso.B - Personal Portfolio" />
        <ColorSchemeScript />
      </head>
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
