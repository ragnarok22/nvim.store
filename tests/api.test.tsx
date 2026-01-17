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
          meta: { created_at: 1_690_000_000_000 },
          items: [
            {
              full_name: "user/repo",
              description: "desc",
              url: "https://example.com/repo",
              tags: ["tag"],
              stars: 3,
              issues: 2,
              created_at: "2025-01-01T00:00:00Z",
              updated_at: 123,
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
    expect(repo.stargazers_count).toBe(3);
    expect(repo.issues_count).toBe(2);
    expect(repo.updated_at).toBe(new Date(123 * 1000).toISOString());
    expect(repo.created_at).toBe("2025-01-01T00:00:00.000Z");
  });

  it("normalizes counts from pretty formatted values", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        json: async () => ({
          meta: { created_at: 1_690_000_000_000 },
          items: [
            {
              full_name: "owner/large",
              description: "",
              url: "",
              tags: [],
              stars: "2M",
              issues: null,
              created_at: "2025-01-01T00:00:00Z",
              updated_at: "2025-01-02T00:00:00Z",
              pretty: {
                issues: "2.4k",
              },
            },
            {
              full_name: "owner/comma",
              description: "",
              url: "",
              tags: [],
              stars: 7,
              issues: "1,234",
              created_at: null,
              updated_at: "2025-01-03T00:00:00Z",
            },
          ],
        }),
      })) as any,
    );

    const result = await retrievePlugins();
    expect(result.total_repositories).toBe(2);

    const [large, comma] = result.repositories;
    expect(large.stargazers_count).toBe(2_000_000);
    expect(large.issues_count).toBe(2400);
    expect(comma.issues_count).toBe(1234);
    expect(comma.stargazers_count).toBe(7);
    expect(comma.created_at).toBe(new Date(0).toISOString());
    expect(comma.updated_at).toBe("2025-01-03T00:00:00.000Z");
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
      issues_count: 0,
      created_at: "",
      updated_at: "",
      topics: [],
    };

    const client = new QueryClient();
    const queryRef = {
      current: null as ReturnType<typeof useRetrieveReadme> | null,
    };

    const Test = () => {
      const query = useRetrieveReadme(repo);
      // eslint-disable-next-line react-hooks/immutability -- capturing hook result for testing
      queryRef.current = query;
      return null;
    };

    renderToStaticMarkup(
      <QueryClientProvider client={client}>
        <Test />
      </QueryClientProvider>,
    );

    const result = await queryRef.current!.refetch();
    expect(result.data).toBe("hello world");
  });
});
