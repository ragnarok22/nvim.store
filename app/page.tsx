import Header from "@/components/header";
import RepoDescription from "@/components/repo-description";
import RepoList from "@/components/repo-list";

export default function Home() {
  return (
    <div className="p-3">
      <Header />

      <div className="flex gap-3 mt-3 w-full">
        <div className="w-1/3">
          <RepoList />
        </div>
        <div className="w-2/3">
          <RepoDescription />
        </div>
      </div>
    </div>
  );
}
