"use client";

import { allCocktails } from "./constants/index.js";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Menu = () => {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, xPercent: -100 },
      {
        xPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      },
    );
    gsap.fromTo(
      ".details h2",
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 100,
        ease: "power1.inOut",
      },
    );
    gsap.fromTo(
      ".details p",
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 100,
        ease: "power1.inOut",
      },
    );
  }, [currentIndex]);

  const totalCocktails = allCocktails.length;

  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;

    setCurrentIndex(newIndex);
  };

  const getCocktailAt = (indexOffset) => {
    return allCocktails[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="relative mt-0 w-full px-5 py-20 md:mt-40 2xl:px-0"
      style={{
        background:
          "radial-gradient(circle at center, #434343 0%, #000 50%, transparent 100%)",
      }}
    >
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
        className="absolute bottom-[-5rem] left-0 w-1/3 object-contain md:w-fit"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
        className="absolute top-[-10rem] right-0 w-1/4 object-contain md:w-fit"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav
        className="cocktail-tabs relative z-10 mb-20 grid grid-cols-2 gap-10 md:mx-auto md:mb-32 md:max-w-6xl md:grid-cols-4 md:gap-20"
        aria-label="Cocktail Navigation"
      >
        {allCocktails.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`cursor-pointer border-b pb-2 text-xl transition-colors hover:border-[#e7d393] hover:text-[#e7d393] md:text-3xl ${
                isActive
                  ? "border-white text-white"
                  : "border-white/50 text-white/50"
              }`}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>

      <div className="content container relative mx-auto flex flex-col items-center justify-between">
        <div className="arrows absolute flex w-full items-center justify-between">
          <button
            className="max-w-36 cursor-pointer text-left text-white transition-colors hover:text-[#e7d393]"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span className="hidden text-3xl leading-none md:block">
              {prevCocktail.name}
            </span>
            <img
              src="/images/right-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>

          <button
            className="max-w-36 cursor-pointer text-left text-white transition-colors hover:text-[#e7d393]"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span className="hidden text-3xl leading-none md:block">
              {nextCocktail.name}
            </span>
            <img
              src="/images/left-arrow.png"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="cocktail mt-10 flex items-center justify-center">
          <img
            src={currentCocktail.image}
            alt={currentCocktail.name}
            className="h-[60vh] object-contain"
          />
        </div>

        <div className="recipe flex w-full flex-col justify-between gap-10 md:items-center lg:absolute lg:bottom-0">
          <div ref={contentRef} className="info space-y-4 lg:translate-y-20">
            <p>Recipe for:</p>
            <p
              id="title"
              className="max-w-40 text-3xl text-[#e7d393] md:text-6xl"
            >
              {currentCocktail.name}
            </p>
          </div>

          <div className="details max-w-md space-y-5 text-left">
            <h2 className="text-3xl md:text-5xl">{currentCocktail.title}</h2>
            <p className="pe-5 md:text-lg">{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Menu;
