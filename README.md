# Store.nvim

[![Tests](https://github.com/ragnarok22/nvim.store/actions/workflows/tests.yml/badge.svg)](https://github.com/ragnarok22/nvim.store/actions/workflows/tests.yml)

Store.nvim is a clean and community-driven directory of plugins for the modern Neovim ecosystem. The site is built with Next.js and provides a fast interface for discovering new tools, viewing plugin details, and navigating directly to their repositories.

You can use the same UI and all of the plugin information inside Neovim with the [`store.nvim`](https://github.com/alex-popov-tech/store.nvim) plugin. It mirrors the website so you can browse, search, and view descriptions without leaving your editor.

## Getting Started

To run the development server:

```bash
pnpm dev
```

This will start Next.js in development mode.

## Filtering repositories

Use the search box (press `f` to toggle) to filter the list. You can search by
repository name or by topic using the `topic:<name>` syntax. Combining filters
works as expected, for example:

```bash
topic:lsp python
```

The above will show repositories tagged with `lsp` whose names include
`python`.
