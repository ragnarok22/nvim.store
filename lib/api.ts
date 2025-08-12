import { useQuery } from "@tanstack/react-query";
import { Repository } from "./definitions";

const DATA_SOURCE_URL =
  "https://gist.githubusercontent.com/alex-popov-tech/dfb6adf1ee0506461d7dc029a28f851d/raw/store.nvim_db_1.1.0.json";

const parseCount = (input: string): number => {
  const match = input.match(/^(?<num>[\d.]+)(?<suffix>[kM]?)$/);
  if (!match || !match.groups) {
    return parseInt(input.replace(/,/g, ""), 10) || 0;
  }
  const value = parseFloat(match.groups.num);
  const suffix = match.groups.suffix;
  const multiplier = suffix === "k" ? 1_000 : suffix === "M" ? 1_000_000 : 1;
  return Math.round(value * multiplier);
};

export const retrievePlugins = async () => {
  const res = await fetch(DATA_SOURCE_URL);
  const data = (await res.json()) as {
    meta: { total_count: number };
    items: Array<{
      full_name: string;
      description: string;
      homepage: string;
      html_url: string;
      tags: string[];
      stargazers_count: number;
      pretty_forks_count: string;
      pushed_at: number;
    }>;
  };

  const repositories: Repository[] = data.items.map((item) => ({
    full_name: item.full_name,
    description: item.description,
    homepage: item.homepage,
    html_url: item.html_url,
    stargazers_count: item.stargazers_count,
    watchers_count: item.stargazers_count,
    fork_count: parseCount(item.pretty_forks_count),
    updated_at: new Date(item.pushed_at * 1000).toISOString(),
    topics: item.tags,
  }));

  return {
    repositories,
    total_repositories: data.meta.total_count,
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
