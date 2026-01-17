import { forwardRef, useImperativeHandle, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Repository } from "@/lib/definitions";
import Section from "./section";
import RepoItem from "./repo-item";
import RepoFilter from "./repo-filter";
import RepoSort from "./repo-sort";

export type RepoListHandle = {
  scrollToIndex: (index: number) => void;
};

type RepoListProps = {
  repositories: Repository[];
  selected: Repository | null;
  setSelected: (repo: Repository) => void;
};

const ITEM_HEIGHT = 60;

const RepoList = forwardRef<RepoListHandle, RepoListProps>(function RepoList(
  { repositories, selected, setSelected },
  ref,
) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: repositories.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 5,
  });

  useImperativeHandle(ref, () => ({
    scrollToIndex: (index: number) => {
      virtualizer.scrollToIndex(index, { align: "auto" });
    },
  }));

  return (
    <Section className="h-full flex flex-col">
      <RepoFilter />
      <RepoSort />
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const repository = repositories[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <RepoItem
                  item={repository}
                  onClick={() => setSelected(repository)}
                  isSelected={repository === selected}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
});

export default RepoList;
