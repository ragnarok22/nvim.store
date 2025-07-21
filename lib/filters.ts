import { Repository } from "./definitions";

export type FilterFn = (repo: Repository, value: string) => boolean;

const defaultFilters: Record<string, FilterFn> = {
  name: (repo, value) =>
    repo.full_name.toLowerCase().includes(value.toLowerCase()),
  topic: (repo, value) =>
    repo.topics.some((t) => t.toLowerCase().includes(value.toLowerCase())),
};

const filters: Record<string, FilterFn> = { ...defaultFilters };

export const registerFilter = (key: string, fn: FilterFn) => {
  filters[key] = fn;
};

export type ParsedToken = { key: string; value: string };

export const parseFilter = (query: string): ParsedToken[] => {
  return query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      const [key, ...rest] = token.split(":");
      if (rest.length) {
        return { key, value: rest.join(":") };
      }
      return { key: "name", value: key };
    });
};

export const filterRepositories = (
  repos: Repository[],
  query: string,
): Repository[] => {
  const tokens = parseFilter(query);
  if (tokens.length === 0) return repos;
  return repos.filter((repo) =>
    tokens.every(({ key, value }) => {
      const fn = filters[key];
      if (!fn) return true;
      return fn(repo, value);
    }),
  );
};

export const availableFilters = filters;
