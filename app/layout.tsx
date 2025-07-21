import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "@/lib/fonts";
import ThemeProvider from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Store.nvim - Neovim Plugin Directory",
  description:
    "Discover, explore, and install Neovim plugins effortlessly with Store.nvim — a clean, fast, and community-driven directory of plugins built for the modern Neovim ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider />
        {children}
      </body>
    </html>
  );
}
