"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";
import {About} from "./About"
import Cocktails from "./Cocktails"

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export const Mojito = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(
    () => {
      if (!headingRef.current || !paragraphRef.current) return;

      const heroSplit = new SplitText(headingRef.current, {
        type: "chars,words",
      });

      const paragraphTargets =
        paragraphRef.current.querySelectorAll<HTMLElement>(".split-line");

      const paragraphSplit = new SplitText(Array.from(paragraphTargets), {
        type: "lines",
      });

      const textTl = gsap.timeline();

      textTl.from(heroSplit.chars, {
        y: 80,
        opacity: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: "power3.out",
      });

      textTl.from(
        paragraphSplit.lines,
        {
          y: 80,
          opacity: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.out",
        },
        "0.7",
      );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.2,
          },
        })
        .to(".right-leaf", { y: 200 }, 0)
        .to(".left-leaf", { y: -200 }, 0);

    const video = videoRef.current;
    const videoZone = document.querySelector("#mojito-video-zone");

    let videoTl: gsap.core.Timeline | undefined;
    let videoVisibilityTrigger: ScrollTrigger | undefined;
    let removeLoadedMetadataListener: (() => void) | undefined;

    if (video && videoZone) {
      video.pause();
      video.currentTime = 0;

     const bottomOffset = 0;

     const setVideoFixedCenter = () => {
       gsap.set(video, {
         position: "fixed",
         autoAlpha: 1,
         left: "50%",
         top: "50%",
         xPercent: -50,
         yPercent: -50,
       });
     };

     const setVideoAbsoluteAtSectionBottom = () => {
       const videoZoneHeight = (videoZone as HTMLElement).offsetHeight;
       const videoHeight = video.offsetHeight;

       gsap.set(video, {
         position: "absolute",
         autoAlpha: 1,
         left: "50%",
         top: videoZoneHeight - videoHeight - bottomOffset,
         xPercent: -50,
         yPercent: 0,
       });
     };

     gsap.set(video, {
       position: "fixed",
       autoAlpha: 0,
       left: "50%",
       top: "50%",
       xPercent: -50,
       yPercent: -50,
     });

     videoVisibilityTrigger = ScrollTrigger.create({
       trigger: videoZone,

       // video appears when mojito-video-zone enters
       start: "top bottom",

       // video becomes absolute at the bottom of mojito-video-zone
       end: "bottom 87%",

       markers: true,

       onEnter: () => {
         setVideoFixedCenter();
       },

       onEnterBack: () => {
         setVideoFixedCenter();
       },

       onLeave: () => {
         setVideoAbsoluteAtSectionBottom();
       },

       onLeaveBack: () => {
         gsap.set(video, {
           autoAlpha: 0,
           position: "fixed",
         });
       },

       onRefresh: (self) => {
         if (self.progress >= 1) {
           setVideoAbsoluteAtSectionBottom();
         }
       },
     });
      const setupVideoScrub = () => {
        if (!Number.isFinite(video.duration) || video.duration <= 0) return;

        video.pause();
        video.currentTime = 0;

        videoTl?.kill();

        videoTl = gsap.timeline({
          scrollTrigger: {
            trigger: videoZone,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
            invalidateOnRefresh: true,
          },
        });

        videoTl.to(video, {
          currentTime: video.duration,
          ease: "none",
        });

        ScrollTrigger.refresh();
      };

      if (Number.isFinite(video.duration) && video.duration > 0) {
        setupVideoScrub();
      } else {
        const handleLoadedMetadata = () => {
          setupVideoScrub();
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata, {
          once: true,
        });

        removeLoadedMetadataListener = () => {
          video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
      }
    }

      return () => {
        removeLoadedMetadataListener?.();
        videoVisibilityTrigger?.kill();
        videoTl?.kill();
        heroSplit.revert();
        paragraphSplit.revert();
      };
    },
    {
      scope: containerRef,
    },
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[dvh] noise-bg"
    >
      <video
        ref={videoRef}
        className="hero-video pointer-events-none fixed z-0 h-[70vh] w-[50vw] rounded-3xl object-cover mix-blend-screen brightness-75 contrast-150 [will-change:transform]"
        src="/videos/output.mp4"
        muted
        playsInline
        preload="auto"
      />

      <section className="relative z-10 h-dvh overflow-hidden">
        <div className="relative flex items-center justify-between font-bold text-white">
          <img
            src="/images/cocktail-left-leaf.png"
            alt="left leaf"
            className="left-leaf relative top-12 bg-transparent"
          />

          <h1
            ref={headingRef}
            className="absolute top-4 left-1/2 -translate-x-1/2 text-[9rem] leading-none"
          >
            MOJITO
          </h1>

          <img
            src="/images/hero-right-leaf.png"
            alt="right leaf"
            className="right-leaf bg-transparent"
          />
        </div>

        <div ref={paragraphRef} className="relative z-10 flex justify-between">
          <div className="mx-20">
            <p className="split-line text-xs">Cool, Crisp, Classic</p>

            <p className="font-modern-negra split-line text-3xl font-semibold">
              Sip the Spirit <br />
              of Summer
            </p>
          </div>

          <div>
            <p className="split-line">
              Every cocktail in our menu is a <br />
              blend of premium ingredients, <br />
              creative flair and timeless recipes <br />- designed to delight
              your senses
            </p>

            <p className="split-line cursor-pointer font-medium shadow-2xl hover:underline">
              View Cocktails
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};
