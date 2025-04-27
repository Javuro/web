import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] to-[#FF6F61] mb-4">
              Brand Story
            </h2>
            <p className="text-lg text-gray-400">
              Connecting Spontaneous Journeys with Web3 Innovation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-gray-400 mb-6">
              JAVURO is an innovative platform designed to provide users with spontaneous and enjoyable 
              experiences anytime, anywhere. By combining real-time location-based technology with Web3 
              token economics, we offer users a new dimension of experience within a 500m-1km radius.
            </p>
            <p className="text-gray-400 mb-6">
              The name "JAVURO" embodies our core philosophy—combining spontaneous journey ('JA' from Journey) 
              with innovative experience and connection ('X' representing the crossing point where users meet). 
              Our name captures the essence of our platform: an instant journey (Journey) that connects (X-Connect) 
              users through real-time, location-based experiences.
            </p>
            <p className="text-gray-400">
              Beyond simple recommendations, we're creating richer and more meaningful experiences 
              through ephemeral group chats, community participation and BNB Chain-based token rewards.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}