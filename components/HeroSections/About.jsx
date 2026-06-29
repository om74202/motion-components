import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

export const About = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create("#about h2", {
      type: "words",
    });

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
      },
    });

    scrollTimeline
      .from(titleSplit.words, {
        opacity: 0,
        duration: 1,
        yPercent: 100,
        ease: "expo.out",
        stagger: 0.02,
      })
      .from(
        ".top-grid div, .bottom-grid div",
        {
          opacity: 0,
          duration: 1,
          ease: "power1.inOut",
          stagger: 0.04,
        },
        "-=0.5",
      );
  });

  return (
    <div
      id="about"
      className="container mx-auto min-h-screen px-5 py-28 2xl:px-0"
    >
      <div className="mb-16 px-5 md:px-0">
        <div className="content grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="md:col-span-8">
            <p className="mb-8 inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-black">
              Best Cocktails
            </p>
            <h2 className="max-w-lg text-5xl md:text-6xl">
              Where every detail matters <span className="text-white">-</span>
              from muddle to garnish
            </h2>
          </div>

          <div className="sub-content flex flex-col justify-between space-y-5 md:col-span-4">
            <p className="text-lg">
              Every cocktail we serve is a reflection of our obsession with
              detail — from the first muddle to the final garnish. That care is
              what turns a simple drink into something truly memorable.
            </p>

            <div className="flex flex-col justify-between gap-5 md:gap-2">
              <p className="text-xl font-bold md:text-3xl">
                <span className="text-5xl font-bold text-[#e7d393]">4.5</span>
                /5
              </p>
              <p className="text-sm text-[#efefef]">
                More than +12000 customers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="top-grid mb-5 grid grid-cols-1 gap-5 px-5 md:px-0 xl:grid-cols-12">
        <div className="relative h-72 overflow-hidden rounded-3xl md:col-span-3">
          <div className='absolute inset-0 size-full bg-[url("/images/noise.png")]' />
          <img
            src="/images/abt1.png"
            alt="grid-img-1"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative h-72 overflow-hidden rounded-3xl md:col-span-6">
          <div className='absolute inset-0 size-full bg-[url("/images/noise.png")]' />
          <img
            src="/images/abt2.png"
            alt="grid-img-2"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative h-72 overflow-hidden rounded-3xl md:col-span-3">
          <div className='absolute inset-0 size-full bg-[url("/images/noise.png")]' />
          <img
            src="/images/abt5.png"
            alt="grid-img-5"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="bottom-grid grid grid-cols-1 gap-5 px-5 md:grid-cols-12 md:px-0">
        <div className="relative h-72 overflow-hidden rounded-3xl md:col-span-8">
          <div className='absolute inset-0 size-full bg-[url("/images/noise.png")]' />
          <img
            src="/images/abt3.png"
            alt="grid-img-3"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative h-72 overflow-hidden rounded-3xl md:col-span-4">
          <div className='absolute inset-0 size-full bg-[url("/images/noise.png")]' />
          <img
            src="/images/abt4.png"
            alt="grid-img-4"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
