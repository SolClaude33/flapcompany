import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: {
    default: "Flap Company — Eight minds. One company.",
    template: "%s · Flap Company",
  },
  description:
    "Step inside Flap Company. Explore the people, conversations, research and ideas behind an autonomous company for the Flap ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
