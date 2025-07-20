import { Repository } from "@/lib/definitions";
import Section from "./section";
import { useRetrieveReadme } from "@/lib/api";

type RepoDescriptionProps = {
  repo: Repository;
};

export default function RepoDescription({ repo }: RepoDescriptionProps) {
  const { data } = useRetrieveReadme(repo);

  return (
    <Section className="h-full overflow-auto">
      <h3 className="text-lg font-bold">{repo.full_name}</h3>
      <h4 className="text-sm">{repo.description}</h4>

      <div className="flex w-full items-center justify-between">
        <ul className="my-2 flex gap-1 flex-wrap">
          {repo.topics.map((topic, index) => (
            <li
              key={`topic-${index}-${topic}`}
              className="inline-block rounded-full bg-foreground text-black px-2 py-1 text-xs"
            >
              {topic}
            </li>
          ))}
        </ul>
        <time className="text-xs" dateTime={repo.updated_at}>
          Updated: {new Date(repo.updated_at).toDateString()}
        </time>
      </div>

      {data && (
        <div
          className="prose prose-invert font-mono"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      )}
    </Section>
  );
}
