import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, MessageSquare, Brain, Users, Coins } from "lucide-react";

const features = [
  {
    icon: <MapPin className="h-8 w-8" />,
    title: "Real-time Location-based Recommendations",
    description: "Automatic recommendations for restaurants, cafes, and events within 500m-1km",
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Instant Group Chat",
    description: "Immediate communication channels created upon arrival at recommended locations",
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Dual Curation",
    description: "Personalized content through AI and human curators",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Community-Driven Locations",
    description: "Areas and events determined by user votes and feedback",
  },
  {
    icon: <Coins className="h-8 w-8" />,
    title: "Hybrid Token (JXRO)",
    description: "Supports rewards, premium payments, staking, and governance participation",
  },
];

export default function Features() {
  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3A86FF] to-[#FF6F61]">
            Core Features
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-[#3A86FF]/50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="mb-6 text-[#3A86FF]">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}