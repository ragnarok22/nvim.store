import { Repository } from "@/lib/definitions";
import Section from "./section";
import RepoItem from "./repo-item";

type RepoListProps = {
  repositories: Repository[];
  setSelected: (repo: Repository) => void;
};

export default function RepoList({ repositories, setSelected }: RepoListProps) {
  return (
    <Section>
      <ul>
        {repositories.slice(0, 100).map((repository, index) => (
          <li key={index}>
            <RepoItem
              item={repository}
              onClick={() => setSelected(repository)}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
