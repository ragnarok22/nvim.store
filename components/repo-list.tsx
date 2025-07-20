import { Repository } from "@/lib/definitions";
import Section from "./section";
import RepoItem from "./repo-item";
import RepoFilter from "./repo-filter";
import { useStore } from "@/lib/store";

type RepoListProps = {
  repositories: Repository[];
  selected: Repository;
  setSelected: (repo: Repository) => void;
};

export default function RepoList({
  repositories,
  selected,
  setSelected,
}: RepoListProps) {
  const { filter } = useStore();

  return (
    <Section className="h-full overflow-y-auto">
      <RepoFilter />
      <ul>
        {repositories
          .filter((repo) => repo.full_name.includes(filter))
          .slice(0, 100)
          .map((repository, index) => (
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
