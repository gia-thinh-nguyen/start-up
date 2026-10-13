import { site } from "@/content/site";

export default function Home() {
  return (
    <div className="mx-auto max-w-page px-gutter py-section lg:px-gutter-lg">
      <h1 className="text-4xl sm:text-6xl">{site.name}</h1>
      <p className="mt-4 max-w-prose">[TODO: Home page, built in Step 2]</p>
    </div>
  );
}
