import { Repository } from "@/lib/definitions";
import { formatNumber } from "@/lib/utils";

type RepoItemProps = {
  item: Repository;
  onClick?: () => void;
};

export default function RepoItem({ item, onClick }: RepoItemProps) {
  return (
    <div
      className="font-mono rounded-sm p-1 hover:bg-blue-500 cursor-pointer"
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
