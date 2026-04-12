import { CircularLoading } from "@/loaders/circularLoading";
import { useState } from "react";
import {AnimatePresence, motion} from "framer-motion"
import { SuccessTick } from "@/loaders/sucessTick";

export const StateFullButton = () => {
    const [status,setStatus] = useState<("idle" | "loading" | "success")>("idle")

    const handleClick=()=>{
        if(status === "loading") return;

        try{
            setStatus("loading");
           

            setTimeout(()=>{
                setStatus("success")

                 setTimeout(() => {
                   setStatus("idle");
                 }, 3000);

            },1500)
        }catch(e){
            console.log(e)
        }
    }

  return (
    <button
      onClick={handleClick}
      className={`flex justify-center items-center px-4 h-10 transition-all   rounded-2xl text-white   bg-green-400 hover:ring-2 hover:ring-green-400 hover:ring-offset-2 hover:ring-offset-black `}
    >
      <motion.div className="flex items-center gap-2">
        <AnimatePresence initial={false}>
          {status === "loading" && (
            <motion.div
              key="loader"
              layout
              initial={{ width: 0, opacity: 0, marginRight: 0 }}
              animate={{ width: "auto", opacity: 1, marginRight: 8 }}
              exit={{ width: 0, opacity: 0, marginRight: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <CircularLoading />
            </motion.div>
          )}
          {status === "success" && (
            <motion.div
              key={"success"}
              layout
              initial={{ width: 0, opacity: 0, marginRight: 0 }}
              animate={{ width: "auto", opacity: 1, marginRight: 8 }}
              exit={{ width: 0, opacity: 0, marginRight: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <SuccessTick />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.span layout transition={{ duration: 0.25, ease: "easeInOut" }}>
          Send Message
        </motion.span>
      </motion.div>
    </button>
  );
}