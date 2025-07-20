import Header from "@/components/header";
import RepoDescription from "@/components/repo-description";
import RepoList from "@/components/repo-list";
import { Repository } from "@/lib/definitions";

const REPOS_URL =
  "https://gist.githubusercontent.com/alex-popov-tech/93dcd3ce38cbc7a0b3245b9b59b56c9b/raw/store.nvim-repos.json";

export default async function Home() {
  const res = await fetch(REPOS_URL);
  const { repositories, total_repositories } = (await res.json()) as {
    repositories: Repository[];
    total_repositories: number;
  };
  const selected = repositories[0];

  return (
    <div className="p-3">
      <Header total={total_repositories} />

      <div className="flex gap-3 mt-3 w-full">
        <div className="w-1/3">
          <RepoList repositories={repositories} />
        </div>
        <div className="w-2/3">
          <RepoDescription repo={selected} />
        </div>
      </div>
    </div>
  );
}
