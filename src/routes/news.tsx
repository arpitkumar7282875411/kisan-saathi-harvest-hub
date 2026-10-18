import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { AppShell, PageTitle } from "@/components/AppShell";
import { NEWS } from "@/lib/farm-data";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Krishi News for Farmers | KisanSathi" },
      { name: "description", content: "Farming news, advisories, MSP updates, weather and scheme deadlines for Indian farmers." },
      { property: "og:title", content: "Krishi News — KisanSathi" },
      { property: "og:description", content: "Latest farming updates and advisories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const first = NEWS[0]!;
  const rest = NEWS.slice(1);
  return (
    <AppShell>
      <PageTitle title="Krishi News 📰" subtitle="Updates that matter for your farm." />
      <article className="rounded-[2rem] bg-field p-6 text-primary-foreground shadow-soft">
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">{first.tag}</span>
        <h2 className="mt-3 text-2xl font-bold md:text-3xl">{first.title}</h2>
        <p className="mt-2 opacity-90">{first.summary}</p>
        <p className="mt-3 text-sm opacity-80">{first.source} · {first.date}</p>
      </article>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {rest.map((n) => (
          <a key={n.title} href={n.link} target="_blank" rel="noreferrer" className="block rounded-3xl border bg-card p-5 shadow-soft transition hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary">{n.tag}</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="mt-2 text-lg font-bold">{n.title}</h3>
            <p className="mt-1 text-muted-foreground">{n.summary}</p>
            <p className="mt-2 text-sm text-muted-foreground">{n.source} · {n.date}</p>
          </a>
        ))}
      </div>
    </AppShell>
  );
}
