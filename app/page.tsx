import Header from "@/components/header";
import RepositoryWrapper from "@/components/repository-wrapper";
import { Repository } from "@/lib/definitions";

const REPOS_URL =
  "https://gist.githubusercontent.com/alex-popov-tech/93dcd3ce38cbc7a0b3245b9b59b56c9b/raw/store.nvim-repos.json";

export default async function Home() {
  const res = await fetch(REPOS_URL);
  const { repositories, total_repositories } = (await res.json()) as {
    repositories: Repository[];
    total_repositories: number;
  };

  return (
    <div className="p-3">
      <Header total={total_repositories} />

      <RepositoryWrapper repositories={repositories} />
    </div>
  );
}
