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
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-bold">{repo.full_name}</h3>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on GitHub"
          className="text-foreground hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-current"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.58v-2.02c-3.338.726-4.042-1.61-4.042-1.61-.546-1.39-1.334-1.765-1.334-1.765-1.09-.744.082-.729.082-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.808 1.306 3.493.998.108-.775.42-1.307.763-1.607-2.666-.304-5.467-1.334-5.467-5.93 0-1.31.468-2.382 1.235-3.22-.123-.304-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 013.003-.404c1.02.005 2.047.138 3.006.403 2.29-1.552 3.296-1.228 3.296-1.228.655 1.653.242 2.874.12 3.176.77.84 1.232 1.91 1.232 3.22 0 4.61-2.807 5.623-5.48 5.92.43.37.82 1.096.82 2.214v3.292c0 .32.216.696.825.58C20.565 21.795 24 17.296 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
      </div>
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
          className="repo-readme font-mono"
          dangerouslySetInnerHTML={{ __html: data }}
        />
      )}
    </Section>
  );
}
