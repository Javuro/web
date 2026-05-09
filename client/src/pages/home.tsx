import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  CircleDot,
  ClipboardCheck,
  Layers3,
  MapPin,
  MessageCircle,
  Route,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  Users,
  WalletCards,
} from "lucide-react";

const proofStack = [
  { title: "Place", body: "A real venue, route, event, or local campaign surface.", icon: MapPin },
  { title: "Action", body: "Check-in, room entry, review, event completion, repeat visit.", icon: TicketCheck },
  { title: "Validation", body: "Signals are filtered for reliability before they become records.", icon: ShieldCheck },
  { title: "Utility", body: "Rewards and reputation can attach only after verification.", icon: WalletCards },
];

const experienceSurface = [
  { title: "Discover", body: "Find nearby places, events, campaigns, and local activity surfaces.", icon: Route },
  { title: "Visit", body: "Move from recommendation into a real-world venue, route, or event.", icon: MapPin },
  { title: "Check in", body: "Create a participation signal when the real-world action can be verified.", icon: TicketCheck },
  { title: "Connect", body: "Enter temporary rooms tied to places or events, not permanent feeds.", icon: MessageCircle },
  { title: "Contribute", body: "Leave reviews, submit places, curate local information, or provide feedback.", icon: ClipboardCheck },
  { title: "Earn", body: "Receive rewards, access, and reputation only after validation logic.", icon: Sparkles },
];

const mvpScope = [
  "Wallet onboarding",
  "Campaign surfaces",
  "Verified check-in records",
  "Contribution tasks",
  "Reward eligibility",
  "Admin review tools",
];

const systemLayers = [
  {
    tag: "Social",
    title: "Activity Surface",
    body: "Discovery, rooms, check-ins, reviews, and event participation create the reason to act offline.",
  },
  {
    tag: "Proof",
    title: "Verification Layer",
    body: "JAVURO separates ordinary engagement from participation records that can support utility.",
  },
  {
    tag: "Utility",
    title: "Reward Layer",
    body: "Rewards, access, partner campaigns, and future settlement logic sit downstream of verified records.",
  },
];

const partnerCards = [
  {
    title: "Users",
    body: "Build a record through real-world participation, not passive feed activity.",
    icon: Users,
  },
  {
    title: "Venues",
    body: "Reward verified visits and repeat participation instead of paying for empty impressions.",
    icon: Building2,
  },
  {
    title: "Partners",
    body: "Move campaign budgets toward measured offline action.",
    icon: CalendarClock,
  },
];

const proofSignals = [
  "Verified check-ins",
  "Room participation",
  "Review reliability",
  "Event completion",
  "Repeat visits",
  "Venue engagement",
  "Campaign missions",
  "Community contribution",
];

