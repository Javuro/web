import { ClipboardCheck, FileText, Layers, Scale, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const WHITEPAPER_PDF = "/docs/JAVURO%20Whitepaper%20EN%200.4.1.pdf";
const WHITEPAPER_DOCX = "/docs/JAVURO%20Whitepaper%20EN%200.4.1.docx";

const docs = [
  {
    title: "Whitepaper v0.4.1",
    body: "April 2026 draft covering Proof-of-Presence, Behavior Credit boundaries, token utility, roadmap, and legal disclaimers.",
    icon: FileText,
    href: WHITEPAPER_PDF,
    external: true,
  },
  {
    title: "MVP scope",
    body: "The first product scope focuses on wallet onboarding, participation proof, contribution tasks, and reward eligibility.",
    icon: ClipboardCheck,
    href: "/mvp",
    external: false,
  },
  {
    title: "Ecosystem layers",
    body: "Social layer, reward layer, reputation layer, and future utility are separated to avoid overstating finance features.",
    icon: Layers,
    href: "/about",
    external: false,
  },
  {
    title: "Compliance posture",
    body: "Credit, escrow, and RWA language should remain in research or partner-pilot context until validation is complete.",
    icon: Scale,
    href: "/disclaimer",
    external: false,
  },
];

export default function Whitepaper() {
  return (
    <div className="bg-[#f4f7f1] text-[#07110d]">
      <section className="bg-[#050807] text-white">
        <main className="container mx-auto grid min-h-[calc(100vh-5rem)] gap-12 px-4 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-28">
          <div>
            <p className="mb-6 text-sm font-black uppercase tracking-[0.28em] text-emerald-200">Docs</p>
            <h1 className="text-6xl font-black uppercase leading-[0.82] md:text-8xl xl:text-9xl">
              Reference, not fiction.
            </h1>
          </div>
          <div className="border border-white/[0.12] p-8 md:p-10">
            <p className="text-3xl font-black leading-tight text-emerald-100 md:text-5xl">
              Technical documents for the participation network.
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              The current v0.4.1 draft frames JAVURO as a Proof-of-Presence network while keeping Behavior Credit, RWA,
              escrow, and DeFi functionality subject to review and validation.
            </p>
          </div>
        </main>
      </section>

      <section className="bg-[#f4f7f1]">
        <div className="container mx-auto grid gap-px px-4 py-20 md:grid-cols-2 xl:grid-cols-4 lg:py-28">
          {docs.map((doc, index) => {
            const Icon = doc.icon;
            const content = (
              <article className="h-full min-h-[290px] border border-[#07110d]/[0.15] bg-[#f4f7f1] p-7 transition hover:bg-white">
                <div className="mb-14 flex items-center justify-between">
                  <Icon className="h-8 w-8 text-[#2d6b58]" />
                  <span className="font-mono text-sm font-black text-[#ff765e]">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h2 className="text-3xl font-black">{doc.title}</h2>
                <p className="mt-5 leading-7 text-[#42514b]">{doc.body}</p>
              </article>
            );

            if (doc.external) {
              return (
                <a key={doc.title} href={doc.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              );
            }

            return (
              <Link key={doc.title} href={doc.href}>
                {content}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-[#9fffd5] text-[#07110d]">
        <div className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#2d6b58]">Current draft</p>
            <h2 className="text-4xl font-black leading-[0.96] md:text-6xl">JAVURO Whitepaper EN 0.4.1</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#234238]">
              This draft should be treated as the reference point for the website, pitch materials, and public
              positioning.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={WHITEPAPER_PDF} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center bg-[#07110d] px-6 font-black text-white">
              Open PDF
            </a>
            <a href={WHITEPAPER_DOCX} className="inline-flex h-14 items-center justify-center border border-[#07110d]/20 px-6 font-black text-[#07110d]">
              DOCX file
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-[0.75fr_1.25fr] lg:py-28">
          <div>
            <ShieldCheck className="mb-8 h-10 w-10 text-[#2d6b58]" />
            <h2 className="text-5xl font-black leading-[0.94] md:text-7xl">Documentation stance</h2>
          </div>
          <div className="space-y-7 text-lg leading-8 text-[#42514b]">
            <p>
              The public site should now follow v0.4.1: Proof-of-Presence first, platform reputation next, and
              programmable financial utility only after validation.
            </p>
            <p>
              Behavior Credit should remain described as an internal reputation and contribution metric, not a regulated
              consumer credit score or lending product.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
