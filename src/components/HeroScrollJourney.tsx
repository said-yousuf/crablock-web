"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { APP_URL, DOWNLOAD_URL } from "@/lib/constants";

/** Ported from `updated-hero-section-with-scroll-effects/code.html` — storytelling scroll hero (3 stages). */

const CODE_1 = `<span class="text-[#c678dd]">pub fn</span> <span class="text-[#61afef]">process_payment</span>(data: String) -> Result<(), Error> {
    <span class="text-[#5c6370]">// WARNING: Plaintext artifact in memory</span>
    <span class="text-[#c678dd]">let</span> payload = <span class="text-[#e5c07b]">Payload::parse</span>(&data);
    
    <span class="text-[#c678dd]">if</span> payload.is_valid() {
        <span class="text-[#5c6370]">// Vulnerable to memory dumping attacks</span>
        <span class="text-[#e5c07b]">db::save</span>(payload.card_details);
        <span class="text-[#56b6c2]">Ok</span>(())
    } <span class="text-[#c678dd]">else</span> {
        <span class="text-[#56b6c2]">Err</span>(Error::Invalid)
    }
}`;

const CODE_2 = `<span class="text-[#e5c07b]">[package]</span>
name = <span class="text-[#98c379]">"crablock-core"</span>
version = <span class="text-[#98c379]">"1.2.0"</span>
edition = <span class="text-[#98c379]">"2021"</span>

<span class="text-[#e5c07b]">[dependencies]</span>
tokio = { version = <span class="text-[#98c379]">"1.0"</span>, features = [<span class="text-[#98c379]">"full"</span>] }
ring = <span class="text-[#98c379]">"0.16.20"</span>
<span class="text-[#e06c75]"># INSECURE: using plain env vars</span>
dotenv = <span class="text-[#98c379]">"0.15"</span>`;

const TERMINAL_LOGS = [
  "[INIT] crablock-pipeline.sh v2.4.1",
  "[SYSTEM] Locating cargo project...",
  "[INFO] Found Cargo.toml",
  "[BUILD] Running cargo build --release --target x86_64-unknown-linux-musl",
  "   Compiling libc v0.2.147",
  "   Compiling cfg-if v1.0.0",
  "   Compiling pin-project-lite v0.2.12",
  "   Compiling bytes v1.4.0",
  "   Compiling ring v0.16.20",
  "   Compiling tokio v1.32.0",
  "   Compiling crablock-core v1.2.0",
  "    Finished release [optimized] target(s) in 45.2s",
  "[PACK] Extracting binary artifacts...",
  "[HASH] Calculating SHA-256...",
  "> 8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
  "[ENCRYPT] Engaging AES-256-GCM...",
  "  -> Generating nonce...",
  "  -> Encrypting payload blocks...",
  "  -> Computing authentication tag...",
  "[OK] Payload encrypted successfully.",
  "[SIGN] Generating Ed25519 signature from HSM...",
  "> sig_18djq9384jdklsja8934jklsafj9843...",
  "[BUNDLE] Creating deployment package...",
  "  -> Adding encrypted binary",
  "  -> Adding signature manifest",
  "  -> Adding enclave config",
  "[OK] bundle.cbk generated.",
  "[DEPLOY] Transmitting to secure relay...",
  "  -> Establishing mTLS connection...",
  "  -> Authenticating client cert...",
  "  -> Pushing 14.2 MB...",
  "  -> 100% complete.",
  "[REMOTE] Verifying bundle integrity...",
  "[REMOTE] SHA-256 match.",
  "[REMOTE] Signature valid.",
  "[ENCLAVE] Provisioning secure memory region...",
  "[ENCLAVE] Loading encrypted artifact...",
  "[ENCLAVE] Decrypting in-memory...",
  "[ENCLAVE] Bootstrapping executable...",
  "[SUCCESS] Process PID 8492 running in isolated execution environment.",
  "[TELEMETRY] Heartbeat established.",
  "[TELEMETRY] Memory regions locked.",
  "[TELEMETRY] Introspection guard active.",
  "[TELEMETRY] All systems nominal.",
];

