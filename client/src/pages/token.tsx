import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import {
  Coins,
  ShieldCheck,
  BarChart3,
  Copy,
  ExternalLink,
  MessageSquare,
  ThumbsUp,
  Users
} from "lucide-react";

const tokenFeatures = [
  {
    icon: <Coins className="h-8 w-8" />,
    title: "Platform Utility",
    description: "In-app features access, community participation, premium services",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Community Engagement",
    description: "Participation in platform activities and contribution recognition",
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Secure Technology",
    description: "Smart contract-based secure technology implementation",
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Feedback Participation",
    description: "Opportunity to provide suggestions for platform improvements",
  },
  {
    icon: <ThumbsUp className="h-8 w-8" />,
    title: "Ecosystem Balance",
    description: "Self-regulating ecosystem design to maintain utility functionality",
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Transparency",
    description: "Regular technical reports and operational updates",
  },
];

const CONTRACT_ADDRESS = "0x92040BcFEF87Ddfe2B7a571E1D804ED064b851f1"; // JXRO Contract Address
const TOTAL_SUPPLY = "10,000,000,000";
const EXPLORER_URL = "https://bscscan.com/token/" + CONTRACT_ADDRESS;

export default function Token() {
  const { toast } = useToast();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    toast({
      title: "Address Copied",
      description: "Contract address has been copied to clipboard",
    });
  };

  // We no longer need handleLearnMore as we're using Link component directly

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
            JXRO Token
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A BNB Chain-based utility token powering the JAVURO ecosystem
          </p>
        </motion.div>

        {/* Token Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-gray-800">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Token Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Contract Address</span>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-800/50 px-2 py-1 rounded text-sm">
                      {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={handleCopyAddress}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <a
                      href={EXPLORER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3A86FF] hover:text-[#3A86FF]/80"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span>{TOTAL_SUPPLY} JXRO</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Network</span>
                  <span>BNB Chain (BSC)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Token Type</span>
                  <span>BEP-20</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {tokenFeatures.map((feature, index) => (
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
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Token Allocation Framework</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Development Team</span>
                  <span className="font-semibold">20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Community & Platform Activities</span>
                  <span className="font-semibold">33%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Strategic Partnerships</span>
                  <span className="font-semibold">20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ecosystem Development</span>
                  <span className="font-semibold">5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Platform Operations</span>
                  <span className="font-semibold">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Community Growth</span>
                  <span className="font-semibold">4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Technology Reserve</span>
                  <span className="font-semibold">3%</span>
                </div>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                <span className="font-medium">Note:</span> Token distribution will follow a controlled release schedule to ensure platform stability.
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">JXRO Token Utility</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Application-Focused Token</h3>
                <p className="text-muted-foreground mb-4">
                  JXRO serves as a functional component within the JAVURO platform ecosystem. 
                  It facilitates platform activities such as community engagement, access to premium features,
                  and participation in platform improvement suggestions.
                </p>
                <p className="text-muted-foreground">
                  The token is designed primarily for platform utility purposes with distribution to
                  various ecosystem participants according to a carefully planned allocation framework to
                  maintain platform functionality and stability.
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3">Token Distribution Information</h3>
                <div className="space-y-2 mb-4">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="font-medium">Allocation</div>
                    <div className="font-medium">Percentage</div>
                    <div className="font-medium">Purpose</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>Development Team</div>
                    <div>20%</div>
                    <div>Long-term platform development and maintenance</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>Community & Platform</div>
                    <div>33%</div>
                    <div>Platform participation and contribution recognition</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>Strategic Partnerships</div>
                    <div>20%</div>
                    <div>Technology and integration partnerships</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>Ecosystem Development</div>
                    <div>5%</div>
                    <div>For platform ecosystem expansion</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>Platform Operations</div>
                    <div>15%</div>
                    <div>Technical maintenance and operational costs</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>Community Growth</div>
                    <div>4%</div>
                    <div>User education and community building</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>Technology Reserve</div>
                    <div>3%</div>
                    <div>Strategic technical improvements and contingencies</div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-gray-900/30 rounded-lg text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Important Notice:</p>
                  <p>JXRO tokens are utility tokens designed specifically for use within the JAVURO platform ecosystem. They are not designed as investment vehicles and do not represent any ownership rights, profit sharing, or expectation of financial returns. Token distribution is structured to support platform functionality and user engagement.</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">JXRO Usage Within Platform</h3>
                <p className="text-muted-foreground mb-4">
                  JXRO facilitates various platform activities and enhances user engagement with JAVURO features.
                </p>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Platform Utility:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Access to in-app premium features (advanced content, customization options)</li>
                    <li>Platform participation recognition</li>
                    <li>Content curation and quality contributions</li>
                    <li>Community benefits and platform integrations</li>
                    <li>Feedback mechanism for platform improvement suggestions</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Platform Activity:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    <li>Recognition for beneficial contributions to the platform</li>
                    <li>Technical distribution mechanisms to maintain token utility</li>
                    <li>Functional distribution through platform activities</li>
                    <li>Example: Users contribute to platform quality through content curation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-4xl mx-auto mb-12 bg-gradient-to-r from-[#3A86FF]/10 to-[#FF6F61]/10 p-8 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-3 text-center">The JAVURO Platform</h3>
          <p className="text-center text-muted-foreground">
            JAVURO provides a real-time location-based social platform experience with integrated utility features.
            Our technology delivers precise recommendations within a 500m-1km radius and ephemeral group chats,
            creating meaningful connections between digital engagement and real-world activities through 
            our BNB Chain-powered ecosystem.
          </p>
          <p className="text-center text-sm mt-4 text-muted-foreground">
            This information is for educational purposes only and does not constitute financial advice or an offer to sell securities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/whitepaper">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#3A86FF] to-[#FF6F61]/80"
            >
              Technical Documentation
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}