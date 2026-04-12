"use client";

import { motion } from "framer-motion";

export const SuccessTick = () => {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        stroke="white"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0.7 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />

      <motion.path
        d="M8.5 12.3L10.8 14.6L15.5 9.8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.22, delay: 0.12, ease: "easeOut" }}
      />
    </motion.svg>
  );
};
