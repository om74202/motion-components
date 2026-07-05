"use client";

// useGSAP is the React-friendly hook provided by GSAP
import { useGSAP } from "@gsap/react";

// Main GSAP library
import gsap from "gsap";

// ScrollTrigger is used for scroll-based animations
// SplitText is used to split text into characters, words, or lines for animation
import { ScrollTrigger, SplitText } from "gsap/all";

// useRef is used to directly access DOM elements like h1, video, section, etc.
import { useRef } from "react";

// These imports are currently not used in this file.
// You can remove them if they are not needed here.
import { About } from "./About";
import Cocktails from "./Cocktails";

// Register GSAP plugins before using them
gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export const Mojito = () => {
  /*
    Refs are used when we want direct access to HTML elements.

    containerRef -> main hero section
    headingRef   -> MOJITO heading
    paragraphRef -> paragraph area
    videoRef     -> video element
  */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useGSAP(
    () => {
      /*
        Safety check:
        If heading or paragraph is not available in the DOM,
        stop the animation setup.
      */
      if (!headingRef.current || !paragraphRef.current) return;

      /*
        Split the main heading text into characters and words.

        Example:
        "MOJITO" becomes individual characters:
        M O J I T O

        This allows us to animate each character separately.
      */
      const heroSplit = new SplitText(headingRef.current, {
        type: "chars,words",
      });

      /*
        Select all paragraph elements that have class "split-line".
        These are the text lines we want to animate.
      */
      const paragraphTargets =
        paragraphRef.current.querySelectorAll<HTMLElement>(".split-line");

      /*
        Split paragraph text into lines so each line can animate separately.
      */
      const paragraphSplit = new SplitText(Array.from(paragraphTargets), {
        type: "lines",
      });

      /*
        Create a GSAP timeline.

        Timeline means multiple animations can run one after another
        or at specific times.
      */
      const textTl = gsap.timeline();

      /*
        Animate hero heading characters.

        y: 80 means characters start 80px lower.
        opacity: 0 means they start invisible.
        stagger: 0.05 means each character appears one after another.
      */
      textTl.from(heroSplit.chars, {
        y: 80,
        opacity: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: "power3.out",
      });

      /*
        Animate paragraph lines.

        "0.7" means this animation starts at 0.7 seconds
        in the timeline.
      */
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

      /*
        Leaf scroll animation.

        When user scrolls from the hero section:
        - right leaf moves down
        - left leaf moves up
      */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#hero",

            // Animation starts when top of hero reaches top of viewport
            start: "top top",

            // Animation ends when bottom of hero reaches top of viewport
            end: "bottom top",

            // scrub connects animation progress with scroll progress
            scrub: 0.2,
          },
        })
        .to(".right-leaf", { y: 200 }, 0)
        .to(".left-leaf", { y: -200 }, 0);

      /*
        Video animation setup
      */
      const video = videoRef.current;
      const videoZone = document.querySelector("#mojito-video-zone");

      /*
        These variables are declared outside so we can clean them later
        when component unmounts.
      */
      let videoTl: gsap.core.Timeline | undefined;
      let videoVisibilityTrigger: ScrollTrigger | undefined;
      let removeLoadedMetadataListener: (() => void) | undefined;

      /*
        Only run video logic if both video and videoZone exist.
        videoZone must be present somewhere in your page.
      */
      if (video && videoZone) {
        /*
          Pause video because scroll will control the video,
          not normal video playback.
        */
        video.pause();
        video.currentTime = 0;

        /*
          This is used when placing the video at the bottom
          of the video section.
        */
        const bottomOffset = 0;

        /*
          Makes video fixed in the center of the screen.

          position: fixed means video stays fixed relative to viewport.
          left/top 50% puts it near center.
          xPercent/yPercent -50 moves it back by half its own size,
          making it perfectly centered.
        */
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

        /*
          Places the video at the bottom of the video section.

          This is used after the user scrolls past the video zone,
          so the video does not remain fixed forever.
        */
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

        /*
          Initial video state.

          Video starts fixed in the center but hidden.
          autoAlpha controls opacity + visibility.
        */
        gsap.set(video, {
          position: "fixed",
          autoAlpha: 0,
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
        });

        /*
          This ScrollTrigger controls video visibility and positioning.

          It decides:
          - when video should appear
          - when video should stay fixed
          - when video should become absolute
          - when video should hide again while scrolling back
        */
        videoVisibilityTrigger = ScrollTrigger.create({
          trigger: videoZone,

          // Video appears when mojito-video-zone enters the viewport
          start: "top bottom",

          // Video becomes absolute near the bottom of mojito-video-zone
          end: "bottom 87%",

          /*
            markers: true shows debugging markers on screen.
            Keep it while developing.
            Remove or set to false in production.
          */
          markers: true,

          /*
            When scrolling down and entering videoZone,
            show video fixed at center.
          */
          onEnter: () => {
            setVideoFixedCenter();
          },

          /*
            When scrolling back up and entering videoZone again,
            again show video fixed at center.
          */
          onEnterBack: () => {
            setVideoFixedCenter();
          },

          /*
            When leaving the videoZone from bottom,
            place video at bottom of the section.
          */
          onLeave: () => {
            setVideoAbsoluteAtSectionBottom();
          },

          /*
            When scrolling back above the videoZone,
            hide the video again.
          */
          onLeaveBack: () => {
            gsap.set(video, {
              autoAlpha: 0,
              position: "fixed",
            });
          },

          /*
            Runs when ScrollTrigger recalculates positions,
            for example on resize or refresh.

            If scroll is already past the end,
            keep video absolute at section bottom.
          */
          onRefresh: (self) => {
            if (self.progress >= 1) {
              setVideoAbsoluteAtSectionBottom();
            }
          },
        });

        /*
          This function connects video playback with scroll.

          Instead of autoplaying the video, scrolling controls currentTime.
          More scroll = video moves forward.
        */
        const setupVideoScrub = () => {
          /*
            video.duration is only available after metadata is loaded.
            If duration is not valid, stop here.
          */
          if (!Number.isFinite(video.duration) || video.duration <= 0) return;

          video.pause();
          video.currentTime = 0;

          /*
            If timeline already exists, kill it before creating a new one.
            This avoids duplicate ScrollTriggers.
          */
          videoTl?.kill();

          /*
            Create timeline for scroll-controlled video.
          */
          videoTl = gsap.timeline({
            scrollTrigger: {
              trigger: videoZone,

              // Start scrubbing when videoZone reaches top of viewport
              start: "top top",

              // End when bottom of videoZone reaches bottom of viewport
              end: "bottom bottom",

              // Smoothly connect scrolling with video currentTime
              scrub: 0.2,

              // Recalculate values on resize/refresh
              invalidateOnRefresh: true,
            },
          });

          /*
            Animate video currentTime from 0 to video.duration.
            This creates scroll-based video playback.
          */
          videoTl.to(video, {
            currentTime: video.duration,
            ease: "none",
          });

          /*
            Refresh ScrollTrigger after timeline is created,
            so all positions are calculated correctly.
          */
          ScrollTrigger.refresh();
        };

        /*
          If video duration is already available,
          setup scrub immediately.
        */
        if (Number.isFinite(video.duration) && video.duration > 0) {
          setupVideoScrub();
        } else {
          /*
            If duration is not available yet,
            wait until video metadata loads.

            loadedmetadata gives details like:
            - duration
            - video width
            - video height
          */
          const handleLoadedMetadata = () => {
            setupVideoScrub();
          };

          video.addEventListener("loadedmetadata", handleLoadedMetadata, {
            once: true,
          });

          /*
            Store cleanup function so we can remove event listener later.
          */
          removeLoadedMetadataListener = () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
          };
        }
      }

      /*
        Cleanup function.

        This runs when component unmounts.
        It prevents memory leaks and duplicate animations.
      */
      return () => {
        removeLoadedMetadataListener?.();
        videoVisibilityTrigger?.kill();
        videoTl?.kill();

        /*
          Revert SplitText changes.
          SplitText wraps text internally, so revert restores original HTML.
        */
        heroSplit.revert();
        paragraphSplit.revert();
      };
    },
    {
      /*
        scope limits GSAP selector animations to this container.
        This prevents animations from accidentally affecting other elements.
      */
      scope: containerRef,
    },
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[dvh] noise-bg"
    >
      {/* 
        Video element.

        This video is controlled by scroll using GSAP.
        It does not autoplay normally.
      */}
      <video
        ref={videoRef}
        className="hero-video pointer-events-none fixed z-0 h-[70vh] w-[50vw] rounded-3xl object-cover mix-blend-screen brightness-75 contrast-150 [will-change:transform]"
        src="/videos/output.mp4"
        muted
        playsInline
        preload="auto"
      />

      {/* Hero content section */}
      <section className="relative z-10 h-dvh overflow-hidden">
        {/* Top hero area with leaves and heading */}
        <div className="relative flex items-center justify-between font-bold text-white">
          {/* Left leaf image animated on scroll */}
          <img
            src="/images/cocktail-left-leaf.png"
            alt="left leaf"
            className="left-leaf relative top-12 bg-transparent"
          />

          {/* Main heading animated character by character */}
          <h1
            ref={headingRef}
            className="absolute top-4 left-1/2 -translate-x-1/2 text-[9rem] leading-none"
          >
            MOJITO
          </h1>

          {/* Right leaf image animated on scroll */}
          <img
            src="/images/hero-right-leaf.png"
            alt="right leaf"
            className="right-leaf bg-transparent"
          />
        </div>

        {/* Paragraph section */}
        <div ref={paragraphRef} className="relative z-10 flex justify-between">
          {/* Left text block */}
          <div className="mx-20">
            {/* split-line class is used by GSAP SplitText */}
            <p className="split-line text-xs">Cool, Crisp, Classic</p>

            <p className="font-modern-negra split-line text-3xl font-semibold">
              Sip the Spirit <br />
              of Summer
            </p>
          </div>

          {/* Right text block */}
          <div>
            <p className="split-line">
              Every cocktail in our menu is a <br />
              blend of premium ingredients, <br />
              creative flair and timeless recipes <br />- designed to delight
              your senses
            </p>

            {/* Button-like text */}
            <p className="split-line cursor-pointer font-medium shadow-2xl hover:underline">
              View Cocktails
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};
