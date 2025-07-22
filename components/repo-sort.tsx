import { useStore, SortOption } from "@/lib/store";
import Section from "./section";

export default function RepoSort() {
  const { sort, setSort } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as SortOption);
  };

  return (
    <Section className="relative w-full mb-3">
      <label className="absolute -top-1/2 translate-y-1/2 left-2 bg-background px-2">
        Sort repositories
      </label>
      <select
        value={sort}
        onChange={handleChange}
        className="w-full focus:outline-none"
      >
        <option value="default">Default</option>
        <option value="stars">Most stars</option>
        <option value="updated">Recently updated</option>
      </select>
    </Section>
  );
}
