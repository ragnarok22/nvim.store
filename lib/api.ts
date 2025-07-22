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

      return await response.text();
    },
    enabled: !!repo.full_name,
  });
};
