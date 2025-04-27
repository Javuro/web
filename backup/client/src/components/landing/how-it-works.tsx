import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Install App",
    description: "Install the JAVURO app and complete a simple sign-up process.",
  },
  {
    number: "02",
    title: "Location Analysis",
    description: "Receive personalized content through real-time location analysis.",
  },
  {
    number: "03",
    title: "Recommended Content",
    description: "Get optimal recommendations through AI and human curation.",
  },
  {
    number: "04",
    title: "Group Chat",
    description: "Connect through auto-generated chat rooms at recommended locations.",
  },
  {
    number: "05",
    title: "Community Voting",
    description: "Vote to decide on upcoming locations and events.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3A86FF] to-[#FF6F61]">
            How It Works
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex items-center mb-12 last:mb-0"
            >
              <div className="w-16 h-16 flex-shrink-0 rounded-full bg-gradient-to-r from-[#3A86FF] to-[#3A86FF]/80 text-white flex items-center justify-center text-xl font-bold">
                {step.number}
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}