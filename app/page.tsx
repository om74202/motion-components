"use client"
import { GsapTo } from "@/components/boxAnimationsGsap/Gsap.To";
import { HoverBorderGradient } from "@/components/Buttons/HoverBorderGradient";
import ZohoSubmitButton from "@/components/Buttons/ZohoSubmitButton";
import { ScrollPage } from "@/components/scrollPage/Page";
import { ScrollProgressBar } from "@/components/scrolls/ScrollProgressBars";
import { ThreeDotsLoader } from "@/loaders/ThreeDots";
import { useState } from "react";
import {Mojito} from "@/components/HeroSections/Mojito"
import { MojitoNavbar } from "@/components/HeroSections/MojitoNavbar";
import { About } from "@/components/HeroSections/About";
import Cocktails from "@/components/HeroSections/Cocktails";
import Contact from "@/components/HeroSections/Contact"


export default function Home() {
  return (
    <main>
      <div className="relative min-h-screen overflow-hidden">
        <MojitoNavbar />

        <section id="mojito-video-zone" className="relative">
          <Mojito />
          <Cocktails />
        </section>

        <About />
        <Contact />
      </div>
    </main>
  );
}
