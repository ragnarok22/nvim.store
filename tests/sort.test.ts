import { describe, it, expect } from "vitest";
import { sortRepositories } from "../lib/sort";
import { SortOption } from "../lib/store";
import { Repository } from "../lib/definitions";

const repos: Repository[] = [
  {
    full_name: "foo/bar",
    description: "",
    homepage: "",
    html_url: "",
    stargazers_count: 5,
    issues_count: 0,
    created_at: "2025-07-17T00:00:00Z",
    updated_at: "2025-07-18T00:00:00Z",
    topics: [],
  },
  {
    full_name: "baz/qux",
    description: "",
    homepage: "",
    html_url: "",
    stargazers_count: 10,
    issues_count: 0,
    created_at: "2025-07-16T00:00:00Z",
    updated_at: "2025-07-17T00:00:00Z",
    topics: [],
  },
];

describe("sortRepositories", () => {
  it("sorts by stars", () => {
    const sorted = sortRepositories(repos, "stars" as SortOption);
    expect(sorted[0].stargazers_count).toBe(10);
  });

  it("sorts by updated date", () => {
    const sorted = sortRepositories(repos, "updated" as SortOption);
    expect(sorted[0].updated_at).toBe("2025-07-18T00:00:00Z");
  });
});
