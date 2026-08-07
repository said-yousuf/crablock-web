"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { HeroScrollJourney } from "@/components/HeroScrollJourney";
import { ThemeToggle } from "@/components/ThemeToggle";
import { APP_URL, DOWNLOAD_URL } from "@/lib/constants";

const logoPath = "/logo.png";

const workflowSteps = [
  [
    "01",
    "Detect project",
    "Crablock reads the selected folder and identifies Laravel/PHP, Node, React/Nest, Rust, Go, or prepared DFMS-style apps before anything is bundled.",
    "manage_search",
  ],
  [
    "02",
    "Write config",
    "CrablockFile records the entry command, ports, runtime sidecars, writable paths, and open URL. Without this recipe the package is incomplete.",
    "contract_edit",
  ],
  [
    "03",
    "Bundle runtimes",
    "Portable Node, PHP, Composer, database sidecars, and project build output can travel with the app so customer machines stay clean.",
    "deployed_code",
  ],
  [
    "04",
    "Encrypt and sign",
    "The packer creates an AES-256-GCM encrypted .crabundle, signs it for launcher verification, and registers its key through the cloud API.",
    "enhanced_encryption",
  ],
  [
    "05",
    "Ship handoff",
    "The customer receives Start and Stop launchers, the encrypted bundle, and an API license. The raw package key is not delivered.",
    "folder_copy",
  ],
] as const;

const desktopCapabilities = [
  [
    "Encryption workspace",
    "Select the project folder, review detected framework output, write CrablockFile, then encrypt with cloud key delivery enabled by default.",
    "lock",
  ],
  [
    "Advanced packaging",
    "Attach portable Node, PHP, Composer, MySQL/MariaDB, signing policy, license settings, and runtime data paths when the customer PC is clean.",
    "tune",
  ],
  [
    "Running support",
    "Choose a .crabundle, use the remote license path, inspect metadata, run the app, stop it, and check customer startup.",
    "play_circle",
  ],
] as const;

const deliveryFiles = [
  "app_name/",
  "  Start app_name.exe",
  "  Stop app_name.exe",
  "  app_name.customer.crabundle",
  "  app_name.license",
] as const;

const deliveryHighlights = [
  ["No developer tools", "Customer machines do not need Node, PHP, pnpm, Composer, or framework CLIs when runtimes are bundled."],
  ["Persistent app data", "Installed files live under LOCALAPPDATA while database, logs, and customer data stay in a separate data path."],
  ["Supportable runtime", "The runner can inspect, verify, run, stop, and reopen the packaged app without exposing the original source folder."],
] as const;

