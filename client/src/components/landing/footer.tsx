import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";
import { 
  FaTwitter, 
  FaDiscord, 
  FaTelegram, 
  FaInstagram 
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.12] bg-[#050807] py-14 text-slate-400">
      <div className="container mx-auto px-4">
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <h3 className="mb-4 text-3xl font-black text-white">JAVURO</h3>
            <p className="max-w-xs text-sm leading-6">Proof of real-world participation.</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-emerald-200">Site</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-emerald-200 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-emerald-200 transition-colors">Vision</Link></li>
              <li><Link href="/mvp" className="hover:text-emerald-200 transition-colors">MVP</Link></li>
              <li><Link href="/token" className="hover:text-emerald-200 transition-colors">Token</Link></li>
              <li><Link href="/whitepaper" className="hover:text-emerald-200 transition-colors">Docs</Link></li>
              <li><Link href="/rewards" className="hover:text-emerald-200 transition-colors">Rewards</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-emerald-200">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-emerald-200 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-200 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-emerald-200 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-black uppercase tracking-[0.18em] text-emerald-200">Community</h4>
            <div className="flex space-x-4">
              <a href="https://x.com/jxro_project" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-200 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://discord.gg/WhhRtaZYKK" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-200 transition-colors">
                <FaDiscord size={20} />
              </a>
              <a href="https://t.me/+ChICn7uPC4pjNTFl" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-200 transition-colors">
                <FaTelegram size={20} />
              </a>
              <a href="https://www.instagram.com/official_jxro/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-200 transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/[0.12]" />

        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} JAVURO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
