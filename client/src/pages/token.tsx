import { useToast } from "@/hooks/use-toast";
import { BadgeCheck, Copy, ExternalLink, ShieldCheck, Sparkles, Users, WalletCards } from "lucide-react";

const CONTRACT_ADDRESS = "0x92040BcFEF87Ddfe2B7a571E1D804ED064b851f1";
const TOTAL_SUPPLY = "10,000,000,000";
const EXPLORER_URL = "https://bscscan.com/token/" + CONTRACT_ADDRESS;

const utilities = [
  {
    title: "Participation rewards",
    body: "JXRO can recognize verified actions such as check-ins, reviews, missions, and campaign completion.",
    icon: Sparkles,
  },
  {
    title: "Platform access",
    body: "The token supports premium access, ecosystem participation, and future utility inside JAVURO.",
    icon: WalletCards,
  },
  {
    title: "Community governance",
    body: "JXRO can support community input and ecosystem coordination as the network matures.",
    icon: Users,
  },
];

const allocation = [
  ["Founder & Team", "20%"],
  ["Community & Ecosystem Rewards", "33%"],
  ["Strategic Partnerships", "20%"],
  ["IEO / Launchpad", "5%"],
  ["Liquidity & Operations", "15%"],
  ["Marketing & Partnerships", "4%"],
  ["Reserve", "3%"],
];

export default function Token() {
  const { toast } = useToast();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    toast({
      title: "Address copied",
      description: "The JXRO contract address has been copied.",
    });
  };

  return (
    <div className="bg-[#f4f7f1] text-[#07110d]">
      <section className="bg-[#050807] text-white">
        <main className="container mx-auto grid min-h-[calc(100vh-5rem)] gap-12 px-4 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-28">
          <div>
            <p className="mb-6 text-sm font-black uppercase tracking-[0.28em] text-emerald-200">JXRO token</p>
            <h1 className="text-6xl font-black uppercase leading-[0.82] md:text-8xl xl:text-9xl">
              Utility, not hype.
            </h1>
          </div>
          <div className="border border-white/[0.12] p-8 md:p-10">
            <p className="text-3xl font-black leading-tight text-emerald-100 md:text-5xl">
              A BEP-20 utility token for verified participation.
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              JXRO is positioned as platform utility for rewards, access, staking, governance, and ecosystem coordination.
            </p>
          </div>
        </main>
      </section>

      <section className="border-b border-[#07110d]/[0.15] bg-white">
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-5 text-sm font-black uppercase tracking-[0.22em] text-[#2d6b58]">Contract</p>
              <h2 className="text-5xl font-black leading-[0.94] md:text-7xl">BNB Chain utility layer.</h2>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex h-12 items-center justify-center gap-2 border border-[#07110d]/[0.15] px-4 font-black text-[#07110d] hover:bg-[#07110d] hover:text-white"
              >
                <Copy className="h-4 w-4" />
                Copy
              </button>
              <a
                href={EXPLORER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 bg-[#07110d] px-4 font-black text-white hover:bg-[#2d6b58]"
              >
                BscScan
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-px border border-[#07110d]/[0.15] bg-[#07110d]/[0.15] md:grid-cols-[1.4fr_0.8fr_0.8fr]">
            <div className="bg-white p-6">
              <span className="text-sm font-black uppercase tracking-[0.18em] text-[#2d6b58]">Contract address</span>
              <p className="mt-4 break-all font-mono text-lg font-black">{CONTRACT_ADDRESS}</p>
            </div>
            <div className="bg-white p-6">
              <span className="text-sm font-black uppercase tracking-[0.18em] text-[#2d6b58]">Supply</span>
              <p className="mt-4 text-3xl font-black">{TOTAL_SUPPLY}</p>
            </div>
            <div className="bg-white p-6">
              <span className="text-sm font-black uppercase tracking-[0.18em] text-[#2d6b58]">Network</span>
              <p className="mt-4 text-3xl font-black">BNB Chain</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7f1]">
        <div className="container mx-auto grid gap-px px-4 py-20 md:grid-cols-3 lg:py-28">
          {utilities.map((item, index) => {
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
        <div className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-[0.82fr_1.18fr] lg:py-28">
          <div>
            <ShieldCheck className="mb-8 h-10 w-10 text-emerald-200" />
            <h2 className="text-5xl font-black leading-[0.94] md:text-7xl">Allocation framework</h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              Allocations are subject to lock-up and operational disclosure policies.
            </p>
          </div>
          <div className="grid gap-px border border-white/[0.12] bg-white/[0.12]">
            {allocation.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between bg-[#07110d] p-5">
                <span className="font-black text-slate-200">{label}</span>
                <strong className="text-2xl text-emerald-200">{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#9fffd5] text-[#07110d]">
        <div className="container mx-auto px-4 py-16">
          <BadgeCheck className="mb-8 h-9 w-9" />
          <h2 className="max-w-4xl text-4xl font-black leading-[0.96] md:text-6xl">Utility, not investment positioning.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#234238]">
            JXRO should be described as a functional component of the JAVURO ecosystem, not as a promise of profit,
            yield, or financial return.
          </p>
        </div>
      </section>
    </div>
  );
}
