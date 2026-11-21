import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Mi CRM", template: "%s | Mi CRM" },
  description: "CRM inteligente del bootcamp Full Stack + IA",
  openGraph: {
    title: "Mi CRM",
    description: "CRM inteligente del bootcamp Full Stack + IA",
    type: "website",
    locale: "es_PE",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
