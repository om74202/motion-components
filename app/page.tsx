"use client"
import { HoverBorderGradient } from "@/components/Buttons/HoverBorderGradient";
import { ScrollProgressBar } from "@/components/scrolls/ScrollProgressBars";
import { ThreeDotsLoader } from "@/loaders/ThreeDots";

export default function Home() {
  return (
    <div className="bg-gray-900 flex items-center justify-center h-[300vh]">
     <ScrollProgressBar/>
    </div>
  );
}
