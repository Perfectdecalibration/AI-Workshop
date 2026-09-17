import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tyler",
  description: "Tyler's personal site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
