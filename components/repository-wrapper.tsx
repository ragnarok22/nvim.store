"use client";

import { Repository } from "@/lib/definitions";
import RepoDescription from "./repo-description";
import RepoList from "./repo-list";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStore } from "@/lib/store";

const queryClient = new QueryClient();

type RepositoryWrapperProps = {
  repositories: Repository[];
};

export default function RepositoryWrapper({
  repositories,
}: RepositoryWrapperProps) {
  const [selected, setSelected] = useState(repositories[0]);
  const { vimMode } = useStore();

  const isMobile =
    typeof navigator !== "undefined" &&
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  useEffect(() => {
    if (!vimMode || isMobile) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      if (event.key === "j" || event.key === "ArrowDown") {
        event.preventDefault();
        setSelected((current) => {
          const idx = repositories.indexOf(current);
          return idx < repositories.length - 1
            ? repositories[idx + 1]
            : current;
        });
      } else if (event.key === "k" || event.key === "ArrowUp") {
        event.preventDefault();
        setSelected((current) => {
          const idx = repositories.indexOf(current);
          return idx > 0 ? repositories[idx - 1] : current;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [vimMode, isMobile, repositories]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex gap-3 mt-3 flex-1 overflow-hidden flex-col md:flex-row">
        <div className="w-full md:w-1/3 h-52 md:h-full relative">
          <div className="overflow-hidden h-full">
            <RepoList
              repositories={repositories}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </div>

        <div className="w-full md:w-2/3 h-full overflow-hidden">
          <RepoDescription repo={selected} />
        </div>
      </div>
    </QueryClientProvider>
  );
}
