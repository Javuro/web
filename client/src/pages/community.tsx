import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  MessageSquare, 
  Vote, 
  Trophy,
  Globe,
  Mail
} from "lucide-react";
import { 
  FaDiscord, 
  FaTelegram,
  FaTwitter, 
  FaInstagram 
} from "react-icons/fa";

const communityFeatures = [
  {
    icon: <Users className="h-8 w-8" />,
    title: "Active Community",
    description: "Connect with JAVURO users worldwide",
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Ephemeral Group Chat",
    description: "Join location-based group chats within 500m-1km radius",
  },
  {
    icon: <Vote className="h-8 w-8" />,
    title: "Vote Participation",
    description: "Participate in community decisions and earn rewards",
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: "Reward System",
    description: "Earn JXRO tokens for your activities",
  },
];

const socialChannels = [
  {
    icon: <FaDiscord size={24} />,
    name: "Discord",
    url: "https://discord.gg/WhhRtaZYKK",
    color: "bg-[#7289DA]",
  },
  {
    icon: <FaTelegram size={24} />,
    name: "Telegram",
    url: "https://t.me/+ChICn7uPC4pjNTFl",
    color: "bg-[#0088cc]",
  },
  {
    icon: <FaTwitter size={24} />,
    name: "X",
    url: "https://x.com/jxro_project",
    color: "bg-[#1DA1F2]",
  },
  {
    icon: <FaInstagram size={24} />,
    name: "Instagram",
    url: "https://www.instagram.com/official_jxro/",
    color: "bg-[#E4405F]",
  },
];

export default function Community() {
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
            JAVURO Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Grow together with the global JAVURO community
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-[#3A86FF]/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 text-[#3A86FF]">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-8">Social Channels</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {socialChannels.map((channel, index) => (
              <Button
                key={index}
                className={`${channel.color} hover:opacity-90 h-16`}
                size="lg"
                asChild
              >
                <a href={channel.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  {channel.icon}
                  <span>{channel.name}</span>
                </a>
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Mail className="h-16 w-16 mx-auto mb-6 text-[#3A86FF]" />
              <h3 className="text-2xl font-semibold mb-4">Support</h3>
              <p className="text-muted-foreground mb-6">
                Contact our support team for any questions about JAVURO platform features, token utility, or technical assistance
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#3A86FF] to-[#3A86FF]/80"
                asChild
              >
                <a 
                  href="mailto:support@javuro.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Contact Support
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}