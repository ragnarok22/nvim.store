import { Repository } from "@/lib/definitions";
import Section from "./section";
import RepoItem from "./repo-item";
import RepoFilter from "./repo-filter";
import RepoSort from "./repo-sort";
import { useStore } from "@/lib/store";
import { sortRepositories } from "@/lib/sort";
import { filterRepositories } from "@/lib/filters";

type RepoListProps = {
  repositories: Repository[];
  selected: Repository | null;
  setSelected: (repo: Repository) => void;
};

export default function RepoList({
  repositories,
  selected,
  setSelected,
}: RepoListProps) {
  const { filter, sort } = useStore();

  const filtered = filterRepositories(repositories, filter);
  const sorted = sortRepositories(filtered, sort);

  return (
    <Section className="h-full overflow-y-auto">
      <RepoFilter />
      <RepoSort />
      <ul>
        {sorted.slice(0, 100).map((repository, index) => (
          <li key={index}>
            <RepoItem
              item={repository}
              onClick={() => setSelected(repository)}
              isSelected={repository === selected}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
