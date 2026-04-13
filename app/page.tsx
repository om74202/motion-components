"use client"
import { HoverBorderGradient } from "@/components/Buttons/HoverBorderGradient";
import { ThreeDotsLoader } from "@/loaders/ThreeDots";

export default function Home() {
  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
     <ThreeDotsLoader/>
    </div>
  );
}
