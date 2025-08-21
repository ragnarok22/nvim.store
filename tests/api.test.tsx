import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderToStaticMarkup } from "react-dom/server";

import { retrievePlugins, useRetrieveReadme } from "../lib/api";
import { Repository } from "../lib/definitions";

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("api", () => {
  it("maps plugin data from the API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        json: async () => ({
          meta: { total_count: 1 },
          items: [
            {
              full_name: "user/repo",
              description: "desc",
              homepage: "",
              html_url: "",
              tags: ["tag"],
              stargazers_count: 3,
              pretty_forks_count: "1.5k",
              pushed_at: 123,
            },
          ],
        }),
      })) as any,
    );

    const result = await retrievePlugins();
    expect(globalThis.fetch).toHaveBeenCalled();
    expect(result.total_repositories).toBe(1);
    const repo = result.repositories[0];
    expect(repo.full_name).toBe("user/repo");
    expect(repo.fork_count).toBe(1500);
    expect(repo.updated_at).toBe(new Date(123 * 1000).toISOString());
  });

  it("decodes base64 readme content", async () => {
    const base64 = Buffer.from("hello world").toString("base64");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        headers: { get: () => "application/json" },
        json: async () => ({ content: base64, encoding: "base64" }),
        text: async () => "",
      })) as any,
    );

    const repo: Repository = {
      full_name: "owner/name",
      description: "",
      homepage: "",
      html_url: "",
      stargazers_count: 0,
      watchers_count: 0,
      fork_count: 0,
      updated_at: "",
      topics: [],
    };

    const client = new QueryClient();
    let query: ReturnType<typeof useRetrieveReadme>;

    const Test = () => {
      query = useRetrieveReadme(repo);
      return null;
    };

    renderToStaticMarkup(
      <QueryClientProvider client={client}>
        <Test />
      </QueryClientProvider>,
    );

    const result = await query!.refetch();
    expect(result.data).toBe("hello world");
  });
});
