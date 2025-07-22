import { Repository } from "./definitions";
import { SortOption } from "./store";

export const sortRepositories = (
  repos: Repository[],
  sort: SortOption,
): Repository[] => {
  const sorted = [...repos];
  if (sort === "stars") {
    sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
  } else if (sort === "updated") {
    sorted.sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
  }
  return sorted;
};
