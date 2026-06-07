import { motion } from "motion/react";

type CircularLoadingProps = {
  size?: number;
};

export const CircularLoading = ({ size = 20 }: CircularLoadingProps) => {
  return (
    <motion.span
      className="inline-block rounded-full border-[3px] border-white/30 border-t-white"
      style={{
        width: size,
        height: size,
      }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 0.5,
        ease: "linear",
      }}
    />
  );
};
