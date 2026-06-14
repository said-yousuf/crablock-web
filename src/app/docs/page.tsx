import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { APP_URL, DOWNLOAD_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Crablock Docs - Console, Desktop, and CLI",
  description:
    "Operational documentation for Crablock web console, desktop encryption workflow, and CLI runtime.",
};

type AnnotationTone = "violet" | "green" | "amber";

type Annotation = {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  tone?: AnnotationTone;
};

type ScreenshotFigure = {
  title: string;
  description: string;
  src: string;
  width: number;
  height: number;
  annotations: Annotation[];
};

const webFigures: ScreenshotFigure[] = [
  {
    title: "Command workspace",
    description:
      "The command view gives operators the project count, access state, recent project activity, and the shortcuts most commonly used after sign in.",
    src: "/docs/screenshots/web-command.png",
    width: 1185,
    height: 980,
    annotations: [
      { label: "Create a protected workspace", x: 84, y: 15, width: 13, height: 4, tone: "green" },
      { label: "Operational snapshot", x: 3, y: 21, width: 94, height: 12, tone: "violet" },
      { label: "Release and key shortcuts", x: 63, y: 35, width: 34, height: 43, tone: "amber" },
    ],
  },
  {
    title: "Project registry",
    description:
      "The registry keeps project creation, filtering, and workspace entry in one place. Project forms open in sheets so the list remains stable.",
    src: "/docs/screenshots/web-projects.png",
    width: 1185,
    height: 980,
    annotations: [
      { label: "New project sheet", x: 84, y: 15, width: 13, height: 4, tone: "green" },
      { label: "Filter and sort controls", x: 4, y: 31, width: 91, height: 5, tone: "violet" },
      { label: "Workspace cards", x: 4, y: 40, width: 61, height: 16, tone: "amber" },
    ],
  },
  {
    title: "Release source setup",
    description:
      "A project release source can be an uploaded artifact or a GitHub repository with a selected build preset and artifact path.",
    src: "/docs/screenshots/web-release-source.png",
    width: 1185,
    height: 980,
    annotations: [
      { label: "Release Source tab", x: 60, y: 38, width: 16, height: 3, tone: "violet" },
      { label: "Saved source summary", x: 4, y: 54, width: 92, height: 8, tone: "green" },
      { label: "Upload source form", x: 4, y: 71, width: 92, height: 21, tone: "amber" },
    ],
  },
  {
    title: "Release register",
    description:
      "The release register tracks queued, processing, published, and failed releases. Published rows expose download actions through a signed release URL.",
    src: "/docs/screenshots/web-releases.png",
    width: 1185,
    height: 980,
    annotations: [
      { label: "Queue a versioned release", x: 84, y: 46, width: 12, height: 4, tone: "green" },
      { label: "Published package is downloadable", x: 34, y: 60, width: 11, height: 4, tone: "violet" },
      { label: "Row action menu", x: 92, y: 58, width: 5, height: 13, tone: "amber" },
    ],
  },
];

const desktopFigures: ScreenshotFigure[] = [
  {
    title: "Desktop workflow overview",
    description:
      "The desktop application guides a developer from project selection to customer handoff, including bundled runtime handling for PHP, Node, database, Rust, and Go outputs.",
    src: "/docs/screenshots/desktop-overview.png",
    width: 1440,
    height: 900,
    annotations: [
      { label: "Four-step delivery model", x: 20, y: 18, width: 78, height: 20, tone: "violet" },
      { label: "Customer handoff files", x: 20, y: 40, width: 38, height: 35, tone: "green" },
      { label: "Runtime sidecar support", x: 59, y: 40, width: 38, height: 25, tone: "amber" },
    ],
  },
  {
    title: "Encrypt customer application",
    description:
      "The encryption page collects the project folder, output path, customer key, optional signing material, and the generated CrablockFile recipe before encryption.",
    src: "/docs/screenshots/desktop-encrypt.png",
    width: 1440,
    height: 900,
    annotations: [
      { label: "Source, output, key, signature", x: 20, y: 24, width: 40, height: 40, tone: "green" },
      { label: "Generated recipe review", x: 62, y: 24, width: 35, height: 44, tone: "violet" },
      { label: "Encrypt action", x: 91, y: 12, width: 7, height: 4, tone: "amber" },
    ],
  },
  {
    title: "Run encrypted application",
    description:
      "The running page is the customer-support path. Select the encrypted package and key, optionally provide a license token, then Check or Run.",
    src: "/docs/screenshots/desktop-running.png",
    width: 1440,
    height: 900,
    annotations: [
      { label: "Customer files", x: 20, y: 18, width: 35, height: 48, tone: "green" },
      { label: "Check and run controls", x: 87, y: 12, width: 11, height: 5, tone: "violet" },
      { label: "Runtime status and log", x: 57, y: 18, width: 40, height: 54, tone: "amber" },
    ],
  },
];

