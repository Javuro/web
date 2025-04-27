import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Star,
  Users,
  Award,
  Gift,
  Crown,
  BookOpen,
  Coins,
  TrendingUp,
  Shield,
  Zap,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const activityRewards = [
  {
    icon: <MapPin className="h-8 w-8" />,
    title: "Check-in Rewards",
    description: "Earn JXRO tokens automatically when visiting recommended locations"
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: "Content Contribution",
    description: "Get rewarded for writing reviews, sharing photos, and event feedback"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Event Participation",
    description: "Receive tokens for participating in app events and meetups"
  }
];

const communityRewards = [
  {
    icon: <Crown className="h-8 w-8" />,
    title: "Community Voting",
    description: "Earn rewards through proposal submissions and voting participation"
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Curator Rewards",
    description: "Monthly bonuses for selected outstanding curators"
  },
  {
    icon: <Gift className="h-8 w-8" />,
    title: "Referral Rewards",
    description: "Get rewarded for inviting friends and promoting new sign-ups"
  }
];

export default function Rewards() {
  const { toast } = useToast();

  const handleRewardsGuide = () => {
    toast({
      title: "Coming Soon",
      description: "The rewards guide is being updated with new features and will be available soon.",
    });
  };

  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            JAVURO Rewards
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Earn JXRO tokens through various activities and unlock exclusive benefits
          </p>
        </motion.div>

        {/* Activity Rewards Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Activity Rewards</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {activityRewards.map((reward, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-[#3A86FF]/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 text-[#3A86FF]">{reward.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{reward.title}</h3>
                    <p className="text-muted-foreground">{reward.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community Rewards Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Community Rewards</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {communityRewards.map((reward, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-[#3A86FF]/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 text-[#3A86FF]">{reward.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{reward.title}</h3>
                    <p className="text-muted-foreground">{reward.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reward Mechanism Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Shield className="h-8 w-8 text-[#3A86FF]" />
                <h2 className="text-3xl font-bold">Reward Distribution Mechanism</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Automatic Distribution System</h3>
                  <p className="text-muted-foreground">
                    We operate a secure and transparent reward system through smart contracts
                    with regular security audits and automated reward distribution.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Settlement and Verification</h3>
                  <p className="text-muted-foreground">
                    Monitor your accumulated rewards, remaining tokens, and staking status
                    in real-time through weekly and monthly settlements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Level and Staking Rewards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-[#3A86FF]/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Zap className="h-8 w-8 text-[#3A86FF]" />
                  <h3 className="text-2xl font-semibold">Level System</h3>
                </div>
                <ul className="space-y-4 text-muted-foreground">
                  <li>• Level progression based on activity</li>
                  <li>• Bonus tokens for each level</li>
                  <li>• Special benefits and limited NFTs</li>
                  <li>• Tiered rewards by level</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-[#3A86FF]/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <TrendingUp className="h-8 w-8 text-[#3A86FF]" />
                  <h3 className="text-2xl font-semibold">Staking Rewards</h3>
                </div>
                <ul className="space-y-4 text-muted-foreground">
                  <li>• Additional rewards for token staking</li>
                  <li>• Long-term staking incentives</li>
                  <li>• Tiered benefits by staking amount</li>
                  <li>• Automatic staking rewards</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Support and Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <HelpCircle className="h-16 w-16 mx-auto mb-6 text-[#3A86FF]" />
              <h2 className="text-2xl font-semibold mb-4">Support & Information</h2>
              <p className="text-muted-foreground mb-6">
                Our reward system guide is currently being updated with new features and comprehensive information.
                For any inquiries, please reach out through our email support.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#3A86FF] to-[#3A86FF]/80"
                  onClick={handleRewardsGuide}
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Rewards Guide
                </Button>
                <a
                  href="mailto:support@javuro.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#3A86FF] text-[#3A86FF] hover:bg-[#3A86FF]/10"
                  >
                    <HelpCircle className="mr-2 h-5 w-5" />
                    Contact Support
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}