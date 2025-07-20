import { Repository } from "@/lib/definitions";
import Section from "./section";
import RepoItem from "./repo-item";

type RepoListProps = {
  repositories: Repository[];
};

export default function RepoList({ repositories }: RepoListProps) {
  return (
    <Section>
      <ul>
        {repositories.slice(0, 100).map((repository, index) => (
          <li key={index}>
            <RepoItem item={repository} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
