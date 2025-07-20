"use client";

import { Repository } from "@/lib/definitions";
import RepoDescription from "./repo-description";
import RepoList from "./repo-list";
import { useState } from "react";

type RepositoryWrapperProps = {
  repositories: Repository[];
};

export default function RepositoryWrapper({
  repositories,
}: RepositoryWrapperProps) {
  const [selected, setSelected] = useState(repositories[0]);

  return (
    <div className="flex gap-3 mt-3 flex-1 overflow-hidden">
      <div className="w-1/3 h-full overflow-hidden">
        <RepoList
          repositories={repositories}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      <div className="w-2/3 h-full overflow-y-auto">
        <RepoDescription repo={selected} />
      </div>
    </div>
  );
}
