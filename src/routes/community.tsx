import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageTitle } from "@/components/AppShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Farmer Community — Ask & Share | KisanSathi" },
      { name: "description", content: "Join farmers across India. Ask questions, share tips, prices and experiences." },
      { property: "og:title", content: "Farmer Community — KisanSathi" },
      { property: "og:description", content: "Farmers helping farmers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const CATS = ["General", "Crops", "Irrigation", "Market", "Schemes", "Livestock"];
const input = "w-full rounded-2xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring";

function timeAgo(d: string) {
  const m = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
  if (m < 60) return `${Math.max(1, m)} min ago`;
  if (m < 1440) return `${Math.floor(m / 60)} h ago`;
  return `${Math.floor(m / 1440)} d ago`;
}

function Page() {
  const qc = useQueryClient();
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ author_name: "", location: "", category: "General", content: "" });
  const [saving, setSaving] = useState(false);
  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("community_posts").select("*").order("created_at", { ascending: false }).limit(100);
      if (error) throw error;
      return data;
    },
  });
  const shown = filter === "All" ? posts : posts.filter((p) => p.category === filter);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("community_posts").insert(form);
    setSaving(false);
    if (error) return toast.error("Could not post. Please fill your name and message.");
    toast.success("Posted to the community!");
    setForm({ ...form, content: "" });
    qc.invalidateQueries({ queryKey: ["posts"] });
  };

  return (
    <AppShell>
      <PageTitle title="Kisan Chaupal 🤝" subtitle="Farmers helping farmers. Ask, share, learn." />
      <div className="grid gap-6 md:grid-cols-[360px_1fr]">
        <form onSubmit={submit} className="h-fit space-y-3 rounded-3xl bg-field p-5 text-primary-foreground shadow-soft md:sticky md:top-20">
          <h3 className="text-xl font-bold">Share with farmers</h3>
          <div className="grid grid-cols-2 gap-2 text-foreground">
            <input required className={input} placeholder="Your name" value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} />
            <input className={input} placeholder="Village / State" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <select className={`${input} text-foreground`} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {CATS.map((c) => <option key={c}>{c}</option>)}
          </select>
          <textarea required rows={4} className={`${input} text-foreground`} placeholder="Ask a question or share a tip…" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <button disabled={saving} className="w-full rounded-full bg-accent py-3 text-lg font-bold text-accent-foreground disabled:opacity-60">
            {saving ? "Posting…" : "Post"}
          </button>
        </form>

        <section>
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {["All", ...CATS].map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`shrink-0 rounded-full border px-4 py-2 font-semibold ${filter === c ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {shown.map((p) => (
              <article key={p.id} className="rounded-3xl border bg-card p-5 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent font-display text-lg font-bold text-accent-foreground">
                    {p.author_name.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-bold">{p.author_name}</p>
                    <p className="flex items-center gap-1 truncate text-sm text-muted-foreground">
                      {p.location && <><MapPin className="h-3 w-3" /> {p.location} · </>}{timeAgo(p.created_at)}
                    </p>
                  </div>
                  <span className="ml-auto shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary">{p.category}</span>
                </div>
                <p className="mt-3 whitespace-pre-wrap">{p.content}</p>
              </article>
            ))}
            {shown.length === 0 && <p className="text-muted-foreground">No posts yet. Be the first!</p>}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
