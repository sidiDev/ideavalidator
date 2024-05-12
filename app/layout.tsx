import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Provider from "@/components/Provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Idea validator - How to validate your startup idea",
  description:
    "How To Test Your Business and Product Ideas and make quick, painless, and informed judgments about your idea so that you know whether it's worth pursuing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
