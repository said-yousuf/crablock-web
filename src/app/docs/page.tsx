import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { APP_URL, DOWNLOAD_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Crablock Docs - Console, Desktop, CLI, and API",
  description:
    "Operational documentation for Crablock web console, desktop encryption workflow, CLI runtime, and backend API routes.",
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
      "The release register tracks queued, processing, published, and failed releases. Published rows expose download actions through a signed backend URL.",
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

const apiRows = [
  ["POST", "/api/v1/auth/login", "Authenticate and set the browser session."],
  ["GET", "/api/v1/projects", "List project workspaces for the current organization."],
  ["POST", "/api/v1/projects", "Create a new project workspace."],
  ["GET", "/api/v1/projects/{project_id}", "Read project metadata and workspace identifiers."],
  ["PUT", "/api/v1/projects/{project_id}/environment", "Replace encrypted project-level environment variables."],
  ["PUT", "/api/v1/projects/{project_id}/release-source/upload", "Upload a built artifact as the release source."],
  ["PUT", "/api/v1/projects/{project_id}/release-source/github", "Connect a GitHub repository, git ref, build preset, and artifact path."],
  ["POST", "/api/v1/projects/{project_id}/keys/rotate", "Provision a new active project key version."],
  ["POST", "/api/v1/projects/{project_id}/releases", "Create a versioned release from the configured source."],
  ["GET", "/api/v1/projects/{project_id}/releases/{release_id}/download", "Return a short-lived signed package URL and filename."],
] as const;

const releaseStates = [
  ["queued", "GitHub release source is waiting for worker processing."],
  ["processing", "Upload or source build is being packed and signed."],
  ["published", "Package metadata and storage key are ready. Download can be requested."],
  ["failed", "Build or package processing failed. Inspect the release detail sheet."],
] as const;

const toc = [
  ["Install", "#install"],
  ["Web Console", "#web-console"],
  ["Desktop App", "#desktop-app"],
  ["CLI", "#cli"],
  ["Backend API", "#backend-api"],
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
              Crablock combines a hosted operations console, a desktop encryption shell, a Rust CLI/runtime, and a FastAPI backend.
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
              <InfoTile title="Backend API docs" marker="03">
                API explorers are available at <InlineLink href="https://api.crablock.cloud/docs">Swagger</InlineLink>,{" "}
                <InlineLink href="https://api.crablock.cloud/redoc">ReDoc</InlineLink>, and{" "}
                <InlineLink href="https://api.crablock.cloud/scalar">Scalar</InlineLink>.
              </InfoTile>
            </div>

            <CodeBlock
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
              The browser does not download from the API route directly. The console calls the backend download endpoint, reads the
              returned <code className="font-mono-ui text-[#7dffa2]">url</code>, and starts the browser download from that signed storage URL.
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

          <DocsSection id="backend-api" eyebrow="Backend API" title="API routes and release states">
            <div className="overflow-hidden rounded-lg border border-white/10">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead className="bg-white/[0.05] font-mono-ui text-[10px] uppercase tracking-[0.18em] text-white/45">
                  <tr>
                    <th className="px-4 py-3">Method</th>
                    <th className="px-4 py-3">Route</th>
                    <th className="px-4 py-3">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {apiRows.map(([method, route, purpose]) => (
                    <tr key={`${method}-${route}`} className="bg-white/[0.02]">
                      <td className="px-4 py-3 font-mono-ui text-[#7dffa2]">{method}</td>
                      <td className="px-4 py-3 font-mono-ui text-[#cbbeff]">{route}</td>
                      <td className="px-4 py-3 text-[#cac3d9]">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {releaseStates.map(([state, meaning]) => (
                <div key={state} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-mono-ui text-[11px] uppercase tracking-[0.18em] text-[#7dffa2]">{state}</p>
                  <p className="mt-2 text-sm leading-6 text-[#cac3d9]">{meaning}</p>
                </div>
              ))}
            </div>

            <Callout title="Published downloads are short lived" tone="violet">
              <code className="font-mono-ui text-[#cbbeff]">GET /download</code> returns{" "}
              <code className="font-mono-ui text-[#cbbeff]">url</code>,{" "}
              <code className="font-mono-ui text-[#cbbeff]">filename</code>, and{" "}
              <code className="font-mono-ui text-[#cbbeff]">expires_in_seconds</code>. Treat the signed URL as temporary.
            </Callout>
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

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#7dffa2] underline-offset-4 hover:underline">
      {children}
    </a>
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
    </figure>
  );
}

function ScreenshotAnnotation({ annotation, index }: { annotation: Annotation; index: number }) {
  const tone = annotation.tone ?? "violet";
  const classes = {
    violet: "border-[#cbbeff] bg-[#663af3]/20 text-[#efeaff]",
    green: "border-[#7dffa2] bg-[#05e777]/15 text-[#dcffe7]",
    amber: "border-[#ffd479] bg-[#ffd479]/15 text-[#fff1c7]",
  } satisfies Record<AnnotationTone, string>;

  const style: CSSProperties = {
    left: `${annotation.x}%`,
    top: `${annotation.y}%`,
    width: `${annotation.width}%`,
    height: `${annotation.height}%`,
  };

  return (
    <div className={`absolute rounded border-2 shadow-[0_0_24px_rgba(0,0,0,0.45)] ${classes[tone]}`} style={style}>
      <span className="absolute left-2 top-2 max-w-[220px] rounded bg-black/85 px-2 py-1 font-mono-ui text-[10px] font-bold uppercase leading-4 tracking-[0.08em]">
        {index}. {annotation.label}
      </span>
    </div>
  );
}

function CodeBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#101010]">
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
