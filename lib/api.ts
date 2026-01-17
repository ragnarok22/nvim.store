import { useQuery } from "@tanstack/react-query";
import { Repository } from "./definitions";

const DATA_SOURCE_URL =
  "https://gist.githubusercontent.com/alex-popov-tech/92d1366bfeb168d767153a24be1475b5/raw/db.json";

const parseCount = (input: unknown): number => {
  if (typeof input === "number" && Number.isFinite(input)) {
    return Math.round(input);
  }

  if (typeof input !== "string") {
    return Number.NaN;
  }

  const normalized = input.trim();
  if (!normalized) {
    return Number.NaN;
  }

  const match = normalized.match(/^(?<num>[\d.]+)(?<suffix>[kM]?)$/);
  if (!match || !match.groups) {
    const numeric = Number.parseInt(normalized.replace(/,/g, ""), 10);
    return Number.isNaN(numeric) ? Number.NaN : numeric;
  }

  const value = Number.parseFloat(match.groups.num);
  if (Number.isNaN(value)) {
    return Number.NaN;
  }

  const suffix = match.groups.suffix;
  const multiplier = suffix === "k" ? 1_000 : suffix === "M" ? 1_000_000 : 1;
  return Math.round(value * multiplier);
};

const normalizeCount = (...values: unknown[]): number => {
  for (const value of values) {
    const parsed = parseCount(value);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return 0;
};

const normalizeTimestamp = (input: unknown): string => {
  if (typeof input === "number" && Number.isFinite(input)) {
    const millis = input > 1_000_000_000_000 ? input : input * 1000;
    return new Date(millis).toISOString();
  }

  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!trimmed) {
      return new Date(0).toISOString();
    }

    const asNumber = Number(trimmed);
    if (!Number.isNaN(asNumber) && Number.isFinite(asNumber)) {
      return normalizeTimestamp(asNumber);
    }

    const parsed = new Date(trimmed);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
  }

  return new Date(0).toISOString();
};

export const retrievePlugins = async () => {
  const res = await fetch(DATA_SOURCE_URL, {
    next: { revalidate: 7200 }, // Revalidate every 2 hours
  });
  const data = (await res.json()) as {
    meta: { created_at?: number };
    items: Array<{
      source: string;
      full_name: string;
      author: string;
      name: string;
      url?: string;
      description?: string;
      tags?: string[];
      stars?: number | string | null;
      issues?: number | string | null;
      created_at?: string | number | null;
      updated_at?: string | number | null;
      pretty?: {
        stars?: string | number | null;
        issues?: string | number | null;
        created_at?: string | null;
        updated_at?: string | null;
      };
      readme?: string | null;
    }>;
  };

  const repositories: Repository[] = data.items.map((item) => ({
    full_name: item.full_name,
    description: item.description ?? "",
    homepage: item.url ?? "",
    html_url: item.url ?? "",
    stargazers_count: normalizeCount(item.stars, item.pretty?.stars),
    issues_count: normalizeCount(item.issues, item.pretty?.issues),
    created_at: normalizeTimestamp(item.created_at),
    updated_at: normalizeTimestamp(item.updated_at),
    topics: Array.isArray(item.tags) ? item.tags : [],
  }));

  return {
    repositories,
    total_repositories: repositories.length,
  };
};

export const useRetrieveReadme = (repo: Repository) => {
  return useQuery({
    queryKey: ["readme", repo.full_name],
    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/repos/${repo.full_name}/readme`,
        {
          headers: {
            Accept: "application/vnd.github.v3.html",
          },
        },
      );

      const contentType = response.headers.get("content-type") ?? "";
      if (contentType.includes("json")) {
        const data = (await response.json()) as {
          content?: string;
          encoding?: string;
        };
        if (data.content && data.encoding === "base64") {
          const base64 = data.content.replace(/\n/g, "");
          if (typeof atob === "function") {
            return atob(base64);
          }
          return Buffer.from(base64, "base64").toString("utf-8");
        }
        return JSON.stringify(data);
      }

      return await response.text();
    },
    enabled: !!repo.full_name,
  });
};
