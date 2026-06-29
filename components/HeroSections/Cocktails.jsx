import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cocktailLists, mockTailLists } from "./constants/index.js";

const Cocktails = () => {
  useGSAP(() => {
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    });

    parallaxTimeline
      .from("#c-left-leaf", {
        x: -100,
        y: 100,
      })
      .from("#c-right-leaf", {
        x: 100,
        y: 100,
      });
  });

  return (
    <section
      id="cocktails"
      className='relative min-h-dvh w-full overflow-hidden noise-bg'
    >
      <img
        src="/images/cocktail-left-leaf.png"
        alt="l-leaf"
        id="c-left-leaf"
        className="absolute left-0 -top-20 w-1/3 md:top-auto md:bottom-0 md:w-fit"
      />
      <img
        src="/images/cocktail-right-leaf.png"
        alt="r-leaf"
        id="c-right-leaf"
        className="absolute right-0 -top-20 w-1/3 md:top-auto md:bottom-0 md:w-fit"
      />

      <div className="list container relative z-10 mx-auto flex flex-col items-start justify-between gap-20 px-5 pt-40 2xl:px-0 md:flex-row">
        <div className="popular w-full space-y-8 md:w-fit">
          <h2 className="text-xl font-medium">Most popular cocktails:</h2>

          <ul className="space-y-8">
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name} className="flex items-start justify-between">
                <div className="md:me-28">
                  <h3 className="text-xl text-[#e7d393] 2xl:text-3xl">
                    {name}
                  </h3>
                  <p className="text-sm">
                    {country} | {detail}
                  </p>
                </div>
                <span className="text-xl font-medium">- {price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loved w-full space-y-8 pb-20 md:w-fit md:pb-0">
          <h2 className="text-xl font-medium">Most loved mocktails:</h2>

          <ul className="space-y-8">
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name} className="flex items-start justify-between">
                <div className="me-28">
                  <h3 className="text-xl text-[#e7d393] 2xl:text-3xl">
                    {name}
                  </h3>
                  <p className="text-sm">
                    {country} | {detail}
                  </p>
                </div>
                <span className="text-xl font-medium">- {price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;
