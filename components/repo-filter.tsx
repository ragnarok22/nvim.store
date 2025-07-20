import Section from "./section";

export default function RepoFilter() {
  return (
    <Section className="relative w-full mb-3">
      <form>
        <label className="absolute -top-1/2 translate-y-1/2 left-2 bg-background px-2">
          Filter repositories
        </label>
        <input type="text" autoFocus className="w-full focus:outline-none" />
      </form>
    </Section>
  );
}
