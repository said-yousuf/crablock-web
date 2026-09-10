import type { Metadata } from "next";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DOWNLOAD_ABSOLUTE_URL, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Crablock Cloud — Scheduled Maintenance",
  description:
    "Crablock Cloud is temporarily offline for scheduled maintenance. Continue your work with the offline Crablock Desktop app.",
  robots: { index: false, follow: false },
};

const statusRows = [
  ["cloud console", "OFFLINE · MAINTENANCE", "warn"],
  ["sign-in & sign-up", "PAUSED", "warn"],
  ["desktop app", "ONLINE · OFFLINE MODE", "ok"],
  ["your local work", "SAFE", "ok"],
] as const;

const installerVersion = "0.1.3";

export default function MaintenancePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-black text-[#e2e2e2] selection:bg-[#663af3] selection:text-white">
      <div className="orb-primary top-[-180px] left-1/2 -translate-x-1/2" />
      <div className="orb-secondary right-0 bottom-0" />

      <header className="relative z-10 border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6">
          <a href={SITE_URL} className="flex items-center gap-3">
            <span className="logo-shimmer flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[#663af3]/30 bg-[#663af3]/20">
              <Image
                src="/logo.png"
                alt="Crablock logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </span>
            <span className="font-space text-xl font-bold tracking-tighter text-white">
              CRABLOCK
            </span>
          </a>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded border border-[#eab308]/40 bg-[#eab308]/10 px-3 py-1.5 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#eab308] sm:inline-flex">
              <span className="maintenance-dot h-2 w-2 rounded-full bg-[#eab308]" />
              cloud: maintenance
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />

        <div className="relative mx-auto w-full max-w-2xl">
          <div className="flex flex-col items-center text-center">
            <span className="font-mono-ui rounded border border-[#eab308]/40 bg-[#eab308]/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#eab308]">
              [ Scheduled maintenance ]
            </span>
            <div className="maintenance-icon mt-6 flex h-28 w-28 items-center justify-center rounded-xl border border-[#eab308]/40 bg-black/40">
              <span className="material-symbols-outlined text-6xl text-[#eab308]">
                cloud_off
              </span>
            </div>
            <h1 className="font-space mt-6 text-4xl font-bold uppercase leading-[1.08] text-white sm:text-5xl">
              The cloud is in maintenance mode.
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#cac3d9] sm:text-base">
              Crablock Cloud is temporarily offline for scheduled maintenance.
              Your work is safe — keep going with the offline Crablock Desktop
              app while we bring the cloud back.
            </p>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-xl border border-[#663af3]/30 bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.5),_inset_0_0_20px_rgba(102,58,243,0.1)]">
            <div className="scanner-line-amber" />
            <div className="flex items-center justify-between border-b border-white/10 bg-[#1a1a1f] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ffb4ab]" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-[#05e777]" />
              </div>
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-white/45">
                status · app.crablock.cloud
              </span>
            </div>
            <div className="font-mono-ui space-y-3 p-5 text-[12px] sm:text-[13px]">
              {statusRows.map(([label, value, tone]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="text-white/50">
                    <span className="text-[#663af3]">&gt;</span> {label}
                  </span>
                  <span
                    className={
                      tone === "warn" ? "text-[#eab308]" : "text-[#7dffa2]"
                    }
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={SITE_URL}
              className="action-violet inline-flex items-center justify-center gap-2 rounded border border-[#cbbeff]/45 px-8 py-4 font-space text-sm font-bold uppercase tracking-[0.14em] text-[#cbbeff] transition-colors hover:border-[#cbbeff] hover:text-white"
            >
              <span className="material-symbols-outlined text-base">home</span>
              Back to home
            </a>
            <a
              href={DOWNLOAD_ABSOLUTE_URL}
              className="action-green inline-flex items-center justify-center gap-2 rounded border border-[#7dffa2]/55 bg-[#7dffa2]/10 px-8 py-4 font-space text-sm font-bold uppercase tracking-[0.14em] text-[#7dffa2] backdrop-blur-sm transition-colors hover:border-[#7dffa2] hover:text-white"
            >
              <span className="material-symbols-outlined text-base">
                download
              </span>
              Download desktop app
            </a>
          </div>
          <p className="mt-3 text-center font-mono-ui text-[10px] uppercase tracking-[0.16em] text-white/35">
            Crablock Desktop for Windows · v{installerVersion} · works fully
            offline
          </p>
        </div>
      </main>

      <footer className="relative border-t border-white/10 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-2 font-mono-ui text-[10px] uppercase tracking-[0.2em] text-white/35 sm:flex-row">
          <span>
            crablock cloud ·{" "}
            <span className="text-[#eab308]/80">maintenance window</span>
          </span>
          <span>
            protection <span className="text-[#cbbeff]/70">AES-256-GCM</span> ·
            desktop{" "}
            <span className="text-[#7dffa2]/80">v{installerVersion}</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
