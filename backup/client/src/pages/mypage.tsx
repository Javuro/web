import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Wallet,
  Coins,
  History,
  Award
} from "lucide-react";
import { useWeb3 } from "@/lib/web3/context";
import { useContractRead, useNetwork } from 'wagmi';
import { contracts } from "@/lib/web3/contracts";
import { formatEther } from 'viem';
import { useToast } from "@/hooks/use-toast";

export default function MyPage() {
  const { account, connectWallet, isConnecting } = useWeb3();
  const { toast } = useToast();
  const { chain } = useNetwork();

  const { data: tokenBalance, isError, isLoading, error } = useContractRead({
    address: contracts.JXRO.address,
    abi: contracts.JXRO.abi,
    functionName: 'balanceOf',
    args: [account as `0x${string}`],
    enabled: !!account,
    onError: (error) => {
      console.error('Token balance query error:', error);
      console.log('Current chain:', chain?.id);
      console.log('Contract address:', contracts.JXRO.address);
      console.log('Account address:', account);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to fetch token balance: ${error?.message || 'Unknown error'}`,
      });
    },
  });

  // Log contract interaction details
  console.log('Contract interaction details:', {
    chainId: chain?.id,
    contractAddress: contracts.JXRO.address,
    accountAddress: account,
    isError,
    error,
    tokenBalance
  });

  if (!account) {
    return (
      <div className="bg-background">
        <main className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Wallet Connection Required
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Please connect your wallet to access your personal page
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#3A86FF] to-[#3A86FF]/80"
              onClick={connectWallet}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            My Page
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Check your wallet information and staking status
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-gray-800 hover:border-[#3A86FF]/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Wallet className="h-8 w-8 text-[#3A86FF]" />
                <h2 className="text-2xl font-semibold">My Wallet</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Address</span>
                  <span className="font-mono text-sm truncate max-w-[200px]">{account}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Token Balance</span>
                  {isLoading ? (
                    <span>Loading...</span>
                  ) : isError ? (
                    <span className="text-red-500">
                      Error: {error?.message || 'Unknown error'}
                    </span>
                  ) : (
                    <span>{tokenBalance ? `${formatEther(tokenBalance)} JXRO` : '0 JXRO'}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Network</span>
                  <span>{chain?.name || 'Unknown Network'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-gray-800 hover:border-[#3A86FF]/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Coins className="h-8 w-8 text-[#3A86FF]" />
                <h2 className="text-2xl font-semibold">Staking</h2>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Staked Amount</span>
                  <span>0 JXRO</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Earned Rewards</span>
                  <span>0 JXRO</span>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-[#3A86FF] to-[#3A86FF]/80"
                  disabled={true}
                  onClick={() => {
                    toast({
                      title: "Coming Soon",
                      description: "Staking feature will be available soon.",
                    });
                  }}
                >
                  Stake Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-gray-800 hover:border-[#3A86FF]/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <History className="h-8 w-8 text-[#3A86FF]" />
                <h2 className="text-2xl font-semibold">Transaction History</h2>
              </div>
              <p className="text-gray-400">No recent transactions</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-gray-800 hover:border-[#3A86FF]/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Award className="h-8 w-8 text-[#3A86FF]" />
                <h2 className="text-2xl font-semibold">Rewards</h2>
              </div>
              <p className="text-gray-400">No available rewards</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}