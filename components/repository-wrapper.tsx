"use client";

import { useMemo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Repository } from "@/lib/definitions";
import RepoDescription from "./repo-description";
import RepoList, { RepoListHandle } from "./repo-list";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStore } from "@/lib/store";
import { sortRepositories } from "@/lib/sort";
import { filterRepositories } from "@/lib/filters";

const queryClient = new QueryClient();
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type RepositoryWrapperProps = {
  repositories: Repository[];
};

export default function RepositoryWrapper({
  repositories,
}: RepositoryWrapperProps) {
  const [selected, setSelected] = useState<Repository | null>(
    repositories[0] ?? null,
  );
  const { vimMode, filter, sort } = useStore();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const repoListRef = useRef<RepoListHandle>(null);

  const processedRepositories = useMemo(() => {
    const filtered = filterRepositories(repositories, filter);
    return sortRepositories(filtered, sort);
  }, [repositories, filter, sort]);

  useEffect(() => {
    if (processedRepositories.length === 0) {
      setSelected(null);
      return;
    }
    setSelected((current) => {
      if (current && processedRepositories.includes(current)) {
        return current;
      }
      return processedRepositories[0];
    });
  }, [processedRepositories]);

  useIsomorphicLayoutEffect(() => {
    const updateViewportFlags = () => {
      if (typeof window === "undefined") return;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      setIsMobile(mobile);
      setIsSidebarOpen((prev) => (mobile ? prev : true));
    };

    updateViewportFlags();
    window.addEventListener("resize", updateViewportFlags);
    return () => window.removeEventListener("resize", updateViewportFlags);
  }, []);

  const changeSelected = (nextSelected: Repository) => {
    setSelected(nextSelected);
    if (isMobile) {
      setIsSidebarOpen(true);
    }
  };

  const handleCloseDescription = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };
  const baseDescriptionClasses =
    "absolute inset-0 bg-background md:static md:flex-1 md:w-auto h-full md:h-full overflow-hidden md:overflow-auto";
  const descriptionClasses = isMobile
    ? ["sidebar", isSidebarOpen && "sidebar-open", baseDescriptionClasses]
        .filter(Boolean)
        .join(" ")
    : baseDescriptionClasses;

  useEffect(() => {
    if (!vimMode || isMobile || processedRepositories.length === 0) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;
      if (event.key === "j" || event.key === "ArrowDown") {
        event.preventDefault();
        setSelected((current) => {
          if (!current) {
            repoListRef.current?.scrollToIndex(0);
            return processedRepositories[0];
          }
          const idx = processedRepositories.indexOf(current);
          if (idx < processedRepositories.length - 1) {
            const newIndex = idx + 1;
            repoListRef.current?.scrollToIndex(newIndex);
            return processedRepositories[newIndex];
          }
          return current;
        });
      } else if (event.key === "k" || event.key === "ArrowUp") {
        event.preventDefault();
        setSelected((current) => {
          if (!current) {
            repoListRef.current?.scrollToIndex(0);
            return processedRepositories[0];
          }
          const idx = processedRepositories.indexOf(current);
          if (idx > 0) {
            const newIndex = idx - 1;
            repoListRef.current?.scrollToIndex(newIndex);
            return processedRepositories[newIndex];
          }
          return current;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [vimMode, isMobile, processedRepositories]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex gap-3 mt-3 flex-1 overflow-hidden flex-col md:flex-row relative">
        <div className="w-full md:w-1/3 h-full md:h-full relative">
          <div className="overflow-hidden h-full">
            <RepoList
              ref={repoListRef}
              repositories={processedRepositories}
              selected={selected}
              setSelected={changeSelected}
            />
          </div>
        </div>

        <div className={descriptionClasses}>
          {selected ? (
            <RepoDescription repo={selected} onClose={handleCloseDescription} />
          ) : (
            <div className="p-3 text-sm text-muted-foreground">
              No plugins found.
            </div>
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
}
