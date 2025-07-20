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