const footerGroups = [
  {
    title: "Product",
    links: [
      ["Encryption", "#top"],
      ["Workflow", "#threat-map"],
      ["Running", "#telemetry"],
      ["Delivery", "#vault"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Documentation", "/docs"],
      ["Desktop installer", DOWNLOAD_URL],
      ["Sign in", APP_URL],
      ["Key API docs", "https://key.crablock.cloud/docs"],
    ],
  },
] as const;

export default function Home() {
  const workflowRef = useRef<HTMLElement | null>(null);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [activeSection, setActiveSection] = useState("shield");
  const [workflowProgress, setWorkflowProgress] = useState(0);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "> crablock-pack bundle --project C:\\apps\\customer --output C:\\out\\customer.crabundle",
    "[OK] CrablockFile detected: services, runtimes, open_url.",
    "[OK] Delivery folder ready for customer handoff.",
  ]);

  const year = useMemo(() => new Date().getFullYear(), []);
  const navItems = useMemo(
    () => [
      ["ENCRYPTION", "shield"],
      ["WORKFLOW", "threat-map"],
      ["RUNNING", "telemetry"],
      ["DELIVERY", "vault"],
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

  useEffect(() => {
    const updateWorkflowProgress = () => {
      const section = workflowRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const start = viewportHeight * 0.72;
      const end = viewportHeight * 0.18 - rect.height;
      const distance = start - end;
      const rawProgress = distance > 0 ? (start - rect.top) / distance : 0;

      setWorkflowProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    updateWorkflowProgress();
    window.addEventListener("scroll", updateWorkflowProgress, { passive: true });
    window.addEventListener("resize", updateWorkflowProgress);

    return () => {
      window.removeEventListener("scroll", updateWorkflowProgress);
      window.removeEventListener("resize", updateWorkflowProgress);
    };
  }, []);

  const onTerminalSubmit = () => {
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;
    const next = [`> ${cmd}`];
    if (cmd === "help") {
      next.push("Available: crablock-pack bundle, crablock-runner run, crablock app ps, clear");
    } else if (cmd === "clear") {
      setTerminalLines([]);
      setTerminalInput("");
      return;
    } else if (cmd.startsWith("crablock-pack bundle")) {
      next.push("[OK] Scanning framework profile and CrablockFile...");
      next.push("[OK] Runtime assets and include paths locked.");
      next.push("[OK] Wrote signed .crabundle package.");
    } else if (cmd.startsWith("crablock-runner run")) {
      next.push("[OK] Verified package metadata and key source.");
      next.push("[OK] Installed under LOCALAPPDATA\\Crablock and opened app URL.");
    } else if (cmd.startsWith("crablock app")) {
      next.push("[OK] Service registry loaded; logs and stop commands available.");
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
    <div id="top" className="relative min-h-screen bg-black text-[#e2e2e2] selection:bg-[#663af3] selection:text-white">
      <div className="orb-primary top-0 left-0" />
      <div className="orb-secondary top-1/4 right-0" />
      <div className="orb-primary bottom-0 right-1/4 !bg-[#00E676] !opacity-5" />

      <header className={`fixed top-0 z-50 hidden w-full border-b border-white/10 transition-all lg:block ${headerSolid ? "bg-black/80 backdrop-blur-xl" : "bg-black/40 backdrop-blur-md"}`}>
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-5 xl:px-12 xl:py-6">
          <div className="flex items-center gap-4">
            <div className="logo-shimmer flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-[#663af3]/30 bg-[#663af3]/20">
              <Image src={logoPath} alt="Crablock logo" width={32} height={32} className="h-8 w-8 object-contain" />
            </div>
            <div className="font-space text-2xl font-bold tracking-tighter text-white">CRABLOCK</div>
          </div>
          <nav className="flex items-center gap-5 xl:gap-8">
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
          <div className="flex items-center gap-3 xl:gap-6">
            <ThemeToggle />
            <a
              href={DOWNLOAD_URL}
              className="action-green hidden items-center justify-center rounded border border-[#7dffa2]/50 bg-[#7dffa2]/10 px-3 py-2 font-space text-xs font-medium uppercase tracking-[0.2em] text-[#7dffa2] transition-all hover:border-[#7dffa2] hover:bg-[#7dffa2]/15 hover:text-white lg:flex xl:px-4"
            >
              Download
            </a>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sign-in-action hidden h-10 items-center justify-center whitespace-nowrap rounded border px-5 font-space text-sm font-semibold normal-case tracking-normal shadow-[0_10px_22px_rgba(0,0,0,0.35),_inset_0_1px_0_rgba(255,255,255,0.08)] transition-all lg:flex"
            >
              <span className="text-[#e7e7ea]">Sign in</span>
            </a>
          </div>
        </div>
      </header>

      <div className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/70 px-3 py-4 backdrop-blur-xl sm:px-4 lg:hidden">
        <div className="flex items-center gap-2 font-space text-lg font-bold uppercase tracking-tight text-[#cbbeff]">
          <Image src={logoPath} alt="Crablock logo" width={20} height={20} />
          <span className="hidden min-[360px]:inline">CRABLOCK</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/docs"
            className="rounded border border-white/15 px-3 py-1.5 font-space text-[10px] font-bold uppercase tracking-[0.12em] text-white/75"
          >
            Docs
          </Link>
          <a
            href={DOWNLOAD_URL}
            className="action-green rounded border border-[#7dffa2]/40 px-3 py-1.5 font-space text-[10px] font-bold uppercase tracking-[0.12em] text-[#7dffa2]"
          >
            Download
          </a>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sign in"
            className="sign-in-action hidden items-center justify-center gap-2 whitespace-nowrap rounded-[12px] border px-2.5 py-1.5 font-space text-[10px] font-semibold normal-case tracking-normal shadow-[0_8px_16px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.08)] transition-all sm:inline-flex"
          >
            <span className="hidden min-[400px]:inline">Sign in</span>
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
            <span className="font-mono-ui rounded border border-[#7dffa2]/30 bg-[#7dffa2]/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#7dffa2]">Package protection</span>
            <h1 className="mt-3 font-space text-5xl font-bold uppercase leading-none text-white">Encrypt. License. Run.</h1>
            <p className="mt-4 text-[#cac3d9]">Signed application delivery with API-managed runtime key access.</p>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="action-violet mt-6 flex w-full items-center justify-center gap-2 rounded border border-[#cbbeff] bg-black py-4 font-space text-sm font-bold uppercase tracking-[0.15em] text-[#cbbeff] shadow-[0_0_20px_rgba(102,58,243,0.25)]"
            >
              SIGN IN <span className="material-symbols-outlined text-base">arrow_outward</span>
            </a>
            <a
              href={DOWNLOAD_URL}
              className="action-green mt-3 flex w-full items-center justify-center gap-2 rounded border border-[#7dffa2]/70 bg-[#7dffa2]/10 py-4 font-space text-sm font-bold uppercase tracking-[0.15em] text-[#7dffa2] shadow-[0_0_20px_rgba(5,231,119,0.18)]"
            >
              DOWNLOAD DESKTOP <span className="material-symbols-outlined text-base">download</span>
            </a>
          </div>
        </section>

        <section
          id="threat-map"
          ref={workflowRef}
          className="relative overflow-hidden border-t border-white/5 bg-[#0d0d0f] px-6 py-24 md:px-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />
          <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.42fr_0.58fr]">
            <div className="lg:sticky lg:top-28 lg:h-fit">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.35em] text-[#7dffa2]/80">[ BUILD WORKFLOW ]</span>
              <h2 className="font-space mt-4 max-w-3xl text-[2rem] font-bold uppercase leading-[1.08] text-white sm:text-5xl md:text-6xl">
                From source folder to encrypted delivery.
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#cac3d9] sm:text-base">
                Crablock packages the app in the same order the desktop workflow expects: detect the project, write the config, bundle runtimes, encrypt the output, then ship a runnable customer folder.
              </p>
              <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 font-mono-ui text-[10px] uppercase tracking-[0.16em] text-white/45 sm:grid-cols-3">
                {["Config required", "Runtime aware", "Signed output"].map((item) => (
                  <div key={item} className="border border-white/10 bg-black/35 px-3 py-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[960px] pl-2 sm:pl-4">
              <svg
                className="pointer-events-none absolute left-0 top-0 h-full w-[92px] overflow-visible sm:left-4 sm:w-[116px] lg:left-2"
                viewBox="0 0 116 1120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="workflowPathGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#cbbeff" stopOpacity="0.5" />
                    <stop offset="54%" stopColor="#7dffa2" stopOpacity="0.88" />
                    <stop offset="100%" stopColor="#05e777" stopOpacity="0.72" />
                  </linearGradient>
                  <filter id="workflowPathGlow" x="-80%" y="-6%" width="260%" height="112%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M58 18 C22 132 96 218 58 330 C20 448 96 548 58 668 C25 779 92 890 58 1088"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.13"
                  strokeLinecap="round"
                  strokeWidth="8"
                />
                <path
                  className="workflow-path-dash"
                  d="M58 18 C22 132 96 218 58 330 C20 448 96 548 58 668 C25 779 92 890 58 1088"
                  fill="none"
                  stroke="#cbbeff"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
                <path
                  className="workflow-path-progress"
                  d="M58 18 C22 132 96 218 58 330 C20 448 96 548 58 668 C25 779 92 890 58 1088"
                  fill="none"
                  filter="url(#workflowPathGlow)"
                  pathLength={1}
                  stroke="url(#workflowPathGradient)"
                  strokeLinecap="round"
                  strokeWidth="5"
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: 1 - workflowProgress,
                  }}
                />
                {workflowSteps.map(([step], index) => {
                  const y = 34 + index * 260;
                  const reached = workflowProgress >= index / Math.max(workflowSteps.length - 1, 1) - 0.02;

                  return (
                    <g key={step} className={reached ? "opacity-100" : "opacity-45"}>
                      <circle cx="58" cy={y} r="18" fill="#08080a" stroke={reached ? "#7dffa2" : "#ffffff"} strokeOpacity={reached ? "0.85" : "0.24"} strokeWidth="2" />
                      <circle cx="58" cy={y} r="5" fill={reached ? "#7dffa2" : "#cbbeff"} />
                    </g>
                  );
                })}
              </svg>

              <div className="relative space-y-10 pl-20 sm:pl-28 lg:pl-32">
                {workflowSteps.map(([step, title, desc, icon], index) => {
                  const reached = workflowProgress >= index / Math.max(workflowSteps.length - 1, 1) - 0.02;

                  return (
                    <article
                      key={title}
                      className={`min-h-[168px] border border-white/10 bg-[#070708]/88 p-5 shadow-[0_18px_42px_rgba(0,0,0,0.32)] transition-colors duration-300 sm:p-6 ${
                        reached ? "border-[#7dffa2]/35 bg-[#0a100d]/85" : "border-white/10"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="font-mono-ui text-[10px] font-bold uppercase tracking-[0.24em] text-[#7dffa2]">
                          step {step}
                        </div>
                        <span className="material-symbols-outlined text-[24px] text-[#cbbeff]">{icon}</span>
                      </div>
                      <h3 className="font-space mt-4 text-2xl font-bold uppercase leading-tight text-white sm:text-3xl">{title}</h3>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#cac3d9] sm:text-[15px]">{desc}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="telemetry" className="border-t border-white/5 px-6 py-24 md:px-10">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.35em] text-[#7dffa2]/85">[ DESKTOP 0.1.3 ]</span>
                <h2 className="font-space mt-3 break-words text-[1.75rem] font-bold uppercase leading-[1.12] text-white [overflow-wrap:anywhere] sm:text-4xl md:text-5xl">
                  The app is now the packaging cockpit.
                </h2>
                <p className="mt-4 max-w-[342px] text-[15px] leading-7 text-[#cac3d9] [overflow-wrap:anywhere] sm:max-w-xl sm:text-base">
                  Crablock Desktop bundles the CLI sidecars and turns the customer workflow into selectable steps:
                  encrypt, build delivery folder, check package metadata, run, and stop.
                </p>
                <div className="mt-8 space-y-4">
                  {desktopCapabilities.map(([title, copy, icon]) => (
                    <div key={title} className="flex gap-4 border-l border-white/10 pl-4">
                      <span className="material-symbols-outlined mt-0.5 text-[22px] text-[#7dffa2]">{icon}</span>
                      <div>
                        <h3 className="font-space text-sm font-bold uppercase tracking-[0.16em] text-white">{title}</h3>
                        <p className="mt-1 text-sm leading-6 text-[#cac3d9]">{copy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-xl border border-[#663af3]/30 bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.5),_inset_0_0_20px_rgba(102,58,243,0.1)]">
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#1a1a1f] px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#ffb4ab]" />
                      <span className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span className="h-3 w-3 rounded-full bg-[#05e777]" />
                    </div>
                    <span className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-white/45">Crablock Desktop</span>
                  </div>
                  <div className="p-5">
                    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                      <div className="font-space text-xs font-bold uppercase tracking-[0.18em] text-[#cbbeff]">Encryption</div>
                      <div className="mt-4 space-y-3">
                        {["Project detected", "CrablockFile ready", "Runtime assets attached", "Delivery folder built"].map((item, index) => (
                          <div key={item} className="flex items-center gap-3 font-mono-ui text-[11px] text-[#cac3d9]">
                            <span className={`h-2.5 w-2.5 rounded-full ${index < 3 ? "bg-[#7dffa2]" : "bg-[#663af3]"}`} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {["Laravel", "Node", "React/Nest", "Rust/Go"].map((stack) => (
                        <div key={stack} className="rounded border border-white/10 bg-black/45 px-3 py-2 font-mono-ui text-[10px] uppercase tracking-[0.14em] text-white/55">
                          {stack}
                        </div>
                      ))}
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
                      Try <span className="text-[#cbbeff]">help</span>,{" "}
                      <span className="text-[#cbbeff]">crablock-pack bundle</span>, or{" "}
                      <span className="text-[#cbbeff]">crablock-runner run</span>.
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
                        placeholder="type 'help' or 'crablock-pack bundle'"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 bg-[#0f0f12] px-4 py-2 font-mono-ui text-[10px] text-white/40">
                    <span>
                      installer <span className="text-[#cbbeff]/80">v0.1.3</span>
                    </span>
                    <span>runner + pack sidecars bundled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="vault" className="relative overflow-hidden border-t border-white/5 bg-[#090909] px-6 py-24 md:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:88px_88px] opacity-25" />
          <div className="relative z-10 mx-auto grid min-w-0 max-w-[1440px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="min-w-0">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.35em] text-[#7dffa2]/85">[ CUSTOMER HANDOFF ]</span>
              <h2 className="font-space mt-4 break-words text-[1.75rem] font-bold uppercase leading-[1.12] text-white [overflow-wrap:anywhere] sm:text-4xl md:text-6xl">
                One folder instead of an engineering handover.
              </h2>
              <p className="mt-4 max-w-[342px] text-[15px] leading-7 text-[#cac3d9] [overflow-wrap:anywhere] sm:max-w-2xl sm:text-base">
                The modern Crablock output is practical: Start and Stop launchers, an encrypted customer bundle,
                and an API license. The raw package key remains behind the cloud key service.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {deliveryHighlights.map(([title, copy]) => (
                  <div key={title} className="rounded-lg border border-white/10 bg-black/40 p-4 backdrop-blur-sm">
                    <div className="font-space text-[11px] font-bold uppercase tracking-[0.12em] text-white">{title}</div>
                    <p className="mt-2 text-[12px] leading-5 text-[#cac3d9]/90">{copy}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href={DOWNLOAD_URL}
                  className="action-green inline-flex items-center justify-center rounded border border-[#7dffa2]/55 bg-[#7dffa2]/10 px-8 py-4 font-space text-sm font-bold uppercase tracking-[0.14em] text-[#7dffa2] backdrop-blur-sm transition-colors hover:border-[#7dffa2] hover:text-white"
                >
                  Download Desktop
                </a>
                <Link
                  href="/docs"
                  className="action-violet inline-flex items-center justify-center rounded border border-[#cbbeff]/45 px-8 py-4 font-space text-sm font-bold uppercase tracking-[0.14em] text-[#cbbeff] transition-colors hover:border-[#cbbeff] hover:text-white"
                >
                  Read Docs
                </Link>
              </div>
            </div>

            <div className="relative min-w-0">
              <div className="relative rounded-xl border border-white/10 bg-[#090909]/90 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="font-mono-ui text-[10px] uppercase tracking-[0.22em] text-[#7dffa2]">delivery folder</div>
                    <div className="font-space mt-1 text-xl font-bold uppercase text-white">Customer package</div>
                  </div>
                  <span className="material-symbols-outlined text-[#cbbeff]">folder_zip</span>
                </div>
                <div className="mt-5 rounded-lg border border-white/10 bg-black/55 p-4 font-mono-ui text-sm leading-7">
                  {deliveryFiles.map((line, index) => (
                    <div key={line} className={index === 0 ? "text-[#7dffa2]" : "text-[#cac3d9]"}>
                      {line}
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {[
                    ["install", "%LOCALAPPDATA%\\Crablock\\installed"],
                    ["data", "%LOCALAPPDATA%\\Crablock\\data"],
                    ["verify", "signature + API license"],
                    ["open", "configured app URL"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded border border-white/10 bg-white/[0.03] px-3 py-3">
                      <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-white/35">{label}</div>
                      <div className="mt-1 break-words font-mono-ui text-[11px] text-[#cbbeff]">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="legacy-threat-map" className="hidden">
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
                ["03 / DELIVER", "Deliver", "Build signed customer launchers and API license access.", "rocket_launch"],
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

        <section id="legacy-telemetry" className="hidden">
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
                    <span className="text-[#7dffa2]">—</span> Raw package keys stay out of the customer delivery folder.
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

        <section id="legacy-vault" className="hidden">
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
                className="action-solid-violet rounded border border-white/20 bg-[#663af3] px-10 py-4 font-space text-base uppercase shadow-[0_0_30px_rgba(102,58,243,0.5)] transition-transform hover:-translate-y-0.5"
              >
                SIGN IN
              </a>
              <a
                href={DOWNLOAD_URL}
                className="action-green rounded border border-[#7dffa2]/45 bg-white/5 px-8 py-4 font-space text-sm uppercase tracking-[0.15em] text-[#7dffa2] backdrop-blur-sm transition-colors hover:border-[#7dffa2] hover:text-white"
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
              Application encryption, signed delivery, and licensed running for local software teams.
            </p>
            <p className="font-space mt-6 text-[10px] uppercase tracking-[0.2em] text-violet-400/80">
              © {year} CRABLOCK SECURITY. [PROTECTED STATUS: ACTIVE]
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {footerGroups.map(({ title, links }) => (
              <div key={title}>
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-white/40">{title}</div>
                <ul className="mt-3 space-y-2">
                  {links.map(([label, href]) => {
                    const isExternal = href.startsWith("http");
                    return (
                      <li key={label}>
                        <a
                          href={href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="font-space text-[12px] uppercase tracking-[0.08em] text-zinc-500 transition-colors hover:text-violet-400"
                        >
                          {label}
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
            protection <span className="text-[#cbbeff]/70">AES-256-GCM</span> · signatures <span className="text-[#7dffa2]/80">Ed25519</span>
          </span>
          <span className="uppercase tracking-[0.2em]">Windows desktop · API-managed key delivery</span>
        </div>
      </footer>
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-white/10 bg-black/85 px-4 pb-6 pt-2 backdrop-blur-xl md:hidden">
        {[
          ["grid_view", "#shield-mobile", "ENCRYPT"],
          ["conversion_path", "#threat-map", "WORKFLOW"],
          ["desktop_windows", "#telemetry", "RUNNING"],
          ["folder_zip", "#vault", "DELIVERY"],
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
