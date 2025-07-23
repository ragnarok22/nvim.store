import { useQuery } from "@tanstack/react-query";
import { Repository } from "./definitions";

const REPOS_URL =
  "https://gist.githubusercontent.com/alex-popov-tech/93dcd3ce38cbc7a0b3245b9b59b56c9b/raw/store.nvim-repos.json";

export const retrievePlugins = async () => {
  const res = await fetch(REPOS_URL);
  return (await res.json()) as {
    repositories: Repository[];
    total_repositories: number;
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
