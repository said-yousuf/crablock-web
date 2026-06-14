"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { HeroScrollJourney } from "@/components/HeroScrollJourney";
import { APP_URL, DOWNLOAD_URL } from "@/lib/constants";

const logoPath = "/logo.svg";

export default function Home() {
  const [headerSolid, setHeaderSolid] = useState(false);
  const [activeSection, setActiveSection] = useState("shield");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "> crablock init --core",
    "[OK] Initializing sovereign core...",
    "[OK] Runtime encryption active.",
  ]);

  const year = useMemo(() => new Date().getFullYear(), []);
  const navItems = useMemo(
    () => [
      ["SHIELD", "shield"],
      ["THREAT MAP", "threat-map"],
      ["TELEMETRY", "telemetry"],
      ["VAULT", "vault"],
    ] as const,
    []
  );

  useEffect(() => {
    const onScroll = () => setHeaderSolid(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["shield", "threat-map", "telemetry", "vault"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const onTerminalSubmit = () => {
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;
    const next = [`> ${cmd}`];
    if (cmd === "help") {
      next.push("Available: crablock init, crablock attach, crablock encrypt, clear");
    } else if (cmd === "clear") {
      setTerminalLines([]);
      setTerminalInput("");
      return;
    } else if (cmd.startsWith("crablock init")) {
      next.push("[OK] Generating quantum-resistant keypair...");
      next.push("[OK] Secure memory region established.");
    } else if (cmd.startsWith("crablock attach")) {
      next.push("[OK] Target handshake successful.");
    } else if (cmd.startsWith("crablock encrypt")) {
      next.push("[OK] Runtime encryption active.");
    } else {
      next.push(`[ERROR] Command not found: ${cmd}`);
    }
    setTerminalLines((prev) => [...prev, ...next]);
    setTerminalInput("");
  };

  const scrollToSection = (id: string) => {
    if (id === "shield") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-black text-[#e2e2e2] selection:bg-[#663af3] selection:text-white">
      <div className="orb-primary top-0 left-0" />
      <div className="orb-secondary top-1/4 right-0" />
      <div className="orb-primary bottom-0 right-1/4 !bg-[#00E676] !opacity-5" />

      <header className={`fixed top-0 z-50 hidden w-full border-b border-white/10 transition-all md:block ${headerSolid ? "bg-black/80 backdrop-blur-xl" : "bg-black/40 backdrop-blur-md"}`}>
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-12 py-6">
          <div className="flex items-center gap-4">
            <div className="logo-shimmer flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[#663af3]/30 bg-[#663af3]/20">
              <Image src={logoPath} alt="Crablock logo" width={32} height={32} className="h-8 w-8 object-contain" />
            </div>
            <div className="font-space text-2xl font-bold tracking-tighter text-white">CRABLOCK</div>
          </div>
          <nav className="flex items-center gap-8">
            {navItems.map(([item, id]) => (
              <a
                key={item}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
                className={`font-space text-xs font-medium uppercase tracking-[0.2em] transition-all ${
                  activeSection === id
                    ? "border-b border-violet-500 pb-1 text-violet-400"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
            <Link
              href="/docs"
              className="font-space text-xs font-medium uppercase tracking-[0.2em] text-zinc-500 transition-all hover:text-white"
            >
              Docs
            </Link>
          </nav>
          <div className="flex items-center gap-6">
            <a
              href={DOWNLOAD_URL}
              className="hidden items-center justify-center rounded border border-[#7dffa2]/50 bg-[#7dffa2]/10 px-4 py-2 font-space text-xs font-medium uppercase tracking-[0.2em] text-[#7dffa2] transition-all hover:border-[#7dffa2] hover:bg-[#7dffa2]/15 hover:text-white md:flex"
            >
              Download
            </a>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center justify-center rounded border border-[#cbbeff]/50 px-4 py-2 font-space text-xs font-medium uppercase tracking-[0.2em] text-[#cbbeff] transition-all hover:border-[#cbbeff] hover:text-white md:flex"
            >
              Sign in
            </a>
          </div>
        </div>
      </header>

      <div className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/70 px-4 py-4 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-2 font-space text-lg font-bold uppercase tracking-tight text-[#cbbeff]">
          <Image src={logoPath} alt="Crablock logo" width={20} height={20} />
          CRABLOCK
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/docs"
            className="rounded border border-white/15 px-3 py-1.5 font-space text-[10px] font-bold uppercase tracking-[0.12em] text-white/75"
          >
            Docs
          </Link>
          <a
            href={DOWNLOAD_URL}
            className="rounded border border-[#7dffa2]/40 px-3 py-1.5 font-space text-[10px] font-bold uppercase tracking-[0.12em] text-[#7dffa2]"
          >
            Download
          </a>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-[#cbbeff]/40 px-3 py-1.5 font-space text-[10px] font-bold uppercase tracking-[0.12em] text-[#cbbeff]"
          >
            App
          </a>
        </div>
      </div>

      <main className="pt-[80px] md:pt-[100px]">
        <HeroScrollJourney />

        <section id="shield-mobile" className="px-4 pt-8 pb-16 md:hidden">
          <div className="mx-auto flex max-w-[500px] flex-col items-center text-center">
            <div className="relative mb-5 h-44 w-44">
              <div className="absolute inset-0 rounded-xl border border-white/20 bg-black/40 shadow-[0_0_40px_rgba(102,58,243,0.3)] backdrop-blur-md" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-7xl text-[#cbbeff]">lock</span>
              </div>
            </div>
            <span className="font-mono-ui rounded border border-[#7dffa2]/30 bg-[#7dffa2]/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#7dffa2]">System Secure</span>
            <h1 className="mt-3 font-space text-5xl font-bold uppercase leading-none text-white">Absolute Sovereignty</h1>
            <p className="mt-4 text-[#cac3d9]">Military-grade zero-trust architecture designed for elite operators.</p>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded border border-[#cbbeff] bg-black py-4 font-space text-sm font-bold uppercase tracking-[0.15em] text-[#cbbeff] shadow-[0_0_20px_rgba(102,58,243,0.25)]"
            >
              DEPLOY ENCLAVE <span className="material-symbols-outlined text-base">rocket_launch</span>
            </a>
            <a
              href={DOWNLOAD_URL}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded border border-[#7dffa2]/70 bg-[#7dffa2]/10 py-4 font-space text-sm font-bold uppercase tracking-[0.15em] text-[#7dffa2] shadow-[0_0_20px_rgba(5,231,119,0.18)]"
            >
              DOWNLOAD DESKTOP <span className="material-symbols-outlined text-base">download</span>
            </a>
          </div>
        </section>

        <section id="threat-map" className="relative overflow-hidden border-t border-white/5 bg-[#1b1b1b]/30 px-4 py-20 md:px-10">
          <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
            <div className="absolute -left-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#663af3] blur-[120px]" />
            <div className="absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[#05e777] blur-[100px]" />
          </div>
          <div className="relative mx-auto max-w-[1440px]">
            <div className="flex flex-col items-center text-center">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.35em] text-[#7dffa2]/80">[ PIPELINE ]</span>
              <h2 className="font-space mt-3 text-3xl uppercase md:text-4xl">Kinetic Lifecycle</h2>
              <p className="mx-auto mt-3 max-w-2xl text-[#cac3d9]">
                Each phase emits signed telemetry—mirroring the scroll journey above: author, execute, seal, then attest in production.
              </p>
            </div>
            <div className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="pointer-events-none absolute left-[8%] right-[8%] top-8 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
              {[
                ["01 / BUILD", "Build", "Construct immutable environments with cryptographic verification.", "architecture"],
                ["02 / ENCRYPT", "Encrypt", "Apply quantum-resistant algorithms to secure data.", "enhanced_encryption"],
                ["03 / DEPLOY", "Deploy", "Launch sovereign enclaves across hybrid clouds.", "rocket_launch"],
                ["04 / RUNTIME", "Runtime", "Continuous telemetry and autonomous threat mitigation.", "monitoring"],
              ].map(([step, title, desc, icon]) => (
                <div
                  key={title}
                  className="glass-panel group relative rounded-xl border border-white/10 bg-[#101010]/70 p-6 shadow-[0_0_0_1px_rgba(102,58,243,0.08)] transition-colors hover:border-[#663af3]/35"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.2em] text-[#cbbeff]/80">{step}</span>
                    <span className="material-symbols-outlined text-[22px] text-[#663af3]/80 transition-transform group-hover:scale-110">{icon}</span>
                  </div>
                  <h3 className="font-space text-xl uppercase text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#cac3d9]">{desc}</p>
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-[#663af3]/40 via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="telemetry" className="px-4 py-20 md:px-10">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.35em] text-[#7dffa2]/85">[ TOPOLOGY ]</span>
                <h2 className="font-space mt-2 text-3xl uppercase md:text-4xl">Zero-Trust Architecture</h2>
                <p className="mt-3 max-w-2xl text-[#cac3d9]">
                  Isolated compute with hardware-rooted trust: user workloads never share an address space with key material, and every hop emits a signed trace.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 font-mono-ui text-[10px] uppercase tracking-[0.15em] text-white/55">
                {[
                  ["p99 isolate", "38ms"],
                  ["trust domain", "prod-eu-west"],
                  ["cipher", "AES-256-GCM"],
                  ["quote", "SEV-SNP"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded border border-white/10 bg-white/[0.03] px-3 py-2">
                    <div className="text-white/35">{k}</div>
                    <div className="mt-0.5 text-[#cbbeff]/90">{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="glass-panel rounded-xl border border-white/10 p-5">
                <h3 className="font-space text-sm uppercase tracking-[0.2em] text-white/80">Control plane guarantees</h3>
                <ul className="mt-4 space-y-2 font-mono-ui text-[12px] text-[#cac3d9]">
                  <li className="flex gap-2">
                    <span className="text-[#7dffa2]">—</span> No plaintext keys in host memory; wrapping keys never leave HSM boundary.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#7dffa2]">—</span> Continuous attestation: stale quotes fail closed at the edge proxy.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#7dffa2]">—</span> Operator actions are dual-control where policy marks `critical: true`.
                  </li>
                </ul>
              </div>
              <div className="scanner-container glass-panel rounded-xl border border-[#663af3]/20 p-6">
                <div className="scanner-line" />
                <div className="flex items-center justify-between rounded border border-white/10 bg-[#1f1f1f]/60 p-4 font-mono-ui text-xs uppercase text-[#cbbeff]">
                  <span>User Space</span>
                  <span className="text-[10px] text-white/40">untrusted</span>
                </div>
                <div className="mx-auto h-8 w-px bg-gradient-to-b from-[#cbbeff]/50 to-[#7dffa2]/50" />
                <div className="rounded border border-[#663af3]/40 bg-[#663af3]/15 p-4 font-mono-ui text-xs uppercase text-white shadow-[0_0_24px_rgba(102,58,243,0.12)]">
                  <div className="flex items-center justify-between gap-2">
                    <span>Crablock Enclave</span>
                    <span className="rounded border border-[#7dffa2]/30 px-2 py-0.5 text-[9px] tracking-widest text-[#7dffa2]">CONFIDENTIAL</span>
                  </div>
                  <p className="mt-2 text-[10px] font-normal normal-case tracking-normal text-white/50">
                    Memory encrypted · remote memory guard · side-channel mitigations tier-2
                  </p>
                </div>
                <div className="mx-auto h-8 w-px bg-gradient-to-b from-[#cbbeff]/50 to-[#7dffa2]/50" />
                <div className="flex items-center justify-between rounded border border-white/10 bg-[#1f1f1f]/60 p-4 font-mono-ui text-xs uppercase text-[#7dffa2]">
                  <span>Hardware Root of Trust</span>
                  <span className="text-[10px] text-white/40">TPM2 + RoT</span>
                </div>
              </div>
            </div>
            <div className="flex h-[440px] flex-col overflow-hidden rounded-xl border border-[#663af3]/30 bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.5),_inset_0_0_20px_rgba(102,58,243,0.1)]">
              <div className="font-mono-ui flex items-center gap-2 border-b border-white/5 bg-[#2a2a2a] px-4 py-2 text-xs text-[#cac3d9]">
                <div className="h-3 w-3 rounded-full bg-[#ffb4ab]" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-[#05e777]" />
                <span className="ml-4">crablock@terminal: ~</span>
                <span className="ml-auto rounded border border-white/10 px-2 py-0.5 text-[10px] text-white/45">interactive</span>
              </div>
              <div className="terminal-scroll font-mono-ui flex-1 overflow-y-auto p-4 text-sm">
                <p className="mb-3 border-l-2 border-[#05e777]/60 pl-3 text-[11px] text-white/45">
                  This console mirrors the hero pipeline—try <span className="text-[#cbbeff]">help</span>,{" "}
                  <span className="text-[#cbbeff]">crablock init</span>, or{" "}
                  <span className="text-[#cbbeff]">crablock encrypt</span>.
                </p>
                {terminalLines.map((line, index) => (
                  <p key={`${line}-${index}`} className={line.includes("[ERROR]") ? "text-[#ffb4ab]" : line.includes("[OK]") ? "text-[#7dffa2]" : "text-white/85"}>{line}</p>
                ))}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[#663af3]">&gt;</span>
                  <input
                    className="w-full border-none bg-transparent text-white outline-none"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onTerminalSubmit()}
                    placeholder="type 'help' or 'crablock init'"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 bg-[#0f0f12] px-4 py-2 font-mono-ui text-[10px] text-white/40">
                <span>
                  session <span className="text-[#cbbeff]/80">sess_2d9f</span>
                </span>
                <span>buffer 4 KiB · history persisted</span>
              </div>
            </div>
          </div>
          </div>
        </section>

        <section id="vault" className="relative overflow-hidden border-t border-white/5 px-4 py-24 text-center md:px-10">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#663af3]/15 blur-[140px]" />
          <div className="pointer-events-none absolute left-1/2 top-[62%] h-[280px] w-[520px] -translate-x-1/2 rounded-full bg-[#05e777]/10 blur-[110px]" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.35em] text-[#7dffa2]/85">[ COMMIT ]</span>
            <h2 className="font-space mt-4 text-4xl uppercase md:text-6xl">Ready to secure your foundation?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#cac3d9]">
              Bring the same narrative you just scrolled—editor, terminal, seal—into your organization’s SDLC with attestable releases.
            </p>
            <div className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
              {[
                ["Ship signed SBOMs", "Every build links SPDX + image digest to policy."],
                ["Prove isolation", "Export verifier bundle for auditors & customers."],
                ["Operate quietly", "Dashboards that read like a SOC, not a slide deck."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-lg border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
                  <div className="font-space text-[11px] font-bold uppercase tracking-[0.12em] text-white">{t}</div>
                  <p className="mt-2 text-[12px] leading-snug text-[#cac3d9]/90">{d}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-white/20 bg-[#663af3] px-10 py-4 font-space text-base uppercase shadow-[0_0_30px_rgba(102,58,243,0.5)] transition-transform hover:-translate-y-0.5"
              >
                START BUILDING TODAY
              </a>
              <a
                href={DOWNLOAD_URL}
                className="rounded border border-[#7dffa2]/45 bg-white/5 px-8 py-4 font-space text-sm uppercase tracking-[0.15em] text-[#7dffa2] backdrop-blur-sm transition-colors hover:border-[#7dffa2] hover:text-white"
              >
                DOWNLOAD DESKTOP
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black px-4 py-14 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-[1.1fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src={logoPath} alt="Crablock logo" width={28} height={28} />
              <span className="font-space text-lg font-black tracking-widest">CRABLOCK</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#cac3d9]/90">
              Sovereign encryption control plane for teams that need hardware-backed trust, not marketing promises.
            </p>
            <p className="font-space mt-6 text-[10px] uppercase tracking-[0.2em] text-violet-400/80">
              © {year} CRABLOCK SECURITY. [PROTECTED STATUS: ACTIVE]
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              ["Product", ["Shield", "Threat Map", "Telemetry", "Vault"]],
              ["Developers", ["Docs", "SDK", "CLI", "Status"]],
              ["Company", ["Security", "Careers", "Press", "Contact"]],
              ["Legal", ["Privacy", "Terms", "DPA", "Subprocessors"]],
            ].map(([title, links]) => (
              <div key={title as string}>
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-white/40">{title as string}</div>
                <ul className="mt-3 space-y-2">
                  {(links as string[]).map((l) => {
                    const href = l === "Docs" ? "/docs" : l === "CLI" ? DOWNLOAD_URL : "#";
                    const isExternal = href.startsWith("http");
                    return (
                      <li key={l}>
                        <a
                          href={href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="font-space text-[12px] uppercase tracking-[0.08em] text-zinc-500 transition-colors hover:text-violet-400"
                        >
                          {l}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-[1440px] flex-col gap-3 border-t border-white/5 pt-8 font-mono-ui text-[10px] text-white/35 md:flex-row md:items-center md:justify-between">
          <span>
            system digest <span className="text-[#cbbeff]/70">sha256:2d9f…e0ac</span> · build <span className="text-[#7dffa2]/80">stable</span>
          </span>
          <span className="uppercase tracking-[0.2em]">eu-west-1 · latency target 38ms p99</span>
        </div>
      </footer>
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-white/10 bg-black/85 px-4 pb-6 pt-2 backdrop-blur-xl md:hidden">
        {[
          ["grid_view", "#shield-mobile", "OPERATIONS"],
          ["radar", "#threat-map", "THREATS"],
          ["lock", "#vault", "VAULT"],
          ["terminal", "#telemetry", "SYSTEM"],
        ].map(([icon, href, label], i) => (
          <a key={icon as string} href={href as string} className={`flex w-16 flex-col items-center gap-1 ${i === 3 ? "text-violet-400" : "text-zinc-500"}`}>
            <span className="material-symbols-outlined text-[24px]">{icon as string}</span>
            <span className="font-space text-[10px] font-bold tracking-tight">{label as string}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
