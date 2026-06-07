"use client"
import gsap from "gsap"
import { useGSAP} from "@gsap/react"
import { useRef } from "react"

gsap.registerPlugin(useGSAP)
export const GsapTo=()=>{
    const containerRef=useRef<HTMLDivElement | null>(null)

    useGSAP(()=>{
        const list=gsap.utils.toArray<HTMLDivElement>('.wave')

        list.forEach((box:HTMLDivElement,i:number)=>{
            gsap.fromTo(box,{y:-20},{y:20 , duration:1,repeat:-1,yoyo:true,delay:i*0.12,ease:"sine.inOut"})
        })
    },{scope:containerRef})

        
    return (
      <div
        ref={containerRef}
        className=" flex justify-center items-center gap-2 h-[100vh]"
      >
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
        <div id="box" className="wave w-20 h-20 bg-blue-500 rounded-full"></div>
      </div>
    );
}