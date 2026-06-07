"use client"

type ZohoSubmitButtonProps = {
  onClick: (isLoading: boolean) => void | Promise<void>;
  isLoading?: boolean;
  disabled: boolean;
};


import { use, useState } from "react";
import { motion } from "motion/react";
import { CircularLoading } from "@/loaders/circularLoading";

export default function ZohoSubmitButton({onClick,disabled,isLoading=false}:ZohoSubmitButtonProps) {
  const [isCircle, setIsCircle] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      type="button"
      layout
      onClick={()=>onClick(isLoading)}
      initial={false}
      animate={{
        width: isLoading ? 48 : 190,
        height: isLoading ? 48 : 48,
        borderRadius: isLoading ? "999px" : "14px",
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 22,
      }}
      className="bg-black text-white rounded-[14px] font-medium overflow-hidden flex items-center justify-center"
    >
      {isLoading ? <CircularLoading size={28} /> : "Submit"}
    </motion.button>
  );
}