import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import RepoItem from "../components/repo-item";
import { Repository } from "../lib/definitions";

const repo: Repository = {
  full_name: "owner/name",
  description: "desc",
  homepage: "",
  html_url: "",
  stargazers_count: 1500,
  watchers_count: 20,
  fork_count: 30,
  updated_at: "2025-01-01T00:00:00Z",
  topics: [],
};

describe("RepoItem", () => {
  it("renders repository data", () => {
    const html = renderToStaticMarkup(
      <RepoItem item={repo} isSelected={false} />
    );
    expect(html).toContain("owner/name");
    expect(html).toContain("⭐ 1.5k");
    expect(html).toContain("🍴 30");
    expect(html).toContain("👀 20");
    expect(html).not.toContain("bg-foreground text-black");
  });

  it("shows selected style", () => {
    const html = renderToStaticMarkup(
      <RepoItem item={repo} isSelected={true} />
    );
    expect(html).toContain("bg-foreground text-black");
  });
});
