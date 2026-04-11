import {motion} from "framer-motion"
export const CircularLoading = () => {
  return (
    <motion.span className="inline-block w-5 h-5 border-3 rounded-full border-white/30 border-t-white"
    animate={{rotate:360}}
    transition={{repeat:Infinity,duration:0.5 ,ease:"linear"}}>

    </motion.span>
  )
}