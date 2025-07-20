import Header from "@/components/header";
import RepositoryWrapper from "@/components/repository-wrapper";
import { retrievePlugins } from "@/lib/api";

export default async function Home() {
  const { repositories, total_repositories } = await retrievePlugins();
  return (
    <div className="flex flex-col p-3 w-full h-full">
      <Header total={total_repositories} />

      <RepositoryWrapper repositories={repositories} />
    </div>
  );
}
