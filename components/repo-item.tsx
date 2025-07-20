import { Repository } from "@/lib/definitions";
import { formatNumber } from "@/lib/utils";
import clsx from "clsx";

type RepoItemProps = {
  item: Repository;
  isSelected: boolean;
  onClick?: () => void;
};

export default function RepoItem({ item, isSelected, onClick }: RepoItemProps) {
  return (
    <div
      className={clsx(
        "font-mono rounded-sm p-1 transition hover:bg-foreground hover:text-black cursor-pointer",
        {
          "bg-foreground text-black": isSelected,
        },
      )}
      onClick={onClick}
    >
      <span>{item.full_name}</span>

      <div className="flex gap-2">
        <span>⭐ {formatNumber(item.stargazers_count)}</span>
        <span className="md:hidden xl:inline">
          🍴 {formatNumber(item.fork_count)}
        </span>
        <span className="hidden md:inline">
          👀 {formatNumber(item.watchers_count)}
        </span>
      </div>
    </div>
  );
}
