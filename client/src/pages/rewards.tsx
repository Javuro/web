import { BadgeCheck, MapPin, Repeat, ShieldCheck, Sparkles, Users } from "lucide-react";

const rewardSignals = [
  {
    title: "Check-ins",
    body: "A visit becomes useful only when the arrival can be verified.",
    icon: MapPin,
  },
  {
    title: "Participation",
    body: "Events, live rooms, reviews, and campaign completion create rewardable activity.",
    icon: Users,
  },
  {
    title: "Reliability",
    body: "Repeated, consistent behavior can support reputation and access over time.",
    icon: Repeat,
  },
];

const guardrails = [
  "Rewards are utility-driven and tied to platform participation.",
  "Financial return, price performance, or guaranteed yield is not promised.",
  "Future reputation and settlement features require data, legal, and partner validation.",
];

export default function Rewards() {
  return (
    <div className="bg-[#f4f7f1] text-[#07110d]">
      <section className="bg-[#050807] text-white">
        <main className="container mx-auto grid min-h-[calc(100vh-5rem)] gap-12 px-4 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-28">
          <div>
            <p className="mb-6 text-sm font-black uppercase tracking-[0.28em] text-emerald-200">Rewards</p>
            <h1 className="text-6xl font-black uppercase leading-[0.82] md:text-8xl xl:text-9xl">
              Rewards follow proof.
            </h1>
          </div>
          <div className="border border-white/[0.12] p-8 md:p-10">
            <p className="text-3xl font-black leading-tight text-emerald-100 md:text-5xl">
              JXRO rewards should reinforce real activity.
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Showing up, joining, contributing, completing, and returning should matter more than passive impressions.
            </p>
          </div>
        </main>
      </section>

      <section className="bg-[#f4f7f1]">
        <div className="container mx-auto grid gap-px px-4 py-20 md:grid-cols-3 lg:py-28">
          {rewardSignals.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="border border-[#07110d]/[0.15] bg-[#f4f7f1] p-7 md:p-8">
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
        <div className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-[0.75fr_1.25fr] lg:py-28">
          <div>
            <ShieldCheck className="mb-8 h-10 w-10 text-emerald-200" />
            <h2 className="text-5xl font-black leading-[0.94] md:text-7xl">Reward guardrails</h2>
          </div>
          <div className="grid gap-px border border-white/[0.12] bg-white/[0.12]">
            {guardrails.map((item) => (
              <div key={item} className="flex gap-4 bg-[#07110d] p-6">
                <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-emerald-200" />
                <p className="text-lg font-black leading-7 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#9fffd5] text-[#07110d]">
        <div className="container mx-auto px-4 py-16">
          <Sparkles className="mb-8 h-9 w-9" />
          <h2 className="max-w-4xl text-4xl font-black leading-[0.96] md:text-6xl">Participation first. Speculation never.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#234238]">
            The reward layer is designed to make the product more useful, not to create investment expectations.
          </p>
        </div>
      </section>
    </div>
  );
}
