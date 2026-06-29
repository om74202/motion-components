import { openingHours, socials } from "./constants/index.js";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const Contact = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create("#contact h2", { type: "words" });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
      },
      ease: "power1.inOut",
    });

    timeline
      .from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      .from("#contact h3, #contact p", {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      .to("#f-right-leaf", {
        y: "-50",
        duration: 1,
        ease: "power1.inOut",
      })
      .to(
        "#f-left-leaf",
        {
          y: "-50",
          duration: 1,
          ease: "power1.inOut",
        },
        "<",
      );
  });

  return (
    <footer
      id="contact"
      className="relative mt-0 w-full overflow-hidden px-4 text-center md:mt-20"
      style={{
        background:
          "radial-gradient(circle at center, #434343 0%, #000 50%, transparent 100%)",
      }}
    >
      <img
        src="/images/footer-right-leaf.png"
        alt="leaf-right"
        id="f-right-leaf"
        className="pointer-events-none absolute top-0 right-0 hidden lg:block"
      />
      <img
        src="/images/footer-left-leaf.png"
        alt="leaf-left"
        id="f-left-leaf"
        className="pointer-events-none absolute bottom-0 left-0 w-1/3 lg:w-fit"
      />

      <div className="content container mx-auto flex min-h-dvh flex-col justify-between gap-10 py-16 lg:py-14 2xl:py-32">
        <h2 className="translate-y-5 text-5xl md:translate-y-0 lg:text-6xl 2xl:text-8xl">
          Where to Find Us
        </h2>

        <div>
          <h3 className="mb-2 text-base uppercase xl:text-base 2xl:text-lg">
            Visit Our Bar
          </h3>
          <p className="text-sm lg:text-2xl 2xl:text-3xl">
            456, Raq Blvd. #404, Los Angeles, CA 90210
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-base uppercase xl:text-base 2xl:text-lg">
            Contact Us
          </h3>
          <p className="text-sm lg:text-2xl 2xl:text-3xl">(555) 987-6543</p>
          <p className="text-sm lg:text-2xl 2xl:text-3xl">
            hello@jsmcocktail.com
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-base uppercase xl:text-base 2xl:text-lg">
            Open Every Day
          </h3>
          {openingHours.map((time) => (
            <p key={time.day} className="text-sm lg:text-2xl 2xl:text-3xl">
              {time.day} : {time.time}
            </p>
          ))}
        </div>

        <div>
          <h3 className="mb-2 text-base uppercase xl:text-base 2xl:text-lg">
            Socials
          </h3>

          <div className="flex items-center justify-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} alt={social.name} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
