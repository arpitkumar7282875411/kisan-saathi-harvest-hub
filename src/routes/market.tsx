import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Phone, Search, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { toast } from "sonner";
import { AppShell, PageTitle } from "@/components/AppShell";
import { MANDI } from "@/lib/farm-data";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Mandi Prices & Sell to Buyers | KisanSathi" },
      { name: "description", content: "Check mandi prices and connect directly with buyers and sellers — no middlemen." },
      { property: "og:title", content: "Mandi & Buyers — KisanSathi" },
      { property: "og:description", content: "Mandi prices and direct farmer–buyer listings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const input = "w-full rounded-2xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring";

function Page() {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [form, setForm] = useState({ seller_name: "", phone: "", location: "", crop: "", quantity: "", price: "", listing_type: "sell" });
  const [saving, setSaving] = useState(false);
  const { data: listings = [] } = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("market_listings").select("*").order("created_at", { ascending: false }).limit(50);
      if (error) throw error;
      return data;
    },
  });

  const rows = MANDI.filter((m) => (m.crop + m.mandi + m.state).toLowerCase().includes(q.toLowerCase()));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("market_listings").insert(form);
    setSaving(false);
    if (error) return toast.error("Could not post. Check name and phone.");
    toast.success("Your listing is live!");
    setForm({ ...form, crop: "", quantity: "", price: "" });
    qc.invalidateQueries({ queryKey: ["listings"] });
  };

  return (
    <AppShell>
      <PageTitle title="Mandi & Buyers 🛒" subtitle="Know the price. Sell directly." />

      <h2 className="mb-3 text-2xl font-bold">Today's mandi rates</h2>
      <label className="mb-3 flex items-center gap-2 rounded-2xl border bg-card px-4 py-3">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search crop, mandi or state…" className="flex-1 bg-transparent outline-none" />
      </label>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {rows.map((m) => (
          <div key={m.crop + m.mandi} className="w-48 shrink-0 rounded-3xl border bg-card p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="font-bold">{m.crop}</p>
              {m.trend === "up" ? <TrendingUp className="h-5 w-5 text-success" /> : m.trend === "down" ? <TrendingDown className="h-5 w-5 text-destructive" /> : <Minus className="h-5 w-5 text-muted-foreground" />}
            </div>
            <p className="text-sm text-muted-foreground">{m.mandi}, {m.state}</p>
            <p className="mt-2 font-display text-2xl font-extrabold text-primary">₹{m.modal.toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground">₹{m.min}–{m.max} / quintal</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">Indicative rates. For live prices check agmarknet.gov.in or enam.gov.in.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_360px]">
        <section>
          <h2 className="mb-3 text-2xl font-bold">Buy & sell directly</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {listings.map((l) => (
              <div key={l.id} className="rounded-3xl border bg-card p-4 shadow-soft">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${l.listing_type === "buy" ? "bg-sky/15 text-sky" : "bg-accent/40 text-accent-foreground"}`}>
                  {l.listing_type === "buy" ? "WANTS TO BUY" : "FOR SALE"}
                </span>
                <h3 className="mt-2 text-xl font-bold">{l.crop} · {l.quantity}</h3>
                <p className="font-semibold text-primary">{l.price}</p>
                <p className="text-sm text-muted-foreground">{l.seller_name} · {l.location}</p>
                <a href={`tel:${l.phone}`} className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-semibold text-primary-foreground">
                  <Phone className="h-4 w-4" /> Call
                </a>
              </div>
            ))}
          </div>
        </section>
        <form onSubmit={submit} className="h-fit space-y-3 rounded-3xl border bg-card p-5 shadow-soft">
          <h3 className="text-xl font-bold">Post your crop</h3>
          <div className="flex gap-2">
            {(["sell", "buy"] as const).map((t) => (
              <button type="button" key={t} onClick={() => setForm({ ...form, listing_type: t })} className={`flex-1 rounded-full border py-2 font-semibold ${form.listing_type === t ? "border-primary bg-primary text-primary-foreground" : ""}`}>
                {t === "sell" ? "I want to sell" : "I want to buy"}
              </button>
            ))}
          </div>
          <input required className={input} placeholder="Your name" value={form.seller_name} onChange={(e) => setForm({ ...form, seller_name: e.target.value })} />
          <input required type="tel" className={input} placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input required className={input} placeholder="Village / District" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <input required className={input} placeholder="Crop (e.g. Onion)" value={form.crop} onChange={(e) => setForm({ ...form, crop: e.target.value })} />
          <div className="grid grid-cols-2 gap-2">
            <input required className={input} placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            <input required className={input} placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <button disabled={saving} className="w-full rounded-full bg-accent py-3 text-lg font-bold text-accent-foreground disabled:opacity-60">
            {saving ? "Posting…" : "Post listing"}
          </button>
        </form>
      </div>
    </AppShell>
  );
}
