import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useWeb3 } from "@/lib/web3/context";
import { WalletButton } from "@/components/ui/wallet-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [location] = useLocation();
  const { account, connectWallet, disconnectWallet, isConnecting } = useWeb3();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/token", label: "Token" },
    { path: "/whitepaper", label: "Technical Docs" },
    { path: "/rewards", label: "Rewards" },
    { path: "/mypage", label: "My Page" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] to-[#FF6F61]">
              JAVURO
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span
                  className={`text-sm hover:text-[#3A86FF] transition-colors cursor-pointer ${
                    location === item.path ? "text-[#3A86FF]" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-[#3A86FF]"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-black/90 backdrop-blur-sm border-2 border-gray-800">
                <div className="flex flex-col p-2">
                  {menuItems.map((item) => (
                    <Link key={item.path} href={item.path}>
                      <span
                        className={`block px-4 py-2 text-sm rounded hover:bg-[#3A86FF]/10 cursor-pointer ${
                          location === item.path ? "text-[#3A86FF]" : "text-gray-400"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center space-x-4">
            {account ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2 border-[#3A86FF] text-[#3A86FF] hover:bg-[#3A86FF]/10"
                  >
                    {`${account.slice(0, 6)}...${account.slice(-4)}`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-4 bg-black/90 backdrop-blur-sm border-2 border-gray-800">
                  <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-400">
                        Connected Wallet
                      </h3>
                      <p className="text-xs font-mono break-all text-white">
                        {account}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-2 border-red-500 text-red-500 hover:bg-red-500/10"
                      onClick={() => {
                        disconnectWallet();
                      }}
                    >
                      Disconnect
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#3A86FF] to-[#3A86FF]/80"
                onClick={() => connectWallet()}
                disabled={isConnecting}
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}