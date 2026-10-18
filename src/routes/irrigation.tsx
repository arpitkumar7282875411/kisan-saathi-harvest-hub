import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Droplets } from "lucide-react";
import { AppShell, PageTitle } from "@/components/AppShell";
import { IRRIGATION_CROPS, METHOD_EFF, SOIL_FACTOR, waterNeedLitres } from "@/lib/farm-data";

export const Route = createFileRoute("/irrigation")({
  head: () => ({
    meta: [
      { title: "Smart Irrigation Calculator | KisanSathi" },
      { name: "description", content: "Calculate daily water need for your crop by soil and irrigation method and save water with drip." },
      { property: "og:title", content: "Irrigation Calculator — KisanSathi" },
      { property: "og:description", content: "Know how much water your field needs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Pills<T extends string>({ items, value, onChange }: { items: T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <button key={i} onClick={() => onChange(i)} className={`rounded-full border px-4 py-2 font-semibold ${value === i ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}>
          {i}
        </button>
      ))}
    </div>
  );
}

function Page() {
  const [crop, setCrop] = useState("Wheat");
  const [acres, setAcres] = useState(2);
  const [soil, setSoil] = useState("Loamy");
  const [method, setMethod] = useState("Flood");
  const c = IRRIGATION_CROPS.find((x) => x.crop === crop)!;
  const litres = waterNeedLitres(acres, c.mmPerDay, soil, method);
  const drip = waterNeedLitres(acres, c.mmPerDay, soil, "Drip");

  return (
    <AppShell>
      <PageTitle title="Irrigation 💧" subtitle="Give the right water at the right time." />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5 rounded-3xl border bg-card p-5 shadow-soft">
          <div><p className="mb-2 font-bold">Crop</p><Pills items={IRRIGATION_CROPS.map((x) => x.crop)} value={crop} onChange={setCrop} /></div>
          <div>
            <p className="mb-2 font-bold">Land: {acres} acre</p>
            <input type="range" min={0.5} max={20} step={0.5} value={acres} onChange={(e) => setAcres(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div><p className="mb-2 font-bold">Soil</p><Pills items={Object.keys(SOIL_FACTOR)} value={soil} onChange={setSoil} /></div>
          <div><p className="mb-2 font-bold">Method</p><Pills items={Object.keys(METHOD_EFF)} value={method} onChange={setMethod} /></div>
        </div>
        <div className="space-y-4">
          <div className="rounded-[2rem] bg-sky p-6 text-primary-foreground shadow-soft">
            <Droplets className="h-8 w-8" />
            <p className="mt-2 opacity-90">Water needed per day</p>
            <p className="font-display text-5xl font-extrabold">{litres.toLocaleString("en-IN")} L</p>
            {method !== "Drip" && (
              <p className="mt-2 rounded-2xl bg-card/20 px-3 py-2">💡 With drip you'd need only {drip.toLocaleString("en-IN")} L — save {Math.round((1 - drip / litres) * 100)}%. 55% subsidy under PMKSY.</p>
            )}
          </div>
          <div className="rounded-3xl border bg-card p-5">
            <p><b>Interval:</b> {c.interval}</p>
            <p className="mt-1"><b>Critical stages:</b> {c.critical}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Water early morning or evening to reduce evaporation.</li>
              <li>Skip irrigation if rain is expected in 24 hours.</li>
              <li>Mulch with crop residue to keep soil moist longer.</li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
