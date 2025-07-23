# Store.nvim

[![Tests](https://github.com/ragnarok22/nvim.store/actions/workflows/tests.yml/badge.svg)](https://github.com/ragnarok22/nvim.store/actions/workflows/tests.yml)

Store.nvim is a clean and community-driven directory of plugins for the modern Neovim ecosystem. The site is built with Next.js and provides a fast interface for discovering new tools, viewing plugin details, and navigating directly to their repositories.

You can use the same UI and all of the plugin information inside Neovim with the [`store.nvim`](https://github.com/alex-popov-tech/store.nvim) plugin. It mirrors the website so you can browse, search, and view descriptions without leaving your editor.

## Getting Started

To run the development server:

```shell
pnpm dev
```

This will start Next.js in development mode.

## Filtering repositories

Use the search box (click **Filter** or press `f` when Vim motions are enabled)
to filter the list. You can search by repository name or by topic using the
`topic:<name>` syntax. Combining filters works as expected, for example:

```shell
topic:lsp python
```

The above will show repositories tagged with `lsp` whose names include
`python`.

## Sorting repositories

Use the sort dropdown above the list to reorder results. The available options
are:

- **Most stars** – sort repositories by star count in descending order.
- **Recently updated** – sort repositories by their latest update date.

## Vim motions

You can move through the plugin list using **j** and **k** when Vim motions are
enabled. Toggle this option in the header; it is automatically disabled on
mobile devices. When Vim motions are disabled you can use the on-screen
controls instead of keyboard shortcuts.

## Keyboard shortcuts

When Vim motions are enabled you can use keyboard shortcuts. Press `?` to open a
cheat sheet with the following keys:

- `?` – open help
- `Escape` – close help
- `f` – toggle the filter input
- `I` – show installation instructions
- `j`/`k` – move down/up the repository list
