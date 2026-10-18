import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Droplets, Home, Landmark, Newspaper, ScanLine, Store, Users, Sprout } from "lucide-react";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/crop-doctor", label: "Crop Doctor", icon: ScanLine },
  { to: "/market", label: "Market", icon: Store },
  { to: "/community", label: "Community", icon: Users },
  { to: "/schemes", label: "Schemes", icon: Landmark },
  { to: "/news", label: "News", icon: Newspaper },
  { to: "/irrigation", label: "Irrigation", icon: Droplets },
] as const;

const MOBILE = NAV.slice(0, 5);

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-field text-primary-foreground">
              <Sprout className="h-6 w-6" />
            </span>
            <span className="truncate font-display text-2xl font-bold text-primary">KisanSathi</span>
          </Link>
          <nav className="hidden gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary"
                activeProps={{ className: "bg-secondary text-primary" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-1 md:hidden">
            <Link to="/news" aria-label="News" className="grid h-10 w-10 place-items-center rounded-full bg-muted text-foreground">
              <Newspaper className="h-5 w-5" />
            </Link>
            <Link to="/irrigation" aria-label="Irrigation" className="grid h-10 w-10 place-items-center rounded-full bg-muted text-sky">
              <Droplets className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-5">{children}</main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t bg-card pb-[env(safe-area-inset-bottom)] md:hidden">
        {MOBILE.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            activeOptions={{ exact: n.to === "/" }}
            className="flex flex-col items-center gap-1 py-2 text-xs font-semibold text-muted-foreground"
            activeProps={{ className: "text-primary" }}
          >
            <n.icon className="h-6 w-6" />
            {n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h1 className="text-3xl font-bold text-primary md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
