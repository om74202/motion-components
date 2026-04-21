import { useScroll, useTransform, motion } from "motion/react";

export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  const radius = 28;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [circumference, 0],
  );

  return (
    <div>
      <motion.div
        className="fixed left-0 right-0 top-0 h-1 origin-left bg-blue-500"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.div className="fixed right-4 top-6 flex items-center justify-center">
        <svg width="70" height="70" viewBox="0 0 70 70" className="-rotate-90">
          <circle
            cx="35"
            cy="35"
            r={radius}
            fill="transparent"
            stroke="#d1d5db"
            strokeWidth="8"
          />

          <motion.circle
            cx="35"
            cy="35"
            r={radius}
            fill="transparent"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
          />
        </svg>
      </motion.div>
    </div>
  );
};
