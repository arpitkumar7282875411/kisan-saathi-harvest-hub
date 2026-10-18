import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, Landmark, Newspaper, ScanLine, Store, Users, CloudSun, Sun, Wheat } from "lucide-react";
import hero from "@/assets/hero-farmer.jpg";
import { AppShell } from "@/components/AppShell";
import { AssistantChat } from "@/components/AssistantChat";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KisanSathi — AI Farming Assistant for Indian Farmers" },
      { name: "description", content: "Free AI farming helper: crop advice, disease help, mandi prices, MSP, government schemes, farmer community and news." },
      { property: "og:title", content: "KisanSathi — AI Farming Assistant" },
      { property: "og:description", content: "Crop advice, mandi prices, MSP, schemes and a farmer community in one simple app." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TILES = [
  { to: "/crop-doctor", label: "Crop Doctor", note: "Diagnose diseases", icon: ScanLine, cls: "bg-destructive/10 text-destructive" },
  { to: "/market", label: "Mandi & Buyers", note: "Prices, sell direct", icon: Store, cls: "bg-accent/40 text-accent-foreground" },
  { to: "/irrigation", label: "Irrigation", note: "Water calculator", icon: Droplets, cls: "bg-sky/15 text-sky" },
  { to: "/schemes", label: "Schemes & MSP", note: "Govt. support", icon: Landmark, cls: "bg-secondary text-primary" },
  { to: "/community", label: "Community", note: "Talk to farmers", icon: Users, cls: "bg-soil/15 text-soil" },
  { to: "/news", label: "Krishi News", note: "Latest updates", icon: Newspaper, cls: "bg-muted text-foreground" },
] as const;

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

function Index() {
  return (
    <AppShell>
      <section className="relative overflow-hidden rounded-[2rem] shadow-soft">
        <img src={hero} alt="Farmer in a green wheat field" width={1280} height={768} className="h-64 w-full object-cover md:h-80" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground md:p-8">
          <p className="flex items-center gap-2 text-sm font-semibold opacity-90">
            <Sun className="h-4 w-4 text-accent" /> {greeting()}, Kisan ji 🙏
          </p>
          <h1 className="mt-1 text-3xl font-extrabold md:text-5xl">Your farm friend,<br />always in your pocket.</h1>
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-2xl bg-card/90 px-3 py-2 text-sm font-semibold text-foreground backdrop-blur">
          <CloudSun className="h-5 w-5 text-accent-foreground" /> Rabi season · Sow wheat now
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center gap-2">
          <Wheat className="h-6 w-6 text-accent-foreground" />
          <h2 className="text-2xl font-bold">Ask Kisan Mitra (AI)</h2>
        </div>
        <AssistantChat
          mode="assistant"
          allowImage={false}
          greeting="Namaste! 🌾 I'm Kisan Mitra. Ask me anything — sowing, fertilizer, pests, irrigation, prices or schemes. You can type in Hindi or English."
          suggestions={[
            "Which crop should I sow this month?",
            "गेहूं में कितना यूरिया डालें?",
            "How to stop pink bollworm in cotton?",
            "Make my farm plan for this week",
          ]}
        />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-2xl font-bold">Everything for your farm</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {TILES.map((t, i) => (
            <Link
              key={t.to}
              to={t.to}
              className={`group flex flex-col justify-between rounded-3xl border bg-card p-4 shadow-soft transition hover:-translate-y-1 ${i === 0 ? "col-span-2 md:col-span-1" : ""}`}
            >
              <span className={`grid h-14 w-14 place-items-center rounded-2xl ${t.cls}`}>
                <t.icon className="h-7 w-7" />
              </span>
              <span className="mt-4">
                <span className="block font-display text-xl font-bold">{t.label}</span>
                <span className="text-sm text-muted-foreground">{t.note}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-field p-6 text-primary-foreground">
        <h2 className="text-2xl font-bold">Need human help?</h2>
        <p className="mt-1 opacity-90">Kisan Call Centre is free, in 22 languages, 6 am – 10 pm.</p>
        <a href="tel:18001801551" className="mt-4 inline-flex rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground">
          📞 Call 1800-180-1551
        </a>
      </section>
    </AppShell>
  );
}
