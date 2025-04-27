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
    <footer className="bg-black/50 backdrop-blur-sm text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">JAVURO</h3>
            <p className="text-sm">
              Where Spontaneous Experiences Meet Web3
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-[#3A86FF] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#3A86FF] transition-colors">About</Link></li>
              <li><Link href="/token" className="hover:text-[#3A86FF] transition-colors">Token</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-[#3A86FF] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[#3A86FF] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-[#3A86FF] transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <div className="flex space-x-4">
              <a href="https://x.com/jxro_project" target="_blank" rel="noopener noreferrer" className="hover:text-[#3A86FF] transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://discord.gg/WhhRtaZYKK" target="_blank" rel="noopener noreferrer" className="hover:text-[#3A86FF] transition-colors">
                <FaDiscord size={20} />
              </a>
              <a href="https://t.me/+ChICn7uPC4pjNTFl" target="_blank" rel="noopener noreferrer" className="hover:text-[#3A86FF] transition-colors">
                <FaTelegram size={20} />
              </a>
              <a href="https://www.instagram.com/official_jxro/" target="_blank" rel="noopener noreferrer" className="hover:text-[#3A86FF] transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800 my-8" />

        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} JAVURO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}