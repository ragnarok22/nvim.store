"use client";

import { Repository } from "@/lib/definitions";
import RepoDescription from "./repo-description";
import RepoList from "./repo-list";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type RepositoryWrapperProps = {
  repositories: Repository[];
};

export default function RepositoryWrapper({
  repositories,
}: RepositoryWrapperProps) {
  const [selected, setSelected] = useState(repositories[0]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex gap-3 mt-3 flex-1 overflow-hidden">
        <div className="w-1/3 h-full relative">
          <div className="overflow-hidden h-full">
            <RepoList
              repositories={repositories}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </div>
        <div className="w-2/3 h-full overflow-hidden">
          <RepoDescription repo={selected} />
        </div>
      </div>
    </QueryClientProvider>
  );
}
