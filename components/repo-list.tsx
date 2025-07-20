import { Repository } from "@/lib/definitions";
import Section from "./section";
import RepoItem from "./repo-item";

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
  return (
    <Section className="h-full overflow-y-auto">
      <ul>
        {repositories.slice(0, 100).map((repository, index) => (
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
