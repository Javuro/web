import { BadgeCheck, MapPin, ShieldCheck, Sparkles, Users, WalletCards } from "lucide-react";

const principles = [
  {
    title: "Presence before profiles",
    body: "JAVURO begins with what a person actually does in a place, not with a static profile or passive feed.",
    icon: MapPin,
  },
  {
    title: "Verification before finance",
    body: "Participation records must become reliable before they can support reputation or future settlement utility.",
    icon: ShieldCheck,
  },
  {
    title: "Rewards before credit",
    body: "The public product focuses on check-ins, missions, reviews, community activity, and JXRO utility first.",
    icon: Sparkles,
  },
];

const roadmap = [
  ["Now", "Public positioning, MVP scope, wallet onboarding, and the first participation-proof loop."],
  ["Next", "Closed testing for check-ins, contribution tasks, reward eligibility, and early partner campaigns."],
  ["Later", "Reputation, escrow experiments, partner settlement, and financial utility after validation."],
];

export default function About() {
  return (
    <div className="bg-[#f4f7f1] text-[#07110d]">
      <section className="bg-[#050807] text-white">
        <main className="container mx-auto grid min-h-[calc(100vh-5rem)] gap-10 px-4 py-20 lg:grid-cols-[0.86fr_1.14fr] lg:items-end lg:py-28">
          <div>
            <p className="mb-6 text-sm font-black uppercase tracking-[0.28em] text-emerald-200">Vision</p>
            <h1 className="text-6xl font-black uppercase leading-[0.82] md:text-8xl xl:text-9xl">
              Presence before profiles.
            </h1>
          </div>
          <p className="max-w-3xl border-t border-white/[0.12] pt-8 text-2xl font-black leading-tight text-emerald-100 md:text-4xl">
            JAVURO is a participation network for real-world human activity.
          </p>
        </main>
      </section>

      <section className="border-b border-[#07110d]/[0.15] bg-white">
        <div className="container mx-auto grid gap-px px-4 py-20 lg:grid-cols-3 lg:py-28">
          {principles.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="border border-[#07110d]/[0.15] bg-white p-7 md:p-8">
                <div className="mb-14 flex items-center justify-between">
                  <Icon className="h-8 w-8 text-[#2d6b58]" />
                  <span className="font-mono text-sm font-black text-[#ff765e]">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h2 className="text-3xl font-black">{item.title}</h2>
                <p className="mt-5 leading-7 text-[#42514b]">{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[#07110d] text-white">
        <div className="container mx-auto grid gap-12 px-4 py-20 lg:grid-cols-[0.82fr_1.18fr] lg:py-28">
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-emerald-200">Why now</p>
            <h2 className="text-5xl font-black leading-[0.94] md:text-7xl">AI can create content. It cannot stand in your place.</h2>
          </div>
          <div className="space-y-7 text-lg leading-8 text-slate-300">
            <p>
              Digital content is becoming abundant. Real-world participation remains scarce and useful: who showed up,
              joined, reviewed, completed, repeated, and contributed.
            </p>
            <p>
              JAVURO treats that activity as a signal. The platform should prove participation first, then earn the
              right to build reputation and future utility on top of it.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7f1]">
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="mb-12 max-w-4xl">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#2d6b58]">Roadmap posture</p>
            <h2 className="text-5xl font-black leading-[0.94] md:text-7xl">Now, next, later.</h2>
          </div>
          <div className="grid gap-px border border-[#07110d]/[0.15] bg-[#07110d]/[0.15] md:grid-cols-3">
            {roadmap.map(([tag, body]) => (
              <article key={tag} className="min-h-[260px] bg-[#f4f7f1] p-7 md:p-8">
                <span className="border border-[#2d6b58]/[0.35] px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#2d6b58]">
                  {tag}
                </span>
                <p className="mt-16 text-xl font-black leading-8 text-[#07110d]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#9fffd5] text-[#07110d]">
        <div className="container mx-auto grid gap-px px-4 py-14 md:grid-cols-3">
          <div className="flex gap-4 p-5">
            <BadgeCheck className="h-7 w-7 shrink-0" />
            <p className="font-black">Verified participation records form the foundation.</p>
          </div>
          <div className="flex gap-4 p-5">
            <Users className="h-7 w-7 shrink-0" />
            <p className="font-black">Communities and venues create the activity surface.</p>
          </div>
          <div className="flex gap-4 p-5">
            <WalletCards className="h-7 w-7 shrink-0" />
            <p className="font-black">JXRO connects rewards, access, and ecosystem utility.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