function PresenceField() {
  return (
    <div className="relative min-h-[560px] overflow-hidden border-y border-white/[0.12] bg-[#0a0d0d] lg:min-h-[760px]">
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(159,255,213,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(159,255,213,0.2)_1px,transparent_1px)] [background-size:46px_46px]" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-emerald-200/40" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-emerald-200/35" />
      <div className="absolute left-[12%] top-[20%] h-28 w-28 border border-[#ff765e]/[0.7]" />
      <div className="absolute bottom-[17%] right-[10%] h-36 w-36 border border-[#6688ff]/[0.65]" />
      <div className="absolute left-[24%] top-[58%] h-20 w-20 rotate-45 border border-emerald-200/60" />

      <div className="absolute left-[10%] top-[12%] flex items-center gap-3 border border-white/[0.15] bg-black/[0.55] px-4 py-3 text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
        <MapPin className="h-4 w-4 text-[#ff765e]" />
        Place
      </div>
      <div className="absolute right-[9%] top-[22%] flex items-center gap-3 border border-white/[0.15] bg-black/[0.55] px-4 py-3 text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
        <TicketCheck className="h-4 w-4 text-emerald-200" />
        Action
      </div>
      <div className="absolute bottom-[24%] left-[9%] flex items-center gap-3 border border-white/[0.15] bg-black/[0.55] px-4 py-3 text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
        <ShieldCheck className="h-4 w-4 text-[#6688ff]" />
        Verify
      </div>
      <div className="absolute bottom-[12%] right-[18%] flex items-center gap-3 border border-white/[0.15] bg-black/[0.55] px-4 py-3 text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
        <WalletCards className="h-4 w-4 text-emerald-200" />
        Utility
      </div>

      <div className="absolute left-1/2 top-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center border border-emerald-200 bg-[#9fffd5] text-[#050807]">
        <div className="text-center">
          <div className="text-5xl font-black">J</div>
          <div className="mt-2 text-xs font-black uppercase tracking-[0.28em]">Presence</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-[#f4f7f1] text-[#07110d]">
      <section className="relative overflow-hidden bg-[#050807] text-white">
        <div className="container mx-auto grid min-h-[calc(100vh-5rem)] grid-cols-1 gap-0 px-4 lg:grid-cols-[0.95fr_0.78fr]">
          <div className="flex flex-col justify-center border-x border-white/10 px-0 py-20 lg:min-h-[760px] lg:border-r-0 lg:py-28">
            <div className="max-w-5xl px-0 lg:pr-12">
              <div className="mb-10 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.24em] text-emerald-200">
                <span className="border border-emerald-200/35 px-3 py-2">Proof-of-Presence</span>
                <span className="border border-white/[0.15] px-3 py-2 text-slate-300">BNB utility layer</span>
              </div>

              <h1 className="max-w-5xl text-[5.6rem] font-black uppercase leading-[0.76] tracking-normal text-white sm:text-[7.6rem] md:text-[10rem] xl:text-[12.6rem]">
                JAVURO
              </h1>

              <div className="mt-8 grid gap-8 border-t border-white/[0.15] pt-8 lg:grid-cols-[0.72fr_1fr]">
                <p className="text-3xl font-black leading-tight text-emerald-100 md:text-5xl">
                  Proof that presence happened.
                </p>
                <div>
                  <p className="max-w-2xl text-lg leading-8 text-slate-300 md:text-xl md:leading-9">
                    A real-world participation network that turns offline actions into structured records for rewards,
                    reputation, and future utility.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href="/mvp">
                      <span className="inline-flex h-14 items-center justify-center gap-2 bg-emerald-200 px-6 text-base font-extrabold text-[#07110d] transition hover:bg-white">
                        View MVP scope
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                    <Link href="/whitepaper">
                      <span className="inline-flex h-14 items-center justify-center border border-white/[0.18] px-6 text-base font-extrabold text-white transition hover:bg-white hover:text-[#07110d]">
                        Read docs
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-x border-white/10 lg:border-l">
            <PresenceField />
          </div>
        </div>
      </section>

      <section className="border-b border-[#07110d]/[0.15] bg-[#f4f7f1]">
        <div className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-[0.72fr_1.28fr] lg:py-28">
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#2d6b58]">Product loop</p>
            <h2 className="max-w-xl text-5xl font-black leading-[0.94] md:text-7xl">
              One action loop. No fake traction.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-[#07110d]/[0.15] bg-[#07110d]/[0.15] md:grid-cols-2 xl:grid-cols-3">
            {experienceSurface.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="min-h-[230px] bg-[#f4f7f1] p-6">
                  <div className="mb-12 flex items-center justify-between">
                    <span className="font-mono text-sm font-black text-[#2d6b58]">{String(index + 1).padStart(2, "0")}</span>
                    <Icon className="h-6 w-6 text-[#6688ff]" />
                  </div>
                  <h3 className="text-3xl font-black">{item.title}</h3>
                  <p className="mt-4 leading-7 text-[#42514b]">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#07110d] text-white">
        <div className="container mx-auto grid gap-0 px-4 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
          <div className="border border-white/[0.12] p-8 md:p-10">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-emerald-200">Current build</p>
            <h2 className="text-5xl font-black leading-[0.94] md:text-7xl">The smallest credible loop first.</h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
              The website should look serious because the execution path is serious: wallet onboarding, verified records,
              and reward eligibility before broader financial language.
            </p>
            <Link href="/mvp">
              <span className="mt-8 inline-flex h-14 items-center justify-center gap-2 border border-white/[0.18] px-6 font-extrabold text-white transition hover:bg-white hover:text-[#07110d]">
                See what ships first
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          <div className="grid border-y border-r border-white/[0.12] sm:grid-cols-2">
            {mvpScope.map((item, index) => (
              <div key={item} className="min-h-32 border-b border-l border-white/[0.12] p-6 sm:[&:nth-last-child(-n+2)]:border-b-0">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-200" />
                  <div>
                    <span className="font-mono text-xs font-black text-slate-500">{String(index + 1).padStart(2, "0")}</span>
                    <p className="mt-3 text-xl font-black">{item}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#07110d]/[0.15] bg-white">
        <div className="container mx-auto grid gap-12 px-4 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:py-28">
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#2d6b58]">Why it matters</p>
            <h2 className="text-5xl font-black leading-[0.94] md:text-7xl">
              AI can make content. It cannot stand in your place.
            </h2>
          </div>
          <div className="space-y-8">
            <p className="text-2xl font-black leading-tight text-[#07110d]">
              Real human presence is still scarce: a person, at a place, at a time, doing something that can be verified.
            </p>
            <p className="text-lg leading-8 text-[#42514b]">
              JAVURO uses the social product as the collection surface for this signal. Credit and RWA language should
              come later, after real participation data and partner validation exist.
            </p>
            <div className="grid grid-cols-2 gap-px border border-[#07110d]/[0.15] bg-[#07110d]/[0.15] sm:grid-cols-4">
              {proofSignals.map((signal) => (
                <div key={signal} className="min-h-20 bg-white p-4 text-sm font-black text-[#07110d]">
                  {signal}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7f1]">
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="mb-14 flex flex-col gap-6 border-b border-[#07110d]/[0.15] pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#2d6b58]">System logic</p>
              <h2 className="text-5xl font-black leading-[0.94] md:text-7xl">Three layers. One proof surface.</h2>
            </div>
            <Layers3 className="h-10 w-10 text-[#6688ff]" />
          </div>

          <div className="grid gap-px overflow-hidden border border-[#07110d]/[0.15] bg-[#07110d]/[0.15] lg:grid-cols-3">
            {systemLayers.map((layer, index) => (
              <article key={layer.title} className="bg-[#f4f7f1] p-7 md:p-8">
                <div className="mb-16 flex items-center justify-between">
                  <span className="border border-[#2d6b58]/[0.35] px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-[#2d6b58]">
                    {layer.tag}
                  </span>
                  <span className="font-mono text-sm font-black text-[#ff765e]">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-3xl font-black">{layer.title}</h3>
                <p className="mt-5 leading-7 text-[#42514b]">{layer.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07110d] text-white">
        <div className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-[0.82fr_1.18fr] lg:py-28">
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-emerald-200">Who it serves</p>
            <h2 className="text-5xl font-black leading-[0.94] md:text-7xl">
              Budgets follow verified action, not empty impressions.
            </h2>
          </div>
          <div className="grid gap-px border border-white/[0.12] bg-white/[0.12] md:grid-cols-3">
            {partnerCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="min-h-[250px] bg-[#07110d] p-7">
                  <Icon className="mb-12 h-8 w-8 text-emerald-200" />
                  <h3 className="text-2xl font-black">{card.title}</h3>
                  <p className="mt-5 leading-7 text-slate-300">{card.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#9fffd5] text-[#07110d]">
        <div className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#2d6b58]">Public position</p>
            <h2 className="max-w-4xl text-4xl font-black leading-[0.96] md:text-6xl">
              Verified participation first. Behavior credit later.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#234238]">
              This keeps JAVURO credible today while preserving the path toward reputation, settlement, escrow, and
              future financial utility.
            </p>
          </div>
          <Link href="/mvp">
            <span className="inline-flex h-14 items-center justify-center gap-2 bg-[#07110d] px-6 text-base font-extrabold text-white">
              Review MVP scope
              <CircleDot className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