const releaseStates = [
  ["queued", "GitHub release source is waiting for worker processing."],
  ["processing", "Upload or source build is being packed and signed."],
  ["published", "Package metadata and storage key are ready. Download can be requested."],
  ["failed", "Build or package processing failed. Inspect the release detail sheet."],
] as const;

const desktopAdvancedOptions = [
  [
    "Runtime folders",
    "Scan for local runtime folders or map them manually for Node, PHP, PostgreSQL, MySQL, and MariaDB sidecars before encryption.",
  ],
  [
    "Key and signature material",
    "Generate or rotate the customer key, attach the developer signing key, and keep the signing public key available for customer-side verification.",
  ],
  [
    "Environment and preparation",
    "Attach a dotenv file, review the generated CrablockFile recipe, and use the no-prepare option only when the project output is already built.",
  ],
  [
    "License gate",
    "Enable license requirements for package-bound customer access, then generate the license file and matching public key before delivery.",
  ],
  [
    "Delivery builder",
    "Use the Delivery tab to assemble the launcher, encrypted package, key file, signing public key, and optional license sidecars into one customer folder.",
  ],
  [
    "Run verification",
    "Use Check before Run to inspect framework, runtime, database, license, signature, and signing fingerprint metadata without starting the app.",
  ],
] as const;

