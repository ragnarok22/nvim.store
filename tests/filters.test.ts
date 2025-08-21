import { describe, it, expect } from "vitest";
import {
  parseFilter,
  filterRepositories,
  registerFilter,
  availableFilters,
} from "../lib/filters";
import type { Repository } from "../lib/definitions";

const repos: Repository[] = [
  {
    full_name: "foo/bar",
    description: "First repository",
    homepage: "",
    html_url: "",
    stargazers_count: 0,
    watchers_count: 0,
    fork_count: 0,
    updated_at: "2025-01-01T00:00:00Z",
    topics: ["nvim", "lsp"],
  },
  {
    full_name: "baz/qux",
    description: "Another repo",
    homepage: "",
    html_url: "",
    stargazers_count: 0,
    watchers_count: 0,
    fork_count: 0,
    updated_at: "2025-01-02T00:00:00Z",
    topics: ["tree-sitter"],
  },
];

describe("parseFilter", () => {
  it("parses key:value tokens and defaults to name", () => {
    const tokens = parseFilter("name:foo topic:lsp bar");
    expect(tokens).toEqual([
      { key: "name", value: "foo" },
      { key: "topic", value: "lsp" },
      { key: "name", value: "bar" },
    ]);
  });
});

describe("filterRepositories", () => {
  it("filters by name and topic", () => {
    const byName = filterRepositories(repos, "baz");
    expect(byName).toHaveLength(1);
    expect(byName[0].full_name).toBe("baz/qux");

    const byTopic = filterRepositories(repos, "topic:lsp");
    expect(byTopic).toHaveLength(1);
    expect(byTopic[0].full_name).toBe("foo/bar");
  });

  it("returns all repositories for empty query", () => {
    expect(filterRepositories(repos, "")).toEqual(repos);
  });

  it("uses registered custom filters", () => {
    registerFilter("desc", (repo, value) =>
      repo.description.toLowerCase().includes(value.toLowerCase()),
    );
    const result = filterRepositories(repos, "desc:another");
    expect(result).toHaveLength(1);
    expect(result[0].full_name).toBe("baz/qux");
    delete availableFilters.desc;
  });
});
