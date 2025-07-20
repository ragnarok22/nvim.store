import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Store.nvim",
    short_name: "Store.nvim",
    description:
      "Discover, explore, and install Neovim plugins effortlessly with Store.nvim — a clean, fast, and community-driven directory of plugins built for the modern Neovim ecosystem.",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
