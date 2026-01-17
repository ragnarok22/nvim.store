# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Store.nvim is a Next.js web application that serves as a community-driven directory of Neovim plugins. It fetches plugin data from an external JSON source and provides a browsable interface with filtering, sorting, and vim-style keyboard navigation.

## Development Commands

```bash
pnpm dev           # Start dev server with Turbopack
pnpm build         # Production build
pnpm lint          # Run ESLint
pnpm format        # Format with Prettier
pnpm test          # Run tests with Vitest
pnpm coverage      # Run tests with coverage
```

## Architecture

### Data Flow

- `lib/api.ts` - Fetches plugin data from external gist, normalizes counts (handles "1.2k", "5M" formats) and timestamps. Uses Next.js fetch with 2-hour revalidation. Also provides `useRetrieveReadme` hook for fetching README from GitHub API.
- `lib/store.ts` - Zustand store with persistence for UI state (theme, filter, sort, vimMode, modals)
- `lib/filters.ts` - Filter logic supporting `topic:<name>` syntax for tag filtering
- `lib/sort.ts` - Sort logic for stars and updated date

### Component Structure

- `app/page.tsx` - Server component that fetches plugins and renders wrapper
- `components/repository-wrapper.tsx` - Main client component coordinating list, description panel, and keyboard navigation
- `components/repo-list.tsx` - Virtualized list using @tanstack/react-virtual
- `components/repo-description.tsx` - Detail panel with README rendering via highlight.js

### Key Patterns

- Path alias: `@/*` maps to project root
- React Compiler enabled (`reactCompiler: true` in next.config.ts)
- Catppuccin color themes: latte, frappe, macchiato, mocha (default)
- Tests are in `tests/` directory, coverage configured for `lib/` only

### Type Definition

`Repository` type in `lib/definitions.ts` is the core data model with: full_name, description, homepage, html_url, stargazers_count, issues_count, created_at, updated_at, topics.