const toc = [
  ["Install", "#install"],
  ["Web Console", "#web-console"],
  ["Release Flow", "#release-flow"],
  ["Desktop App", "#desktop-app"],
  ["Advanced", "#desktop-advanced"],
  ["CLI", "#cli"],
  ["Security", "#security"],
] as const;

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-[#e2e2e2] selection:bg-[#663af3] selection:text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 md:px-10">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="Crablock logo" width={30} height={30} className="h-[30px] w-[30px] max-w-none object-contain" />
            <span className="font-space text-lg font-black uppercase tracking-[0.14em] text-white">Crablock Docs</span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href={DOWNLOAD_URL}
              className="rounded border border-[#7dffa2]/45 px-3 py-2 font-space text-[11px] font-bold uppercase tracking-[0.12em] text-[#7dffa2] transition hover:border-[#7dffa2] hover:text-white"
            >
              Download
            </a>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-[#cbbeff]/40 px-3 py-2 font-space text-[11px] font-bold uppercase tracking-[0.12em] text-[#cbbeff] transition hover:border-[#cbbeff] hover:text-white"
            >
              Console
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1440px] gap-10 px-4 py-10 md:px-10 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <nav className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="font-mono-ui text-[10px] uppercase tracking-[0.25em] text-white/45">On this page</p>
            <ul className="mt-4 grid gap-2">
              {toc.map(([label, href]) => (
                <li key={href}>
                  <a className="block rounded px-3 py-2 text-sm text-[#cac3d9] transition hover:bg-white/[0.05] hover:text-white" href={href}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0">
          <section className="border-b border-white/10 pb-12">
            <p className="font-mono-ui text-[10px] uppercase tracking-[0.35em] text-[#7dffa2]/85">Documentation</p>
            <h1 className="font-space mt-4 max-w-4xl text-4xl font-bold uppercase leading-tight text-white md:text-6xl">
              Ship encrypted customer applications with Crablock.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#cac3d9]">
              Crablock combines a hosted operations console, a desktop encryption shell, and a Rust CLI/runtime.
              Use these docs to package customer applications, publish releases, and download signed runtime artifacts.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={DOWNLOAD_URL}
                className="inline-flex items-center justify-center rounded border border-[#7dffa2]/60 bg-[#7dffa2]/10 px-5 py-3 font-space text-sm font-bold uppercase tracking-[0.12em] text-[#7dffa2] transition hover:border-[#7dffa2] hover:text-white"
              >
                Download Desktop v0.1.3
              </a>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded border border-[#cbbeff]/45 px-5 py-3 font-space text-sm font-bold uppercase tracking-[0.12em] text-[#cbbeff] transition hover:border-[#cbbeff] hover:text-white"
              >
                Open Web Console
              </a>
            </div>
          </section>

          <DocsSection id="install" eyebrow="Install" title="Download and run">
            <div className="grid gap-6 lg:grid-cols-3">
              <InfoTile title="Desktop installer" marker="01">
                Download the Windows desktop installer from the v0.1.3 GitHub release. The desktop shell is the preferred path for
                creating customer delivery folders.
              </InfoTile>
              <InfoTile title="Hosted console" marker="02">
                Use the hosted console for projects, release sources, key versions, release records, and signed package downloads.
              </InfoTile>
              <InfoTile title="CLI and runtime tools" marker="03">
                Use the CLI for scripted packaging, manifest inspection, signature verification, service control, and customer runtime support.
              </InfoTile>
            </div>

            <CodeBlock
              className="mt-6"
              title="Windows customer packaging path"
              lines={[
                "1. Install Crablock Desktop.",
                "2. Open Encryption and choose the project folder.",
                "3. Generate or select the customer key file.",
                "4. Encrypt, then build the customer delivery folder.",
                "5. Ship Start <App>.exe, <App>.customer.crabundle, <App>.key, and optional license files.",
              ]}
            />
          </DocsSection>

          <DocsSection id="web-console" eyebrow="Web Console" title="Operate projects and releases">
            <p className="max-w-3xl text-[#cac3d9]">
              The console is organized around protected projects. Each project stores environment values, active key versions, a release
              source, and the release register used for signed downloads.
            </p>
            <div className="mt-8 grid gap-10">
              {webFigures.map((figure, index) => (
                <AnnotatedScreenshot key={figure.src} figure={figure} priority={index === 0} />
              ))}
            </div>

            <Callout title="Release download behavior" tone="green">
              The browser does not download from the release request directly. The console requests a download, reads the returned{" "}
              <code className="font-mono-ui text-[#7dffa2]">url</code>, and starts the browser download from that signed storage URL.
            </Callout>
          </DocsSection>

          <DocsSection id="release-flow" eyebrow="Release Flow" title="Understand release states">
            <p className="max-w-3xl text-[#cac3d9]">
              Treat the release register as the operational source of truth. A release moves from queued work to a published package,
              or it stops in failed state with detail available from the release sheet.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {releaseStates.map(([state, meaning]) => (
                <div key={state} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-mono-ui text-[11px] uppercase tracking-[0.18em] text-[#7dffa2]">{state}</p>
                  <p className="mt-2 text-sm leading-6 text-[#cac3d9]">{meaning}</p>
                </div>
              ))}
            </div>
            <Callout title="Published downloads are temporary" tone="violet">
              Published release downloads use signed URLs. Start the download from the console action and avoid storing the returned URL
              as a permanent artifact link.
            </Callout>
          </DocsSection>

          <DocsSection id="desktop-app" eyebrow="Desktop App" title="Package and run encrypted apps">
            <p className="max-w-3xl text-[#cac3d9]">
              The desktop app is a Tauri shell for developer packaging and support-side running. It bundles the CLI sidecars and keeps the
              customer workflow focused on a small delivery folder.
            </p>
            <div className="mt-8 grid gap-10">
              {desktopFigures.map((figure) => (
                <AnnotatedScreenshot key={figure.src} figure={figure} />
              ))}
            </div>
          </DocsSection>

          <DocsSection id="desktop-advanced" eyebrow="Desktop Advanced" title="Advanced packaging controls">
            <p className="max-w-3xl text-[#cac3d9]">
              Use the advanced panel when the customer package needs portable runtimes, signed policies, license enforcement, or a
              controlled delivery folder. Keep these settings deliberate because they change what the runner requires at customer startup.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {desktopAdvancedOptions.map(([title, copy], index) => (
                <InfoTile key={title} title={title} marker={String(index + 1).padStart(2, "0")}>
                  {copy}
                </InfoTile>
              ))}
            </div>
            <CodeBlock
              className="mt-6"
              title="Advanced desktop checklist"
              lines={[
                "1. Scan or select runtime folders before encryption when the customer PC should not install dependencies.",
                "2. Generate the customer key and developer signing key before building the package.",
                "3. Review the generated CrablockFile recipe before writing it to the source project.",
                "4. Enable license requirements only after the license public key and customer duration are set.",
                "5. Build the delivery folder, then use Check on the Running page before handing it to the customer.",
              ]}
            />
          </DocsSection>

          <DocsSection id="cli" eyebrow="CLI" title="Command line quick reference">
            <div className="grid gap-6 lg:grid-cols-2">
              <CodeBlock
                title="Create a customer bundle"
                lines={[
                  "crablock-pack bundle \\",
                  "  --project C:\\path\\to\\app \\",
                  "  --output C:\\out\\app.crabundle \\",
                  "  --key file:C:\\keys\\app.key",
                ]}
              />
              <CodeBlock
                title="Run a customer bundle"
                lines={[
                  "crablock-runner run C:\\out\\app.crabundle \\",
                  "  --key file:C:\\keys\\app.key \\",
                  "  --install-dir C:\\Crablock\\installed\\app \\",
                  "  --app-data-dir C:\\Crablock\\data\\app",
                ]}
              />
              <CodeBlock
                title="Manage installed package services"
                lines={[
                  "crablock app install app ./app.crablock",
                  "crablock app start app --all --key env:CRABLOCK_ENC_KEY --require-signature",
                  "crablock app logs app --all",
                  "crablock app stop app --all",
                  "crablock app rm app",
                ]}
              />
              <CodeBlock
                title="Inspect and verify packages"
                lines={[
                  "crablock-pack info --package ./app.crablock",
                  "crablock-pack verify --package ./app.crablock --pubkey file:./crablock.pub --require-signature",
                  "crablock verify ./app.crablock --pubkey file:./crablock.pub --require-signature",
                ]}
              />
            </div>
          </DocsSection>

          <DocsSection id="security" eyebrow="Security" title="Operational guardrails">
            <div className="grid gap-4">
              <Guardrail title="Do not document secrets">
                Runtime keys, signing material, license private keys, and decrypted artifacts should never appear in screenshots,
                commits, support tickets, or public docs.
              </Guardrail>
              <Guardrail title="Rotate keys intentionally">
                Key rotation creates a new active project key version. Existing releases remain inspectable, but new releases should use
                the current active version.
              </Guardrail>
              <Guardrail title="Use source paths narrowly">
                For GitHub sources, keep build targets and artifact paths pointed at production output folders instead of the whole
                development repository.
              </Guardrail>
              <Guardrail title="Remember the threat model">
                Crablock protects artifacts at rest and narrows plaintext exposure during runtime. A fully compromised host can still
                inspect running processes, so use host hardening and deployment isolation alongside Crablock.
              </Guardrail>
            </div>
          </DocsSection>
        </div>
      </main>
    </div>
  );
}

function DocsSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-white/10 py-12 last:border-b-0">
      <p className="font-mono-ui text-[10px] uppercase tracking-[0.32em] text-[#7dffa2]/80">{eyebrow}</p>
      <h2 className="font-space mt-3 text-3xl font-bold uppercase text-white md:text-4xl">{title}</h2>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function InfoTile({ title, marker, children }: { title: string; marker: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-space text-lg font-bold text-white">{title}</h3>
        <span className="font-mono-ui rounded border border-[#cbbeff]/35 px-2 py-1 text-[10px] text-[#cbbeff]">{marker}</span>
      </div>
      <p className="mt-3 text-sm leading-7 text-[#cac3d9]">{children}</p>
    </div>
  );
}

function AnnotatedScreenshot({ figure, priority = false }: { figure: ScreenshotFigure; priority?: boolean }) {
  return (
    <figure>
      <div className="mb-4">
        <h3 className="font-space text-2xl font-bold text-white">{figure.title}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-[#cac3d9]">{figure.description}</p>
      </div>
      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#101010]">
        <Image
          src={figure.src}
          alt={figure.title}
          width={figure.width}
          height={figure.height}
          priority={priority}
          sizes="(min-width: 1024px) 900px, 100vw"
          className="h-auto w-full"
        />
        {figure.annotations.map((annotation, index) => (
          <ScreenshotAnnotation key={annotation.label} annotation={annotation} index={index + 1} />
        ))}
      </div>
      <ol className="mt-3 grid gap-2 md:grid-cols-3">
        {figure.annotations.map((annotation, index) => (
          <AnnotationLegendItem key={annotation.label} annotation={annotation} index={index + 1} />
        ))}
      </ol>
    </figure>
  );
}

function ScreenshotAnnotation({ annotation, index }: { annotation: Annotation; index: number }) {
  const tone = annotation.tone ?? "violet";
  const classes = {
    violet: "border-[#cbbeff]/95 bg-[#663af3]/10",
    green: "border-[#7dffa2]/95 bg-[#05e777]/10",
    amber: "border-[#ffd479]/95 bg-[#ffd479]/10",
  } satisfies Record<AnnotationTone, string>;
  const badgeClasses = {
    violet: "border-[#cbbeff] text-[#efeaff]",
    green: "border-[#7dffa2] text-[#dcffe7]",
    amber: "border-[#ffd479] text-[#fff1c7]",
  } satisfies Record<AnnotationTone, string>;

  const style: CSSProperties = {
    left: `${annotation.x}%`,
    top: `${annotation.y}%`,
    width: `${annotation.width}%`,
    height: `${annotation.height}%`,
  };

  return (
    <div aria-hidden="true" className={`absolute rounded border-2 shadow-[0_0_24px_rgba(0,0,0,0.45)] ${classes[tone]}`} style={style}>
      <span className={`absolute left-1.5 top-1.5 flex size-6 items-center justify-center rounded border bg-black/90 font-mono-ui text-[10px] font-bold ${badgeClasses[tone]}`}>
        {index}
      </span>
    </div>
  );
}

function AnnotationLegendItem({ annotation, index }: { annotation: Annotation; index: number }) {
  const tone = annotation.tone ?? "violet";
  const classes = {
    violet: "border-[#cbbeff]/30 bg-[#663af3]/10 text-[#efeaff]",
    green: "border-[#7dffa2]/30 bg-[#05e777]/10 text-[#dcffe7]",
    amber: "border-[#ffd479]/30 bg-[#ffd479]/10 text-[#fff1c7]",
  } satisfies Record<AnnotationTone, string>;

  return (
    <li className={`flex items-start gap-3 rounded border px-3 py-2 ${classes[tone]}`}>
      <span className="flex size-6 shrink-0 items-center justify-center rounded border border-current bg-black/60 font-mono-ui text-[10px] font-bold">
        {index}
      </span>
      <span className="text-xs leading-5">{annotation.label}</span>
    </li>
  );
}

function CodeBlock({ title, lines, className = "" }: { title: string; lines: string[]; className?: string }) {
  return (
    <div className={`rounded-lg border border-white/10 bg-[#101010] ${className}`}>
      <div className="border-b border-white/10 px-4 py-3">
        <p className="font-mono-ui text-[10px] uppercase tracking-[0.2em] text-[#cbbeff]">{title}</p>
      </div>
      <pre className="overflow-x-auto p-4 font-mono-ui text-sm leading-7 text-[#e2e2e2]">
        <code>{lines.join("\n")}</code>
      </pre>
    </div>
  );
}

function Callout({ title, tone, children }: { title: string; tone: AnnotationTone; children: ReactNode }) {
  const classes = {
    violet: "border-[#cbbeff]/35 bg-[#663af3]/10",
    green: "border-[#7dffa2]/35 bg-[#05e777]/10",
    amber: "border-[#ffd479]/35 bg-[#ffd479]/10",
  } satisfies Record<AnnotationTone, string>;

  return (
    <div className={`mt-8 rounded-lg border p-5 ${classes[tone]}`}>
      <p className="font-space text-lg font-bold text-white">{title}</p>
      <p className="mt-2 text-sm leading-7 text-[#cac3d9]">{children}</p>
    </div>
  );
}

function Guardrail({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
      <h3 className="font-space text-lg font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[#cac3d9]">{children}</p>
    </div>
  );
}
