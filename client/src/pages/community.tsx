import { Mail, MessageCircle, RadioTower, Users } from "lucide-react";
import { FaDiscord, FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa";

const channels = [
  { name: "X", url: "https://x.com/jxro_project", icon: FaTwitter },
  { name: "Discord", url: "https://discord.gg/WhhRtaZYKK", icon: FaDiscord },
  { name: "Telegram", url: "https://t.me/+ChICn7uPC4pjNTFl", icon: FaTelegram },
  { name: "Instagram", url: "https://www.instagram.com/official_jxro/", icon: FaInstagram },
];

const cards = [
  {
    title: "Product updates",
    body: "Follow MVP progress, wallet onboarding, participation-proof logic, and release notes.",
    icon: MessageCircle,
  },
  {
    title: "Early contribution",
    body: "Help shape check-ins, reviews, place submissions, and campaign task design.",
    icon: RadioTower,
  },
  {
    title: "Partner signal",
    body: "Create a credible surface for users, venues, partners, and ecosystem contributors.",
    icon: Users,
  },
];

export default function Community() {
  return (
    <div className="bg-[#f4f7f1] text-[#07110d]">
      <section className="bg-[#050807] text-white">
        <main className="container mx-auto grid min-h-[calc(100vh-5rem)] gap-12 px-4 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-28">
          <div>
            <p className="mb-6 text-sm font-black uppercase tracking-[0.28em] text-emerald-200">Community</p>
            <h1 className="text-6xl font-black uppercase leading-[0.82] md:text-8xl xl:text-9xl">
              Join the proof network.
            </h1>
          </div>
          <div className="border border-white/[0.12] p-8 md:p-10">
            <p className="text-3xl font-black leading-tight text-emerald-100 md:text-5xl">
              A community around verified participation.
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              JAVURO community channels are for product updates, ecosystem discussion, partner announcements, and early
              participation campaigns.
            </p>
          </div>
        </main>
      </section>

      <section className="bg-[#f4f7f1]">
        <div className="container mx-auto grid gap-px px-4 py-20 md:grid-cols-3 lg:py-28">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="border border-[#07110d]/[0.15] bg-[#f4f7f1] p-7 md:p-8">
                <div className="mb-14 flex items-center justify-between">
                  <Icon className="h-8 w-8 text-[#2d6b58]" />
                  <span className="font-mono text-sm font-black text-[#ff765e]">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h2 className="text-3xl font-black">{card.title}</h2>
                <p className="mt-5 leading-7 text-[#42514b]">{card.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[#07110d] text-white">
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="mb-12 max-w-4xl">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-emerald-200">Channels</p>
            <h2 className="text-5xl font-black leading-[0.94] md:text-7xl">Follow the official surfaces.</h2>
          </div>
          <div className="grid gap-px border border-white/[0.12] bg-white/[0.12] md:grid-cols-4">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.name}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-48 flex-col justify-between bg-[#07110d] p-7 transition hover:bg-[#0d1b15]"
                >
                  <Icon className="h-8 w-8 text-emerald-200" />
                  <span className="text-3xl font-black text-white">{channel.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#9fffd5] text-[#07110d]">
        <div className="container mx-auto flex flex-col gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-4xl font-black leading-[0.96] md:text-6xl">Contact</h2>
            <p className="mt-5 text-lg leading-8 text-[#234238]">For support, partnership, or documentation inquiries.</p>
          </div>
          <a href="mailto:support@javuro.com" className="inline-flex h-14 items-center justify-center gap-2 bg-[#07110d] px-6 font-black text-white">
            <Mail className="h-5 w-5" />
            support@javuro.com
          </a>
        </div>
      </section>
    </div>
  );
}
