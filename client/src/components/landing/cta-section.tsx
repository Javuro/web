import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CTASection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] to-[#FF6F61] mb-6">
            Start Your Journey Now
          </h2>
          <p className="text-lg mb-8 text-gray-400">
            New experiences and rewards await you
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/download">
              <Button
                size="lg"
                className="h-16 px-12 text-lg bg-gradient-to-r from-[#3A86FF] to-[#3A86FF]/80 hover:from-[#3A86FF]/90 hover:to-[#3A86FF]/70 transition-all duration-300"
              >
                Download App
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-12 text-lg border-2 border-[#3A86FF] text-[#3A86FF] hover:bg-[#3A86FF]/10 transition-all duration-300"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}