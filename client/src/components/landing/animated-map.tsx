import { motion } from "framer-motion";

export default function AnimatedMap() {
  return (
    <div className="absolute inset-0 opacity-10">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="400"
          cy="300"
          r="8"
          fill="#3A86FF"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.5, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.circle
          cx="400"
          cy="300"
          r="30"
          stroke="#3A86FF"
          strokeWidth="2"
          fill="none"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        {/* Add more animated elements for map-like visualization */}
      </svg>
    </div>
  );
}
