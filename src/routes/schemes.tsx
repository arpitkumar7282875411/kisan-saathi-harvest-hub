import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import { AppShell, PageTitle } from "@/components/AppShell";
import { MSP, SCHEMES } from "@/lib/farm-data";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "Government Schemes & MSP for All Crops | KisanSathi" },
      { name: "description", content: "Latest MSP for Kharif and Rabi crops plus PM-KISAN, PMFBY, KCC and other farmer schemes explained simply." },
      { property: "og:title", content: "Schemes & MSP — KisanSathi" },
      { property: "og:description", content: "MSP for all crops and key government schemes for farmers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  const [tab, setTab] = useState<"msp" | "schemes">("msp");
  const [q, setQ] = useState("");
  const rows = MSP.filter((r) => r.crop.toLowerCase().includes(q.toLowerCase()));
  return (
    <AppShell>
      <PageTitle title="Schemes & MSP 🏛️" subtitle="Government support made simple." />
      <div className="mb-5 inline-flex rounded-full bg-muted p-1">
        {(["msp", "schemes"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full px-5 py-2 font-semibold ${tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
            {t === "msp" ? "MSP Prices" : "Schemes"}
          </button>
        ))}
      </div>

      {tab === "msp" ? (
        <>
          <label className="mb-4 flex items-center gap-2 rounded-2xl border bg-card px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search crop…" className="flex-1 bg-transparent outline-none" />
          </label>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {rows.map((r) => (
              <div key={r.crop} className="rounded-3xl border bg-card p-4 shadow-soft">
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${r.season.startsWith("Rabi") ? "bg-accent/40 text-accent-foreground" : "bg-secondary text-primary"}`}>{r.season}</span>
                <p className="mt-2 font-semibold leading-tight">{r.crop}</p>
                <p className="mt-1 font-display text-2xl font-extrabold text-primary">₹{r.msp.toLocaleString("en-IN")}</p>
                <p className="text-xs text-muted-foreground">per quintal · {r.group}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Source: Government of India (CACP). Verify at your procurement centre.</p>
        </>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {SCHEMES.map((s) => (
            <article key={s.name} className="rounded-3xl border bg-card p-5 shadow-soft">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary">{s.short}</span>
              <h3 className="mt-2 text-xl font-bold">{s.name}</h3>
              <p className="mt-2"><b>Benefit:</b> {s.benefit}</p>
              <p className="mt-1 text-muted-foreground"><b className="text-foreground">Who:</b> {s.who}</p>
              <p className="mt-1 text-muted-foreground"><b className="text-foreground">How to apply:</b> {s.how}</p>
              <a href={s.link} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 font-semibold text-primary">
                Official website <ExternalLink className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      )}
    </AppShell>
  );
}
