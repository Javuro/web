import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useWeb3 } from "@/lib/web3/context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const { account, connectWallet, disconnectWallet, isConnecting } = useWeb3();

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "Vision" },
    { path: "/mvp", label: "MVP" },
    { path: "/token", label: "Token" },
    { path: "/whitepaper", label: "Docs" },
    { path: "/community", label: "Community" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.12] bg-[#050807]/90 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <span className="flex cursor-pointer items-center gap-3 text-xl font-black text-white">
              <span className="grid h-10 w-10 place-items-center bg-emerald-200 text-[#07110d]">J</span>
              <span>JAVURO</span>
            </span>
          </Link>

          <nav className="hidden items-center border border-white/[0.12] bg-white/[0.035] px-2 py-1 lg:flex">
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span
                  className={`inline-flex h-9 cursor-pointer items-center px-3 text-sm font-black transition-colors ${
                    location === item.path ? "bg-emerald-200 text-[#07110d]" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[220px] border-white/10 bg-[#050807]/95 backdrop-blur-xl">
                <div className="flex flex-col p-2">
                  {menuItems.map((item) => (
                    <Link key={item.path} href={item.path}>
                      <span
                        className={`block cursor-pointer px-4 py-2 text-sm font-black ${
                          location === item.path ? "bg-emerald-200 text-[#07110d]" : "text-slate-300 hover:bg-white/10"
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
                    className="border-white/[0.15] text-white hover:bg-white/10"
                  >
                    {`${account.slice(0, 6)}...${account.slice(-4)}`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 border-white/10 bg-[#050807]/95 p-4 backdrop-blur-xl">
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
                className="h-11 bg-emerald-200 px-5 font-extrabold text-[#07110d] hover:bg-white"
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
