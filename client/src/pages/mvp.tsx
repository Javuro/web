import { ArrowRight, CheckCircle2, ClipboardCheck, MapPin, ShieldCheck, Users, WalletCards, XCircle } from "lucide-react";
import { Link } from "wouter";

const loop = [
  {
    title: "Discover",
    body: "A user finds a place, event, route, or campaign surface that can be joined in the real world.",
    icon: MapPin,
  },
  {
    title: "Verify",
    body: "A participation action is checked against location, timing, duplication, and basic reliability rules.",
    icon: ShieldCheck,
  },
  {
    title: "Contribute",
    body: "The user adds useful signal through reviews, place submissions, feedback, or local curation.",
    icon: ClipboardCheck,
  },
  {
    title: "Reward",
    body: "Eligible activity can become reward, access, reputation, or partner-campaign utility.",
    icon: WalletCards,
  },
];

const scope = [
  ["Wallet onboarding", "Connect wallet, confirm address, and prepare users for participation-based utility."],
  ["Campaign surface", "Create a public surface for places, events, or partner campaigns without pretending live traction."],
  ["Participation proof", "Record check-ins or completions with practical anti-duplicate and anti-abuse rules."],
  ["Contribution tasks", "Collect reviews, venue submissions, event feedback, and early community input."],
  ["Reward eligibility", "Track which actions may qualify for rewards before any distribution is executed."],
  ["Admin operations", "Let the team configure campaigns, inspect submissions, and export participation records."],
];

const excluded = [
  "Consumer credit scoring",
  "Lending or borrowing",
  "RWA sale mechanics",
  "Guaranteed token rewards",
  "Synthetic public metrics",
  "Unverified pilot claims",
];

const criteria = [
  "Connected wallets tied to real participation intent",
  "Verified participation records that can be inspected",
  "Repeat contributors instead of one-time wallet collection",
  "Partner conversations based on measured action, not projections",
];

export default function Mvp() {
  return (
    <div className="bg-[#f4f7f1] text-[#07110d]">
      <section className="border-b border-[#07110d]/[0.15] bg-[#050807] text-white">
        <main className="container mx-auto grid min-h-[calc(100vh-5rem)] gap-12 px-4 py-20 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:py-28">
          <div>
            <p className="mb-6 text-sm font-black uppercase tracking-[0.28em] text-emerald-200">MVP</p>
            <h1 className="max-w-3xl text-6xl font-black uppercase leading-[0.82] md:text-8xl xl:text-9xl">
              Build the proof loop.
            </h1>
          </div>

          <div className="grid gap-px border border-white/[0.12] bg-white/[0.12]">
            <div className="bg-[#050807] p-8 md:p-10">
              <p className="max-w-3xl text-2xl font-black leading-tight text-emerald-100 md:text-4xl">
                JAVURO does not need to launch as a full social-financial system.
              </p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                The first useful version should validate whether real-world actions can become reliable, rewardable
                records.
              </p>
            </div>
            <div className="grid gap-px bg-white/[0.12] md:grid-cols-4">
              {loop.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="min-h-[245px] bg-[#050807] p-6">
                    <div className="mb-14 flex items-center justify-between">
                      <span className="font-mono text-sm font-black text-emerald-200">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Icon className="h-6 w-6 text-[#6688ff]" />
                    </div>
                    <h2 className="text-2xl font-black">{item.title}</h2>
                    <p className="mt-4 leading-7 text-slate-400">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </main>
      </section>

      <section className="bg-[#f4f7f1]">
        <div className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-[0.75fr_1.25fr] lg:py-28">
          <div>
            <Users className="mb-8 h-10 w-10 text-[#2d6b58]" />
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#2d6b58]">First release</p>
            <h2 className="text-5xl font-black leading-[0.94] md:text-7xl">What ships first</h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[#42514b]">
              Scope stays narrow enough to build quickly and concrete enough to create a credible public signal.
            </p>
          </div>

          <div className="grid gap-px border border-[#07110d]/[0.15] bg-[#07110d]/[0.15]">
            {scope.map(([label, body], index) => (
              <div key={label} className="grid gap-5 bg-[#f4f7f1] p-6 md:grid-cols-[0.16fr_0.84fr] md:p-7">
                <span className="font-mono text-sm font-black text-[#ff765e]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong className="text-2xl font-black">{label}</strong>
                  <p className="mt-2 leading-7 text-[#42514b]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto grid gap-4 px-4 py-20 lg:grid-cols-[1fr_1fr] lg:py-28">
          <article className="border border-[#07110d]/[0.15] p-8 md:p-10">
            <ShieldCheck className="mb-10 h-10 w-10 text-[#2d6b58]" />
            <h2 className="text-5xl font-black leading-[0.94]">What stays out for now</h2>
            <div className="mt-10 grid gap-px border border-[#07110d]/[0.15] bg-[#07110d]/[0.15] sm:grid-cols-2">
              {excluded.map((item) => (
                <div key={item} className="flex min-h-24 gap-3 bg-white p-5">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#6688ff]" />
                  <span className="font-black text-[#24302b]">{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="bg-[#9fffd5] p-8 md:p-10">
            <h2 className="text-5xl font-black leading-[0.94]">Success means useful signal, not noise.</h2>
            <div className="mt-10 grid gap-px border border-[#07110d]/[0.15] bg-[#07110d]/[0.15]">
              {criteria.map((item) => (
                <div key={item} className="flex min-h-20 gap-4 bg-[#9fffd5] p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <span className="font-black">{item}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bg-[#050807] text-white">
        <div className="container mx-auto grid gap-8 px-4 py-20 md:grid-cols-[1fr_auto] md:items-center lg:py-28">
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-emerald-200">Next action</p>
            <h2 className="max-w-5xl text-5xl font-black leading-[0.94] md:text-7xl">
              Use the website to drive wallet onboarding into MVP validation.
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              Token liquidity should come after JAVURO can show a credible participation loop and useful wallet activity.
            </p>
          </div>
          <Link href="/community">
            <span className="inline-flex h-14 items-center justify-center gap-2 bg-emerald-200 px-6 text-base font-extrabold text-[#07110d] transition hover:bg-white">
              Join the community
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
