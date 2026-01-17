import Header from "@/components/header";
import Help from "@/components/help";
import InstallModal from "@/components/install-modal";
import MobileMenu from "@/components/mobile-menu";
import RepositoryWrapper from "@/components/repository-wrapper";
import { retrievePlugins } from "@/lib/api";

export default async function Home() {
  const { repositories, total_repositories } = await retrievePlugins();
  return (
    <div className="flex flex-col p-3 w-full h-full relative">
      <Header total={total_repositories} />

      <RepositoryWrapper repositories={repositories} />

      <Help />
      <InstallModal />
      <MobileMenu />
    </div>
  );
}
