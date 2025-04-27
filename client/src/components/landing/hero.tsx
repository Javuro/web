import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import AnimatedMap from "@/components/landing/animated-map";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#3A86FF]/20 to-black opacity-80" />

      <div className="container relative mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] to-[#FF6F61] mb-8"
          >
            Your Instant Journey. JAVURO.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            A revolutionary BNB Chain-powered platform with precise location-based recommendations within 500m-1km radius, ephemeral group chats, and community-driven token economics
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link href="/community">
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-12 text-lg border-2 border-[#FF6F61] text-[#FF6F61] hover:bg-[#FF6F61]/10 transition-all duration-300"
              >
                Join Community
              </Button>
            </Link>
            <Link href="/download">
              <Button
                size="lg"
                className="h-16 px-12 text-lg bg-gradient-to-r from-[#3A86FF] to-[#3A86FF]/80 hover:from-[#3A86FF]/90 hover:to-[#3A86FF]/70 transition-all duration-300"
              >
                Download App
              </Button>
            </Link>
            <Link href="/token">
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-12 text-lg border-2 border-[#3A86FF] text-[#3A86FF] hover:bg-[#3A86FF]/10 transition-all duration-300"
              >
                View JXRO Token
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 opacity-30">
        <AnimatedMap />
      </div>

      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
    </section>
  );
}