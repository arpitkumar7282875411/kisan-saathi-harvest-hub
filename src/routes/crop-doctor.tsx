import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageTitle } from "@/components/AppShell";
import { AssistantChat } from "@/components/AssistantChat";
import doctorImg from "@/assets/crop-doctor.jpg";

export const Route = createFileRoute("/crop-doctor")({
  head: () => ({
    meta: [
      { title: "Crop Doctor — Find Plant Diseases | KisanSathi" },
      { name: "description", content: "Describe symptoms or add a leaf photo and get disease diagnosis with organic and chemical treatment." },
      { property: "og:title", content: "Crop Doctor — KisanSathi" },
      { property: "og:description", content: "AI help for plant diseases, pests and nutrient problems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const COMMON = [
  { name: "Yellow leaves", hint: "Often nitrogen deficiency or waterlogging" },
  { name: "Brown spots", hint: "Early blight, leaf spot — fungal" },
  { name: "White powder", hint: "Powdery mildew" },
  { name: "Holes in leaves", hint: "Caterpillars, beetles" },
  { name: "Wilting plant", hint: "Root rot, wilt disease, low water" },
  { name: "Curled leaves", hint: "Virus via whitefly / aphids" },
];

function Page() {
  return (
    <AppShell>
      <PageTitle title="Crop Doctor 🩺" subtitle="Tell me what you see on your crop. A photo is optional." />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_320px]">
        <AssistantChat
          mode="doctor"
          greeting="Describe the problem: crop name, what the leaves/fruits look like, and since when. You can also attach a photo with the camera button if you like."
          placeholder="e.g. Tomato leaves have brown rings…"
          suggestions={COMMON.map((c) => `My crop has ${c.name.toLowerCase()}. What is it?`)}
        />
        <aside className="space-y-3">
          <img src={doctorImg} alt="Diseased tomato leaf" loading="lazy" width={1024} height={768} className="rounded-3xl object-cover shadow-soft" />
          <div className="rounded-3xl border bg-card p-4">
            <h3 className="mb-2 text-lg font-bold">Quick symptom guide</h3>
            <ul className="space-y-2">
              {COMMON.map((c) => (
                <li key={c.name} className="rounded-2xl bg-muted px-3 py-2">
                  <b>{c.name}</b>
                  <p className="text-sm text-muted-foreground">{c.hint}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
