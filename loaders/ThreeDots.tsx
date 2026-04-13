import { motion } from "framer-motion";

const Dot = ({ delay = 0 }) => {
  return (
    <motion.div
      className="h-4 w-4 rounded-full bg-gray-400"
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay,
      }}
    />
  );
};

export const ThreeDotsLoader = () => {
  return (
    <div className="flex items-end gap-2">
      <Dot delay={0} />
      <Dot delay={0.2} />
      <Dot delay={0.4} />
    </div>
  );
};