function renderTypingHtml(fullCode: string, progress: number) {
  const length = Math.floor(fullCode.length * progress);
  return fullCode.substring(0, length);
}

function TerminalLine({ text }: { text: string }) {
  if (text.startsWith("[OK]") || text.startsWith("[SUCCESS]")) {
    return <div className="mb-1 text-[#7dffa2]">{text}</div>;
  }
  if (text.startsWith("[ERROR]")) {
    return <div className="mb-1 text-[#ffb4ab]">{text}</div>;
  }
  if (text.startsWith(">")) {
    return <div className="mb-1 text-[#663af3]">{text}</div>;
  }
  if (text.startsWith("[")) {
    const match = text.match(/^(\[[^\]]+\])(.*)$/);
    if (match) {
      return (
        <div className="mb-1 text-white/55">
          <span className="text-[#cbbeff]">{match[1]}</span>
          {match[2]}
        </div>
      );
    }
  }
  return <div className="mb-1 text-white/55">{text}</div>;
}

type Derived =
  | { stage: 0; tab1: boolean; code1Html: string; code2Html: string }
  | { stage: 1; terminalLines: string[] }
  | {
      stage: 2;
      enclave: { zFront: number; opacity: number; rotateOverall: number; sealed: boolean };
    };

export function HeroScrollJourney() {
  const storyRef = useRef<HTMLDivElement>(null);
  const terminalScrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = storyRef.current;
    const measure = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScrollHeight = rect.height - window.innerHeight;
      const p = totalScrollHeight > 0 ? -rect.top / totalScrollHeight : 0;
      setScrollProgress(Math.max(0, Math.min(1, p)));
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const derived: Derived = useMemo(() => {
    const p = scrollProgress;
    if (p < 0.33) {
      const s1p = p / 0.33;
      const tab1 = s1p < 0.45;
      const type1 = Math.min(1, s1p / 0.45);
      const type2 = Math.min(1, (s1p - 0.45) / 0.55);
      return {
        stage: 0,
        tab1,
        code1Html: tab1 ? renderTypingHtml(CODE_1, type1) : CODE_1,
        code2Html: tab1 ? renderTypingHtml(CODE_2, 0) : renderTypingHtml(CODE_2, type2),
      };
    }
    if (p < 0.66) {
      const s2p = (p - 0.33) / 0.33;
      const numLines = Math.floor(TERMINAL_LOGS.length * s2p);
      return { stage: 1, terminalLines: TERMINAL_LOGS.slice(0, numLines) };
    }
    const s3p = (p - 0.66) / 0.34;
    const zFront = 250 - 100 * s3p;
    const opacity = 0.5 + 0.5 * s3p;
    const rotateOverall = s3p * 360;
    const sealed = s3p > 0.9;
    return { stage: 2, enclave: { zFront, opacity, rotateOverall, sealed } };
  }, [scrollProgress]);

  useEffect(() => {
    if (derived.stage !== 1) return;
    const el = terminalScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [derived]);

  const d0 = derived.stage === 0 ? derived : null;
  const d1 = derived.stage === 1 ? derived : null;
  const d2 = derived.stage === 2 ? derived : null;

  return (
    <section id="shield" ref={storyRef} className="story-hero-container relative hidden h-[800vh] md:block">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-10 pt-20">
        <div className="relative z-10 grid w-full max-w-[1440px] grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-6">
          <div className="relative flex h-[400px] items-center md:col-span-5">
            <div className={`text-stage w-full flex flex-col gap-6 ${scrollProgress < 0.33 ? "active" : ""}`}>
              <div className="inline-flex items-center gap-2">
                <span className="font-mono-ui border border-[#ffb4ab]/50 bg-[#ffb4ab]/20 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#ffb4ab]">
                  [VULNERABLE]
                </span>
              </div>
              <h1 className="font-space text-4xl font-bold uppercase leading-[1.1] tracking-tight text-[#e2e2e2] md:text-5xl">
                Vulnerability of Plaintext Artifacts.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-[#cac3d9]">
                Traditional application memory exposes sensitive execution paths. Hypervisor introspection can easily scrape keys and unencrypted payloads in transit.
              </p>
            </div>

            <div
              className={`text-stage w-full flex flex-col gap-6 ${scrollProgress >= 0.33 && scrollProgress < 0.66 ? "active" : ""}`}
            >
              <div className="inline-flex items-center gap-2">
                <span className="font-mono-ui border border-[#7dffa2]/50 bg-[#7dffa2]/20 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#7dffa2]">
                  [PROCESSING]
                </span>
              </div>
              <h1 className="font-space text-4xl font-bold uppercase leading-[1.1] tracking-tight text-[#e2e2e2] md:text-5xl">
                Kinetic Encryption Pipeline.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-[#cac3d9]">
                We intercept the build process, packing your binaries and assets into an encrypted, signed bundle before it ever reaches the cloud environment.
              </p>
            </div>

            <div className={`text-stage w-full flex flex-col gap-6 ${scrollProgress >= 0.66 ? "active" : ""}`}>
              <div className="inline-flex items-center gap-2">
                <span className="font-mono-ui border border-[#663af3]/50 bg-[#663af3]/20 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#cbbeff]">
                  [SECURE]
                </span>
                <span className="font-mono-ui text-xs uppercase tracking-wider text-[#cac3d9]">Runtime Encryption Active</span>
              </div>
              <h1 className="font-space text-4xl font-bold uppercase leading-[1.1] tracking-tight text-[#e2e2e2] md:text-5xl">
                Absolute Digital Sovereignty.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-[#cac3d9]">
                Defense-in-depth architecture engineered for zero-trust environments. Isolate, encrypt, and deploy with hyper-technical precision.
              </p>
              <div className="flex gap-4 pt-2">
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-[#663af3] bg-[#663af3]/20 px-8 py-3 font-space text-sm uppercase text-[#e3daff] shadow-[0_0_15px_rgba(102,58,243,0.3)] transition-colors hover:bg-[#663af3]/30"
                >
                  Deploy Enclave
                </a>
                <a
                  href={DOWNLOAD_URL}
                  className="rounded border border-[#7dffa2]/45 bg-[#7dffa2]/10 px-8 py-3 font-space text-sm uppercase text-[#7dffa2] shadow-[0_0_15px_rgba(5,231,119,0.16)] transition-colors hover:border-[#7dffa2] hover:bg-[#7dffa2]/15 hover:text-white"
                >
                  Download Desktop
                </a>
              </div>
            </div>
          </div>

          <div className="relative flex h-[500px] items-center justify-center perspective-[1000px] md:col-span-7">
            <div
              className={`visual-stage flex w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e] shadow-2xl ${
                derived.stage === 0 ? "active" : ""
              }`}
            >
              <div className="flex items-center justify-between border-b border-black/50 bg-[#2d2d2d] px-4 py-2">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex gap-4">
                  <span
                    className={`cursor-pointer border-b pb-1 font-mono-ui text-xs ${
                      d0?.tab1 ? "border-[#cbbeff] text-gray-300" : "border-transparent text-gray-500"
                    }`}
                  >
                    main.rs
                  </span>
                  <span
                    className={`cursor-pointer border-b pb-1 font-mono-ui text-xs ${
                      d0 && !d0.tab1 ? "border-[#cbbeff] text-gray-300" : "border-transparent text-gray-500"
                    }`}
                  >
                    config.toml
                  </span>
                </div>
                <div />
              </div>
              <div className="relative h-[300px] overflow-hidden p-6 font-mono-ui text-sm leading-relaxed text-gray-300">
                <div
                  className={`absolute inset-0 p-6 transition-opacity duration-300 ${
                    d0?.tab1 ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <pre className="m-0 whitespace-pre-wrap break-words">
                    <code dangerouslySetInnerHTML={{ __html: d0?.code1Html ?? "" }} />
                    <span className="cursor" />
                  </pre>
                </div>
                <div
                  className={`absolute inset-0 p-6 transition-opacity duration-300 ${
                    d0 && !d0.tab1 ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <pre className="m-0 whitespace-pre-wrap break-words">
                    <code dangerouslySetInnerHTML={{ __html: d0?.code2Html ?? "" }} />
                    <span className="cursor" />
                  </pre>
                </div>
              </div>
            </div>

            <div
              className={`visual-stage flex h-[400px] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[#663af3]/50 bg-[#0a0a0a] shadow-[0_0_30px_rgba(102,58,243,0.3)] ${
                derived.stage === 1 ? "active" : ""
              }`}
            >
              <div className="flex items-center gap-2 border-b border-[#663af3]/30 bg-[#2a2a2a] px-4 py-2">
                <span className="font-mono-ui text-xs text-[#cbbeff]">crablock-pipeline.sh</span>
              </div>
              <div
                ref={terminalScrollRef}
                className="terminal-scroll relative flex-1 overflow-y-auto p-6 font-mono-ui text-[12px] leading-relaxed text-[#62ff96]/90"
              >
                <div className="flex min-h-full flex-col justify-end">
                  {d1?.terminalLines.map((line, i) => <TerminalLine key={`${i}-${line}`} text={line} />)}
                </div>
              </div>
            </div>

            <div className={`visual-stage flex h-full w-full items-center justify-center ${derived.stage === 2 ? "active" : ""}`}>
              {d2 && (
                <div
                  className="deconstructed-enclave relative"
                  style={{
                    transform: `rotateX(20deg) rotateY(${30 + d2.enclave.rotateOverall}deg)`,
                  }}
                >
                  {(
                    [
                      ["front", `translateZ(${d2.enclave.zFront}px)`],
                      ["back", `rotateY(180deg) translateZ(${d2.enclave.zFront}px)`],
                      ["right", `rotateY(90deg) translateZ(${d2.enclave.zFront}px)`],
                      ["left", `rotateY(-90deg) translateZ(${d2.enclave.zFront}px)`],
                      ["top", `rotateX(90deg) translateZ(${d2.enclave.zFront}px)`],
                      ["bottom", `rotateX(-90deg) translateZ(${d2.enclave.zFront}px)`],
                    ] as const
                  ).map(([key, tf]) => {
                    const sealed = d2.enclave.sealed;
                    const faceStyle: CSSProperties = {
                      transform: tf,
                      opacity: d2.enclave.opacity,
                      backgroundColor: sealed ? "rgba(102, 58, 243, 0.4)" : "rgba(102, 58, 243, 0.1)",
                      borderColor: sealed ? "rgba(5, 231, 119, 0.8)" : "rgba(102, 58, 243, 0.5)",
                      boxShadow: sealed
                        ? "inset 0 0 60px rgba(5, 231, 119, 0.4)"
                        : "inset 0 0 40px rgba(102, 58, 243, 0.2)",
                    };
                    if (key === "front") {
                      return (
                        <div
                          key={key}
                          className="deconstructed-face face-front flex flex-col items-center justify-center gap-2 font-mono-ui"
                          style={faceStyle}
                        >
                          {sealed ? (
                            <>
                              <span className="material-symbols-outlined text-5xl text-[#05e777]">lock</span>
                              <span className="mt-2 font-mono-ui text-[11px] font-bold uppercase tracking-widest text-[#05e777]">
                                ENCLAVE_ACTIVE
                              </span>
                            </>
                          ) : null}
                        </div>
                      );
                    }
                    const faceClass =
                      key === "back"
                        ? "deconstructed-face face-back"
                        : key === "right"
                          ? "deconstructed-face face-right"
                          : key === "left"
                            ? "deconstructed-face face-left"
                            : key === "top"
                              ? "deconstructed-face face-top"
                              : "deconstructed-face face-bottom";
                    return <div key={key} className={faceClass} style={faceStyle} />;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
